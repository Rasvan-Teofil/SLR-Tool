import { useCallback, useRef, useState } from "react";

const FEEDBACK_MS = 2200;

/**
 * Kompakte Prompt-Karte (nur Kopieren). description / toolHref in der Config bleiben erhalten, werden hier nicht gerendert.
 */
export default function PromptCard({ title, prompt }) {
  const [copyState, setCopyState] = useState("idle");
  const resetTimerRef = useRef(null);

  const copyPrompt = useCallback(async () => {
    const text = (prompt ?? "").trim();
    if (!text) return;

    if (resetTimerRef.current) {
      window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopyState("copied");
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        setCopyState("copied");
      } catch {
        setCopyState("error");
      }
    }

    resetTimerRef.current = window.setTimeout(() => {
      setCopyState("idle");
      resetTimerRef.current = null;
    }, FEEDBACK_MS);
  }, [prompt]);

  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200/90 bg-white p-2.5 shadow-sm">
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="min-w-0 text-xs font-semibold leading-snug text-slate-800 line-clamp-2" title={title}>
          {title}
        </h3>
        <div className="flex shrink-0 items-center gap-1.5">
          {copyState === "copied" ? (
            <span className="text-[10px] font-medium text-green-700" role="status">
              Kopiert
            </span>
          ) : null}
          {copyState === "error" ? (
            <span className="text-[10px] font-medium text-red-600" role="status">
              Fehler
            </span>
          ) : null}
          <button
            type="button"
            onClick={copyPrompt}
            className="rounded border border-slate-300 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-800 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-indigo-500"
            aria-label={`Prompt kopieren: ${title}`}
          >
            Kopieren
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 rounded border border-slate-200 bg-slate-50/80">
        <pre className="max-h-28 overflow-y-auto whitespace-pre-wrap break-words p-2 font-sans text-[11px] leading-snug text-slate-700">
          {prompt}
        </pre>
      </div>
    </article>
  );
}
