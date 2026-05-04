import { AI_QUICK_LINK_CORE } from "../config/toolsConfig";

/**
 * Einheitliche KI-Schnellzugriffe: ChatGPT, Gemini, Claude (+ optionale Zusatz-Tools).
 * Gleicher visueller Aufbau wie die Ideations-Toolbox in Schritt 1.
 *
 * @param {{ id: string, label: string, href: string, icon?: string }[]} [extraTools]
 * @param {string} [title]
 * @param {string | null} [intro]
 */
export default function KiQuickLinksBar({
  extraTools = [],
  title = "KI-Schnellzugriff",
  intro = "Links öffnen in einem neuen Tab — Prompt aus dem Tool hier kopieren und in die KI einfügen.",
}) {
  const tools = [...AI_QUICK_LINK_CORE, ...(extraTools ?? [])];

  return (
    <div className="rounded-lg border border-indigo-100 bg-indigo-50/50 px-3 py-2.5">
      <p className="mb-2 text-xs font-medium text-indigo-900">{title}</p>
      {intro ? (
        <p className="mb-2 text-[11px] leading-snug text-slate-600">{intro}</p>
      ) : null}
      <div className="flex flex-wrap gap-1.5">
        {tools.map((tool) => (
          <a
            key={tool.id}
            href={tool.href}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 rounded-md border border-indigo-200 bg-white px-2 py-1 text-[11px] font-medium text-indigo-900 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50"
          >
            {tool.icon ? (
              <span className="opacity-70" aria-hidden>
                {tool.icon}
              </span>
            ) : null}
            {tool.label}
          </a>
        ))}
      </div>
    </div>
  );
}
