import { AI_PROMPTS_BY_PAGE } from "../config/aiPrompts";
import PromptCard from "./PromptCard";

/**
 * @param {keyof typeof AI_PROMPTS_BY_PAGE} pageKey
 * @param {string | null} [intro] — optional; Standard kein Fließtext (kompakte UI)
 * @param {(item: { id: string, title: string, prompt: string }) => string} [resolvePrompt] — optional; z. B. Schritt 1 mit Formularwerten
 * @param {string} [sectionTitle] — optionale Überschrift statt „KI-Prompts“
 * @param {string} [gridClassName] — optionale Tailwind-Grid-Klassen für die Karten (Standard: 2–3 Spalten ab sm)
 */
export default function PromptSection({
  pageKey,
  intro = null,
  resolvePrompt = null,
  sectionTitle = "KI-Prompts",
  gridClassName = "sm:grid-cols-2 lg:grid-cols-3",
}) {
  const prompts = AI_PROMPTS_BY_PAGE[pageKey];
  if (!prompts?.length) return null;

  return (
    <section
      className="mb-6 border-t border-slate-200 pt-4"
      aria-labelledby={`prompt-section-${pageKey}`}
    >
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <h2 id={`prompt-section-${pageKey}`} className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {sectionTitle}
        </h2>
      </div>
      {intro ? <p className="mb-3 text-xs leading-snug text-slate-600">{intro}</p> : null}

      <div className={`grid grid-cols-1 gap-3 ${gridClassName}`}>
        {prompts.map((item) => {
          const promptText = resolvePrompt ? resolvePrompt(item) : item.prompt;
          return <PromptCard key={item.id} title={item.title} prompt={promptText} />;
        })}
      </div>
    </section>
  );
}
