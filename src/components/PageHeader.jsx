export default function PageHeader({ title, subtitle, stepLabel }) {
  return (
    <header className="mb-6 border-b border-slate-100 pb-5">
      {stepLabel ? (
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">{stepLabel}</p>
      ) : null}
      <h1 className="text-2xl font-bold tracking-tight text-slate-800 md:text-3xl">{title}</h1>
      {subtitle ? <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">{subtitle}</p> : null}
    </header>
  );
}
