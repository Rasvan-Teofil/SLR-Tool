import React, { useEffect, useMemo, useState } from "react";

const STATUS_ORDER = ["unrated", "full", "partial", "none"];

const STATUS_CONFIG = {
  unrated: {
    symbol: "",
    label: "Noch nicht bewertet",
    className: "border-slate-300 bg-white text-slate-400",
    short: "⬚",
    score: null,
  },
  full: {
    symbol: "✓",
    label: "Konzept vollständig behandelt",
    className: "border-green-200 bg-green-50 text-green-600",
    short: "✓",
    score: 1,
  },
  partial: {
    symbol: "◯",
    label: "Teilweise/am Rande behandelt",
    className: "border-yellow-200 bg-yellow-50 text-yellow-600",
    short: "◯",
    score: 0.5,
  },
  none: {
    symbol: "✕",
    label: "Nicht behandelt",
    className: "border-red-200 bg-red-50 text-red-500",
    short: "✕",
    score: 0,
  },
};

const STORAGE_KEY = "forschungsthema-matrix-data-v1";

const createInitialData = () => ({
  title: "Ihr Forschungsthema",
  subtitle: "Konzeptmatrix nach Webster & Watson (mit hierarchischen Kategorien)",
  categories: [
    {
      id: crypto.randomUUID(),
      name: "Hauptkategorie 1",
      expanded: true,
      subcategories: [
        { id: crypto.randomUUID(), name: "Unterkategorie 1.1" },
        { id: crypto.randomUUID(), name: "Unterkategorie 1.2" },
      ],
    },
    {
      id: crypto.randomUUID(),
      name: "Hauptkategorie 2",
      expanded: true,
      subcategories: [
        { id: crypto.randomUUID(), name: "Unterkategorie 2.1" },
        { id: crypto.randomUUID(), name: "Unterkategorie 2.2" },
      ],
    },
  ],
  studies: [
    { id: crypto.randomUUID(), author: "Autor(en)", year: "Jahr" },
    { id: crypto.randomUUID(), author: "Autor(en)", year: "Jahr" },
    { id: crypto.randomUUID(), author: "Autor(en)", year: "Jahr" },
  ],
  ratings: {},
  gapNotes: "",
  showCsv: false,
});

