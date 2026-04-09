import { useCallback, useState } from "react";

const toolbarClass =
  "flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600";

const fallbackBoxClass =
  "rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950";

/**
 * Embeds an external web app in an iframe with a manual fallback if framing fails for the user.
 * Automatic blocking detection is unreliable cross-origin; users can switch to link-only mode.
 */
export default function ExternalToolEmbed({
  embedUrl,
  iframeTitle,
  children,
  stateSyncNote,
  openInNewTabLabel = "PRISMA-Tool in neuem Tab öffnen",
  fallbackHint = "Die Einbettung kann von Ihrem Browser oder von Sicherheitsregeln der Zielseite blockiert werden.",
  fallbackActionLabel = "Nur Link anzeigen (Einbettung funktioniert hier nicht)",
  backToEmbedLabel = "Einbettung erneut versuchen",
  className = "",
}) {
  const [preferFallback, setPreferFallback] = useState(false);

  const openExternal = useCallback(() => {
    window.open(embedUrl, "_blank", "noopener,noreferrer");
  }, [embedUrl]);

  if (preferFallback) {
    return (
      <div className={`space-y-3 ${className}`.trim()}>
        {children}
        {stateSyncNote ? <p className="text-xs text-slate-500">{stateSyncNote}</p> : null}
        <div className={fallbackBoxClass}>
          <p className="mb-3">{fallbackHint}</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={openExternal}
              className="inline-flex items-center justify-center rounded-lg border border-slate-900 bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
            >
              {openInNewTabLabel}
            </button>
            <button
              type="button"
              onClick={() => setPreferFallback(false)}
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              {backToEmbedLabel}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`.trim()}>
      {children}
      {stateSyncNote ? <p className="text-xs text-slate-500">{stateSyncNote}</p> : null}

      <div className="overflow-hidden rounded-md border border-slate-300 bg-slate-100 print:hidden">
        <iframe
          src={embedUrl}
          title={iframeTitle}
          className="block h-[min(85vh,920px)] w-full min-h-[32rem] border-0 sm:min-h-[36rem]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allow="clipboard-read; clipboard-write; fullscreen"
          allowFullScreen
        />
        <div className={toolbarClass}>
          <a
            href={embedUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="font-medium text-indigo-700 underline decoration-indigo-400 underline-offset-2 hover:text-indigo-900"
          >
            {openInNewTabLabel}
          </a>
          <span className="text-slate-400">·</span>
          <button
            type="button"
            onClick={() => setPreferFallback(true)}
            className="text-left font-medium text-indigo-700 underline decoration-indigo-400 underline-offset-2 hover:text-indigo-900"
          >
            {fallbackActionLabel}
          </button>
        </div>
      </div>
      <p className="hidden text-xs text-slate-500 print:block">
        PRISMA-Tool:{" "}
        <a href={embedUrl} className="break-all text-indigo-800 underline">
          {embedUrl}
        </a>
      </p>
    </div>
  );
}
