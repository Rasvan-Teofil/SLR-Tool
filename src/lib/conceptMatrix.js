export const STATUS_ORDER = ["unrated", "full", "partial", "none"];

export const STATUS_CONFIG = {
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

/** Kompakte einzeilige Kodierung für Druck/PDF (nicht für Bildschirm-Matrix). */
export function ratingToPrintSymbol(status) {
  switch (status) {
    case "full":
      return "x";
    case "partial":
      return "/";
    case "none":
      return "−";
    case "unrated":
    default:
      return "";
  }
}

export function createInitialConceptMatrixData() {
  return {
    title: "Ihr Forschungsthema",
    subtitle: "",
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
  };
}

export function createEmptyRatings(categories, studies, existingRatings = {}) {
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

export function getFlattenedSubcategories(categories) {
  return categories.flatMap((category) =>
    category.subcategories.map((subcategory) => ({
      ...subcategory,
      categoryId: category.id,
      categoryName: category.name,
    }))
  );
}

export function normalizeRatings(categories, studies, ratings) {
  return createEmptyRatings(categories, studies, ratings);
}

export function computeStatistics(categories, studies, ratings) {
  const flattenedSubcategories = getFlattenedSubcategories(categories);
  const totalRatings = Object.values(ratings).filter((value) => value !== "unrated").length;
  return {
    studies: studies.length,
    mainCategories: categories.length,
    subcategories: flattenedSubcategories.length,
    ratings: totalRatings,
  };
}

export function computeGapItems(categories, studies, ratings) {
  const flattenedSubcategories = getFlattenedSubcategories(categories);
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
}

export function buildCsvRows(flattenedSubcategories, studies, ratings) {
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
}

export function escapeCsv(value) {
  const stringValue = String(value ?? "");
  if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

export function csvTextFromMatrix(conceptMatrix) {
  const { categories, studies } = conceptMatrix;
  const ratings = normalizeRatings(categories, studies, conceptMatrix.ratings);
  const flattened = getFlattenedSubcategories(categories);
  const csvRows = buildCsvRows(flattened, studies, ratings);
  return csvRows.map((row) => row.map(escapeCsv).join(",")).join("\n");
}

export function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
