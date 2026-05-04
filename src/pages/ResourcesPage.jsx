import PageHeader from "../components/PageHeader";
import PageLayout from "../components/PageLayout";
import SectionCard from "../components/SectionCard";
import { resourcesPageConfig } from "../config/resourcesPage";

export default function ResourcesPage() {
  const { resourceSections, baseLinks, references } = resourcesPageConfig;

  return (
    <PageLayout>
      <PageHeader
        stepLabel="Referenz — kein Arbeitsschritt des SLR-Prozesses"
        title="Ressourcen & Tools entlang des SLR-Prozesses"
        subtitle="Kuratierte Hilfen für Forschungsfrage, Suchstrategie, Screening, Analyse, Kodierung und Konzeptmatrix — ergänzend zum Workshop und zur späteren Masterarbeit."
      />

      <div className="mb-10 space-y-10">
        {resourceSections.map((section) => (
          <section key={section.id}>
            <h2 className="mb-1 text-base font-semibold text-slate-900">{section.title}</h2>
            {section.intro ? <p className="mb-4 text-sm text-slate-600">{section.intro}</p> : null}
            <ul className="grid list-none gap-3 p-0 md:grid-cols-2 xl:grid-cols-4">
              {section.links.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex h-full flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50/80 p-4 text-left shadow-sm transition hover:border-indigo-200 hover:bg-white hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className="text-sm font-semibold leading-snug text-slate-900">{item.label}</span>
                      <span className="shrink-0 rounded-full border border-indigo-100 bg-indigo-50 px-2 py-0.5 text-[11px] font-medium text-indigo-800">
                        {item.type}
                      </span>
                    </span>
                    <span className="text-xs leading-snug text-slate-600">{item.description}</span>
                    <span className="text-xs leading-snug text-slate-700">
                      <span className="font-semibold text-slate-800">Einsatz:</span> {item.purpose}
                    </span>
                    <span className="text-xs leading-snug text-slate-500">
                      <span className="font-semibold text-slate-600">Achtung:</span> {item.caution}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section>
          <h2 className="mb-1 text-base font-semibold text-slate-900">5. Weitere Basisressourcen</h2>
          <p className="mb-4 text-sm text-slate-600">
            Kompakte Einstiegspunkte für Suche, Metadaten, Open Access, Reporting und Literaturverwaltung.
          </p>
          <div className="flex flex-wrap gap-2">
            {baseLinks.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50"
              >
                <span>{item.label}</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                  {item.type}
                </span>
              </a>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-slate-900">6. Literatur & Referenzen</h2>
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