function createEmptyRatings(categories, studies, existingRatings = {}) {
  const nextRatings = { ...existingRatings };

  studies.forEach((study) => {
    categories.forEach((category) => {
      category.subcategories.forEach((subcategory) => {
        const key = `${study.id}__${subcategory.id}`;
        if (!(key in nextRatings)) {
          nextRatings[key] = "unrated";
        }
      });
    });
  });

  const validKeys = new Set();
  studies.forEach((study) => {
    categories.forEach((category) => {
      category.subcategories.forEach((subcategory) => {
        validKeys.add(`${study.id}__${subcategory.id}`);
      });
    });
  });

  Object.keys(nextRatings).forEach((key) => {
    if (!validKeys.has(key)) {
      delete nextRatings[key];
    }
  });

  return nextRatings;
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function escapeCsv(value) {
  const stringValue = String(value ?? "");
  if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

export default function App() {
  const [data, setData] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return createInitialData();
      const parsed = JSON.parse(stored);
      return {
        ...createInitialData(),
        ...parsed,
      };
    } catch {
      return createInitialData();
    }
  });

  useEffect(() => {
    setData((current) => ({
      ...current,
      ratings: createEmptyRatings(current.categories, current.studies, current.ratings),
    }));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const categories = data.categories;
  const studies = data.studies;

  const flattenedSubcategories = useMemo(
    () =>
      categories.flatMap((category) =>
        category.subcategories.map((subcategory) => ({
          ...subcategory,
          categoryId: category.id,
          categoryName: category.name,
        }))
      ),
    [categories]
  );

  const ratings = useMemo(
    () => createEmptyRatings(categories, studies, data.ratings),
    [categories, studies, data.ratings]
  );

  const csvRows = useMemo(() => {
    const header = [
      "Autor(en)",
      "Jahr",
      ...flattenedSubcategories.map((item) => `${item.categoryName} > ${item.name}`),
    ];
    const rows = studies.map((study) => [
      study.author,
      study.year,
      ...flattenedSubcategories.map(
        (subcategory) => STATUS_CONFIG[ratings[`${study.id}__${subcategory.id}`] ?? "unrated"].short
      ),
    ]);
    return [header, ...rows];
  }, [flattenedSubcategories, ratings, studies]);

  const csvText = useMemo(
    () => csvRows.map((row) => row.map(escapeCsv).join(",")).join("\n"),
    [csvRows]
  );

  const statistics = useMemo(() => {
    const totalRatings = Object.values(ratings).filter((value) => value !== "unrated").length;
    return {
      studies: studies.length,
      mainCategories: categories.length,
      subcategories: flattenedSubcategories.length,
      ratings: totalRatings,
    };
  }, [categories.length, flattenedSubcategories.length, ratings, studies.length]);

  const gapItems = useMemo(() => {
    return flattenedSubcategories
      .map((subcategory) => {
        const relevant = studies.map((study) => ratings[`${study.id}__${subcategory.id}`] ?? "unrated");
        const scored = relevant.filter((status) => STATUS_CONFIG[status].score !== null);
        const average = scored.length
          ? scored.reduce((sum, status) => sum + STATUS_CONFIG[status].score, 0) / scored.length
          : 0;
        const coverage = Math.round(average * 100);
        return {
          id: subcategory.id,
          label: `${subcategory.categoryName} → ${subcategory.name}`,
          coverage,
        };
      })
      .sort((a, b) => a.coverage - b.coverage);
  }, [flattenedSubcategories, ratings, studies]);

  function updateData(updater) {
    setData((current) => {
      const next = typeof updater === "function" ? updater(current) : updater;
      return {
        ...next,
        ratings: createEmptyRatings(next.categories, next.studies, next.ratings),
      };
    });
  }

  function addStudy() {
    updateData((current) => ({
      ...current,
      studies: [
        ...current.studies,
        {
          id: crypto.randomUUID(),
          author: `Autor(en) ${current.studies.length + 1}`,
          year: new Date().getFullYear().toString(),
        },
      ],
    }));
  }

  function updateStudy(studyId, field, value) {
    updateData((current) => ({
      ...current,
      studies: current.studies.map((study) =>
        study.id === studyId ? { ...study, [field]: value } : study
      ),
    }));
  }

  function removeStudy(studyId) {
    updateData((current) => ({
      ...current,
      studies: current.studies.filter((study) => study.id !== studyId),
    }));
  }

  function addMainCategory() {
    updateData((current) => ({
      ...current,
      categories: [
        ...current.categories,
        {
          id: crypto.randomUUID(),
          name: `Hauptkategorie ${current.categories.length + 1}`,
          expanded: true,
          subcategories: [
            {
              id: crypto.randomUUID(),
              name: `Unterkategorie ${current.categories.length + 1}.1`,
            },
          ],
        },
      ],
    }));
  }

  function updateCategoryName(categoryId, value) {
    updateData((current) => ({
      ...current,
      categories: current.categories.map((category) =>
        category.id === categoryId ? { ...category, name: value } : category
      ),
    }));
  }

  function toggleCategory(categoryId) {
    updateData((current) => ({
      ...current,
      categories: current.categories.map((category) =>
        category.id === categoryId ? { ...category, expanded: !category.expanded } : category
      ),
    }));
  }

  function removeCategory(categoryId) {
    updateData((current) => ({
      ...current,
      categories: current.categories.filter((category) => category.id !== categoryId),
    }));
  }

  function addSubcategory(categoryId) {
    updateData((current) => ({
      ...current,
      categories: current.categories.map((category) => {
        if (category.id !== categoryId) return category;
        return {
          ...category,
          expanded: true,
          subcategories: [
            ...category.subcategories,
            {
              id: crypto.randomUUID(),
              name: `Unterkategorie ${current.categories.findIndex((item) => item.id === categoryId) + 1}.${category.subcategories.length + 1}`,
            },
          ],
        };
      }),
    }));
  }

  function updateSubcategoryName(categoryId, subcategoryId, value) {
    updateData((current) => ({
      ...current,
      categories: current.categories.map((category) => {
        if (category.id !== categoryId) return category;
        return {
          ...category,
          subcategories: category.subcategories.map((subcategory) =>
            subcategory.id === subcategoryId ? { ...subcategory, name: value } : subcategory
          ),
        };
      }),
    }));
  }

  function removeSubcategory(categoryId, subcategoryId) {
    updateData((current) => ({
      ...current,
      categories: current.categories
        .map((category) => {
          if (category.id !== categoryId) return category;
          return {
            ...category,
            subcategories: category.subcategories.filter(
              (subcategory) => subcategory.id !== subcategoryId
            ),
          };
        })
        .filter((category) => category.subcategories.length > 0),
    }));
  }

  function cycleRating(studyId, subcategoryId) {
    updateData((current) => {
      const key = `${studyId}__${subcategoryId}`;
      const currentStatus = current.ratings[key] ?? "unrated";
      const nextStatus = STATUS_ORDER[(STATUS_ORDER.indexOf(currentStatus) + 1) % STATUS_ORDER.length];
      return {
        ...current,
        ratings: {
          ...current.ratings,
          [key]: nextStatus,
        },
      };
    });
  }

  function resetAll() {
    if (!window.confirm("Möchten Sie wirklich alle Daten zurücksetzen?")) return;
    setData(createInitialData());
  }

  function exportCsv() {
    downloadFile("konzeptmatrix.csv", csvText, "text/csv;charset=utf-8;");
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
        <header className="mb-5">
          <input
            value={data.title}
            onChange={(e) => updateData((current) => ({ ...current, title: e.target.value }))}
            className="w-full bg-transparent text-3xl font-bold tracking-tight text-slate-800 outline-none"
          />
          <input
            value={data.subtitle}
            onChange={(e) => updateData((current) => ({ ...current, subtitle: e.target.value }))}
            className="mt-1 w-full bg-transparent text-sm text-slate-500 outline-none"
          />
        </header>

        <section className="mb-4 rounded-lg border-l-4 border-blue-500 bg-slate-100 px-4 py-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="mb-3 text-sm font-semibold text-blue-900">Legende &amp; Anleitung:</h2>
              <ul className="space-y-2 text-sm text-slate-700">
                {Object.values(STATUS_CONFIG).map((status) => (
                  <li key={status.label} className="flex items-center gap-2">
                    <span className="inline-flex min-w-[18px] justify-center">{status.short}</span>
                    {status.label}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-3 text-sm font-semibold text-slate-700">Webster &amp; Watson Struktur:</h2>
              <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
                <li>Hauptkategorien = übergeordnete Konzepte</li>
                <li>Unterkategorien = spezifische Aspekte</li>
                <li>Hierarchische Organisation der Literatur</li>
                <li>Klicken Sie auf eine Matrix-Zelle, um durch die Bewertungsstufen zu wechseln</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={addStudy}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
            >
              + Studie hinzufügen
            </button>
            <button
              onClick={addMainCategory}
              className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-green-700"
            >
              + Hauptkategorie hinzufügen
            </button>
            <button
              onClick={exportCsv}
              className="rounded-md bg-slate-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
            >
              ↓ CSV exportieren
            </button>
            <button
              onClick={() => updateData((current) => ({ ...current, showCsv: !current.showCsv }))}
              className="rounded-md bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-300"
            >
              {data.showCsv ? "CSV ausblenden" : "CSV-Daten anzeigen"}
            </button>
          </div>

          <button
            onClick={resetAll}
            className="rounded-md bg-red-50 px-4 py-2 text-sm font-medium text-red-600 shadow-sm transition hover:bg-red-100"
          >
            Alles zurücksetzen
          </button>
        </section>

        {data.showCsv && (
          <section className="mb-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h3 className="mb-3 text-sm font-semibold text-slate-800">CSV-Vorschau</h3>
            <textarea
              readOnly
              value={csvText}
              className="min-h-[180px] w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-mono text-xs text-slate-700 outline-none"
            />
          </section>
        )}

        <section className="mb-4 rounded-lg bg-slate-50 p-3 md:p-4">
          <h3 className="mb-4 text-sm font-semibold text-slate-800">Konzepthierarchie verwalten:</h3>

          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.id} className="rounded-lg border border-slate-200 bg-white p-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="text-slate-500 transition hover:text-slate-700"
                      >
                        {category.expanded ? "⌄" : "›"}
                      </button>
                      <input
                        value={category.name}
                        onChange={(e) => updateCategoryName(category.id, e.target.value)}
                        className="w-full max-w-md rounded-md border border-transparent px-2 py-1 font-medium text-blue-700 outline-none hover:border-slate-200 focus:border-slate-300"
                      />
                    </div>

                    {category.expanded && (
                      <div className="mt-2 ml-8 space-y-2 text-sm text-slate-700">
                        {category.subcategories.map((subcategory) => (
                          <div key={subcategory.id} className="flex items-center justify-between gap-3">
                            <div className="flex w-full items-center gap-3">
                              <span className="text-slate-400">→</span>
                              <input
                                value={subcategory.name}
                                onChange={(e) =>
                                  updateSubcategoryName(category.id, subcategory.id, e.target.value)
                                }
                                className="w-full rounded-md border border-transparent px-2 py-1 outline-none hover:border-slate-200 focus:border-slate-300"
                              />
                            </div>
                            <button
                              onClick={() => removeSubcategory(category.id, subcategory.id)}
                              className="text-red-500 transition hover:text-red-600"
                              title="Unterkategorie löschen"
                            >
                              🗑
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <button
                      onClick={() => addSubcategory(category.id)}
                      className="rounded bg-green-100 px-3 py-1 text-xs font-medium text-green-700 hover:bg-green-200"
                    >
                      + Unterkategorie
                    </button>
                    <button
                      onClick={() => removeCategory(category.id)}
                      className="text-red-500 transition hover:text-red-600"
                      title="Hauptkategorie löschen"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-4 overflow-hidden rounded-lg border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th
                    rowSpan={3}
                    className="min-w-[250px] border border-slate-300 bg-indigo-800 px-4 py-4 text-left font-semibold text-white"
                  >
                    Autor(en) &amp; Jahr
                  </th>
                  <th
                    colSpan={Math.max(flattenedSubcategories.length, 1)}
                    className="border border-slate-300 bg-indigo-800 px-4 py-4 text-center font-semibold text-white"
                  >
                    Konzepte
                  </th>
                </tr>
                <tr>
                  {categories.map((category) => (
                    <th
                      key={category.id}
                      colSpan={Math.max(category.subcategories.length, 1)}
                      className="border border-slate-300 bg-indigo-700 px-4 py-3 text-center font-semibold text-white"
                    >
                      {category.name}
                    </th>
                  ))}
                </tr>
                <tr>
                  {flattenedSubcategories.map((subcategory) => (
                    <th
                      key={subcategory.id}
                      className="min-w-[180px] border border-slate-300 bg-indigo-600 px-4 py-2 text-center text-xs font-semibold text-white"
                    >
                      {subcategory.name}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {studies.map((study) => (
                  <tr key={study.id} className="bg-white">
                    <td className="border border-slate-300 px-4 py-3 align-top text-slate-500">
                      <div className="space-y-2">
                        <input
                          value={study.author}
                          onChange={(e) => updateStudy(study.id, "author", e.target.value)}
                          className="w-full rounded-md border border-transparent px-2 py-1 text-slate-700 outline-none hover:border-slate-200 focus:border-slate-300"
                        />
                        <div className="flex items-center gap-2">
                          <input
                            value={study.year}
                            onChange={(e) => updateStudy(study.id, "year", e.target.value)}
                            className="w-28 rounded-md border border-transparent px-2 py-1 text-xs text-slate-500 outline-none hover:border-slate-200 focus:border-slate-300"
                          />
                          <button
                            onClick={() => removeStudy(study.id)}
                            className="text-xs text-red-500 transition hover:text-red-600"
                          >
                            Löschen
                          </button>
                        </div>
                      </div>
                    </td>
                    {flattenedSubcategories.map((subcategory) => {
                      const ratingKey = `${study.id}__${subcategory.id}`;
                      const status = ratings[ratingKey] ?? "unrated";
                      const config = STATUS_CONFIG[status];

                      return (
                        <td
                          key={ratingKey}
                          className="border border-slate-300 px-4 py-4 text-center"
                        >
                          <button
                            onClick={() => cycleRating(study.id, subcategory.id)}
                            title={config.label}
                            className={`mx-auto flex h-9 w-9 items-center justify-center rounded-md border text-sm font-semibold transition hover:scale-105 ${config.className}`}
                          >
                            {config.symbol}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-5 grid gap-3 md:grid-cols-4">
          {[
            { value: statistics.studies, label: "Studien", bg: "bg-slate-100", text: "text-blue-700" },
            {
              value: statistics.mainCategories,
              label: "Hauptkategorien",
              bg: "bg-green-50",
              text: "text-green-700",
            },
            {
              value: statistics.subcategories,
              label: "Unterkategorien",
              bg: "bg-purple-50",
              text: "text-purple-700",
            },
            { value: statistics.ratings, label: "Bewertungen", bg: "bg-orange-50", text: "text-orange-700" },
          ].map((item) => (
            <div key={item.label} className={`rounded-xl ${item.bg} px-4 py-5 text-center shadow-sm`}>
              <div className={`text-3xl font-bold ${item.text}`}>{item.value}</div>
              <div className="mt-1 text-sm text-slate-600">{item.label}</div>
            </div>
          ))}
        </section>

        <section className="rounded-xl border-l-4 border-orange-400 bg-orange-50 p-4">
          <div className="mb-5 flex items-center gap-2">
            <span className="text-lg">🔎</span>
            <h3 className="text-2xl font-semibold text-orange-900">Identifizierte Forschungslücken</h3>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-800">Wenig erforschte Konzepte:</h4>
            <div className="space-y-4">
              {gapItems.map((item) => (
                <div key={item.id} className="rounded-lg border border-orange-100 bg-white p-3">
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium text-slate-700">{item.label}</span>
                    <span className="text-orange-600">{item.coverage}% Abdeckung</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-200">
                    <div
                      className="h-2.5 rounded-full bg-orange-400 transition-all"
                      style={{ width: `${item.coverage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-orange-200 pt-5">
            <label className="mb-3 block text-sm font-semibold text-slate-800">
              Notizen zu Forschungslücken:
            </label>
            <textarea
              value={data.gapNotes}
              onChange={(e) => updateData((current) => ({ ...current, gapNotes: e.target.value }))}
              className="min-h-[130px] w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none ring-0 placeholder:text-slate-400 focus:border-orange-300"
              placeholder="Notieren Sie hier identifizierte Forschungslücken, ungeklärte Fragen oder Bereiche für zukünftige Forschung..."
            />
          </div>
        </section>
      </div>
    </div>
  );
}