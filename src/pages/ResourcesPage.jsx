import PageHeader from "../components/PageHeader";
import PageLayout from "../components/PageLayout";
import SectionCard from "../components/SectionCard";
import { resourcesPageConfig } from "../config/resourcesPage";

export default function ResourcesPage() {
  const { toolSections, extraLinks, references } = resourcesPageConfig;

  return (
    <PageLayout>
      <PageHeader
        stepLabel="Referenz — kein Arbeitsschritt des SLR-Prozesses"
        title="Ressourcen & Tools"
        subtitle="Gesammelte Hilfen für Recherche, Screening und Schreiben — ergänzend zu den Schnellzugriffen auf den Arbeitsschritten."
      />

      <div className="mb-10 space-y-10">
        {toolSections.map((section) => (
          <section key={section.id}>
            <h2 className="mb-1 text-base font-semibold text-slate-900">{section.title}</h2>
            {section.intro ? <p className="mb-4 text-sm text-slate-600">{section.intro}</p> : null}
            <ul className="grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {section.links.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex h-full flex-col gap-1 rounded-lg border border-slate-200 bg-slate-50/80 p-3 text-left shadow-sm transition hover:border-indigo-200 hover:bg-white hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    <span className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <span className="text-indigo-600" aria-hidden>
                        {item.icon}
                      </span>
                      {item.label}
                    </span>
                    {item.description ? (
                      <span className="pl-7 text-xs leading-snug text-slate-600">{item.description}</span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section>
          <h2 className="mb-3 text-base font-semibold text-slate-900">Weitere nützliche Links</h2>
          <div className="flex flex-wrap gap-2">
            {extraLinks.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50"
              >
                <span aria-hidden>{item.icon}</span>
                {item.label}
              </a>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-slate-900">Literatur & Referenzen</h2>
          <div className="space-y-3">
            {references.map((ref) => (
              <SectionCard key={ref.id} title={null}>
                <p className="text-sm font-medium text-slate-800">{ref.title}</p>
                {ref.note ? <p className="mt-2 text-sm text-slate-600">{ref.note}</p> : null}
                {ref.href ? (
                  <a
                    href={ref.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-2 inline-block text-sm font-medium text-indigo-700 underline-offset-2 hover:underline"
                  >
                    DOI / Link öffnen
                  </a>
                ) : null}
              </SectionCard>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
