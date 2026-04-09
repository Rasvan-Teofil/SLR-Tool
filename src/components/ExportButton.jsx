export default function ExportButton({ className = "" }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      title="Öffnet den Druckdialog. Das Layout ist für Hochformat (A4 hoch) und kompakten Bericht optimiert; im Dialog ggf. „Hochformat“ beibehalten."
      className={`rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-slate-50 print:hidden ${className}`}
    >
      Als PDF speichern (Druckdialog)
    </button>
  );
}
