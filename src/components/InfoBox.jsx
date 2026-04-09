export default function InfoBox({ title, children }) {
  return (
    <aside className="rounded-lg border-l-4 border-blue-500 bg-slate-100 px-4 py-4 print:break-inside-avoid">
      {title ? <h3 className="mb-2 text-sm font-semibold text-blue-900">{title}</h3> : null}
      <div className="text-sm text-slate-700">{children}</div>
    </aside>
  );
}
