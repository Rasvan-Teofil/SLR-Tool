export default function PageToolGrid({ title = "Schnellzugriff", intro, tools }) {
  if (!tools?.length) return null;

  return (
    <section className="mb-8 rounded-xl border border-slate-200 bg-slate-50/90 p-4 md:p-5">
      <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
      {intro ? <p className="mt-1 text-sm leading-relaxed text-slate-600">{intro}</p> : null}
      <ul className="mt-4 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer noopener"
              className="flex h-full flex-col gap-1 rounded-lg border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:border-indigo-200 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              <span className="flex items-start gap-2">
                <span className="text-lg leading-none text-indigo-600" aria-hidden>
                  {item.icon}
                </span>
                <span className="text-sm font-semibold text-slate-900">{item.label}</span>
              </span>
              {item.description ? (
                <span className="pl-8 text-xs leading-snug text-slate-600">{item.description}</span>
              ) : null}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
