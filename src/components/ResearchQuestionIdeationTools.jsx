import { RESEARCH_IDEATION_QUICK_LINKS } from "../config/toolsConfig";

/**
 * Kompakte KI-Schnellzugriffe für die frühe Ideation (Leitfrage, Unterfragen, Begriffe).
 */
export default function ResearchQuestionIdeationTools() {
  return (
    <div className="rounded-lg border border-indigo-100 bg-indigo-50/50 px-3 py-2.5">
      <p className="mb-2 text-xs font-medium text-indigo-900">KI-Hilfe zum Entwickeln der Forschungsfrage</p>
      <p className="mb-2 text-[11px] leading-snug text-slate-600">
        Links öffnen in einem neuen Tab — ideal, um dein Vorhaben zu erklären, eine Leitfrage zu finden, Unterfragen
        abzuleiten oder Begriffe zu sammeln.
      </p>
      <div className="flex flex-wrap gap-1.5">
        {RESEARCH_IDEATION_QUICK_LINKS.map((tool) => (
          <a
            key={tool.id}
            href={tool.href}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 rounded-md border border-indigo-200 bg-white px-2 py-1 text-[11px] font-medium text-indigo-900 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50"
          >
            <span className="opacity-70" aria-hidden>
              {tool.icon}
            </span>
            {tool.label}
          </a>
        ))}
      </div>
    </div>
  );
}
