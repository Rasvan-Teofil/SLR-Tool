import { useMemo } from "react";
import { getCategoryConceptCount, getFlattenedSubcategories, ratingToPrintSymbol } from "../lib/conceptMatrix";

/**
 * Nur für Druck/PDF: extrem kompakte Matrix (schmale Spalten, x / / − / leer).
 * Bildschirm: übergeordnet mit hidden print:block einbinden.
 */
export default function ConceptMatrixPrintTable({ categories, studies, ratings, caption }) {
  const flattenedSubcategories = useMemo(() => getFlattenedSubcategories(categories), [categories]);

  return (
    <div className="matrix-print-root hidden print:block">
      {caption ? (
        <p className="matrix-print-caption mb-1 font-semibold text-slate-900">{caption}</p>
      ) : null}

      <div className="matrix-print-scroll overflow-x-auto">
        <table className="matrix-print-table w-full border-collapse text-slate-900">
          <thead>
            <tr>
              <th
                rowSpan={3}
                className="matrix-print-corner border border-slate-600 bg-slate-200 align-bottom text-left font-semibold"
              >
                Autor / Jahr
              </th>
              <th
                colSpan={Math.max(flattenedSubcategories.length, 1)}
                className="border border-slate-600 bg-slate-300 text-center text-[7px] font-semibold leading-tight print:text-[7px]"
              >
                Konzepte
              </th>
            </tr>
            <tr>
              {categories.map((category) => (
                <th
                  key={category.id}
                  colSpan={getCategoryConceptCount(category)}
                  className="border border-slate-600 bg-slate-200 px-0.5 py-0.5 text-center text-[6.5px] font-semibold leading-none print:text-[6.5px]"
                  title={category.name}
                >
                  {category.name}
                </th>
              ))}
            </tr>
            <tr>
              {flattenedSubcategories.map((subcategory) => {
                const full = `${subcategory.categoryName} › ${subcategory.name}`;
                return (
                  <th
                    key={subcategory.id}
                    className="matrix-print-header-v border border-slate-600 bg-slate-100 font-semibold text-slate-900"
                    title={full}
                  >
                    <span className="matrix-print-header-v-inner">{subcategory.name}</span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {studies.map((study) => (
              <tr key={study.id} className="matrix-print-data-row">
                <td className="matrix-print-author border border-slate-600 bg-white align-top leading-tight">
                  <span className="block font-medium">{study.author}</span>
                  <span className="block text-[6.5px] text-slate-700 print:text-[6.5px]">{study.year}</span>
                </td>
                {flattenedSubcategories.map((subcategory) => {
                  const key = `${study.id}__${subcategory.id}`;
                  const status = ratings[key] ?? "unrated";
                  const sym = ratingToPrintSymbol(status);
                  return (
                    <td
                      key={key}
                      className="matrix-print-cell border border-slate-600 bg-white font-semibold"
                      title={sym === "" ? "offen" : sym === "x" ? "voll" : sym === "/" ? "teilweise" : "nicht"}
                    >
                      {sym || "\u00A0"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="matrix-print-legend mt-2 text-slate-700">
        Legende: <strong>x</strong> vollständig · <strong>/</strong> teilweise · <strong>−</strong> nicht behandelt ·
        leer noch nicht bewertet
      </p>
    </div>
  );
}
