import { useMemo } from "react";
import { STATUS_CONFIG, getCategoryConceptCount, getFlattenedSubcategories } from "../lib/conceptMatrix";

export default function ConceptMatrixReadOnlyTable({ categories, studies, ratings, caption }) {
  const flattenedSubcategories = useMemo(() => getFlattenedSubcategories(categories), [categories]);

  return (
    <figure className="overflow-hidden rounded-lg border border-slate-200 bg-white print:break-inside-auto">
      {caption ? (
        <figcaption className="border-b border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-800 print:bg-white">
          {caption}
        </figcaption>
      ) : null}
      <div className="overflow-x-auto print:overflow-visible">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr>
              <th
                rowSpan={3}
                className="min-w-[220px] border border-slate-300 bg-indigo-800 px-4 py-4 text-left font-semibold text-white"
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
                  colSpan={getCategoryConceptCount(category)}
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
                  className="min-w-[160px] border border-slate-300 bg-indigo-600 px-3 py-2 text-center text-xs font-semibold text-white"
                >
                  {subcategory.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {studies.map((study) => (
              <tr key={study.id} className="bg-white">
                <td className="border border-slate-300 px-4 py-3 align-top text-slate-800">
                  <div className="font-medium text-slate-800">{study.author}</div>
                  <div className="text-xs text-slate-500">{study.year}</div>
                </td>
                {flattenedSubcategories.map((subcategory) => {
                  const ratingKey = `${study.id}__${subcategory.id}`;
                  const status = ratings[ratingKey] ?? "unrated";
                  const config = STATUS_CONFIG[status];

                  return (
                    <td key={ratingKey} className="border border-slate-300 px-3 py-3 text-center align-middle">
                      <span
                        title={config.label}
                        className={`mx-auto inline-flex h-9 w-9 items-center justify-center rounded-md border text-sm font-semibold ${config.className}`}
                      >
                        {config.symbol || "—"}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
