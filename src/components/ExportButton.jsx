export default function ExportButton({ className = "" }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-slate-50 print:hidden ${className}`}
    >
      Als PDF speichern (Druckdialog)
    </button>
  );
}
