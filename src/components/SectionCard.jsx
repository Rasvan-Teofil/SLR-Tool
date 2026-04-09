export default function SectionCard({ title, children, className = "" }) {
  return (
    <section
      className={`rounded-lg border border-slate-200 bg-slate-50/80 p-4 md:p-5 print:break-inside-avoid print:border-slate-300 print:bg-white print:p-3 print:md:p-3 ${className}`}
    >
      {title ? (
        <h2 className="mb-3 text-base font-semibold text-slate-800 print:mb-1.5 print:text-sm">{title}</h2>
      ) : null}
      <div className="text-sm leading-relaxed text-slate-700">{children}</div>
    </section>
  );
}
