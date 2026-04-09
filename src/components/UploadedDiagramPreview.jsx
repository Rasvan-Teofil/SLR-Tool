/**
 * Compact preview for a PRISMA diagram stored as data URL (PNG in v1).
 * @param {{ fileName: string, mimeType?: string, dataUrl: string, uploadedAt?: string } | null | undefined} asset
 */
export default function UploadedDiagramPreview({ asset, className = "", variant = "editor" }) {
  if (!asset?.dataUrl) return null;

  const isPrint = variant === "report";
  const imgClass = isPrint
    ? "w-full max-w-full object-contain print:max-w-full"
    : "mx-auto max-h-56 w-full max-w-2xl object-contain sm:max-h-72 md:max-h-80";

  const wrapClass =
    variant === "report"
      ? `print:break-inside-avoid ${className}`.trim()
      : className.trim();

  const dateLabel = asset.uploadedAt
    ? new Date(asset.uploadedAt).toLocaleString("de-DE", {
        dateStyle: "short",
        timeStyle: "short",
      })
    : null;

  return (
    <div
      className={`rounded-md border border-slate-200 bg-white p-2 print:border-slate-300 print:bg-white ${wrapClass}`.trim()}
    >
      <img
        src={asset.dataUrl}
        alt={`PRISMA flow diagram: ${asset.fileName}`}
        className={imgClass}
      />
      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600">
        <span className="font-medium text-slate-700">{asset.fileName}</span>
        {dateLabel ? <span className="text-slate-500">· {dateLabel}</span> : null}
        <span className="text-slate-500">· PNG</span>
      </div>
    </div>
  );
}
