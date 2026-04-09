import { useMemo } from "react";
import ExportButton from "../components/ExportButton";
import PageLayout from "../components/PageLayout";
import SectionCard from "../components/SectionCard";
import { useWorkshop } from "../context/WorkshopContext";
import {
  computeGapItems,
  computeStatistics,
  normalizeRatings,
} from "../lib/conceptMatrix";

function ReportBody({ children }) {
  return <div className="report-print-root space-y-8 text-slate-800">{children}</div>;
}

function ReportSection({ id, title, children }) {
  return (
    <section id={id} className="print:break-inside-avoid">
      <h2 className="mb-3 border-b border-slate-200 pb-2 text-lg font-semibold text-slate-900">{title}</h2>
      {children}
    </section>
  );
}

function Prose({ children, emptyText = "— Noch keine Inhalte erfasst —" }) {
  const text = typeof children === "string" ? children.trim() : children;
  if (!text) {
    return <p className="whitespace-pre-wrap text-sm italic text-slate-500">{emptyText}</p>;
  }
  return <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{children}</p>;
}

export default function DashboardPage() {
  const { state } = useWorkshop();
  const { researchQuestion, searchStrategy, conceptMatrix, synthesis } = state;

  const categories = conceptMatrix.categories;
  const studies = conceptMatrix.studies;
  const ratings = useMemo(
    () => normalizeRatings(categories, studies, conceptMatrix.ratings),
    [categories, studies, conceptMatrix.ratings]
  );
  const statistics = useMemo(
    () => computeStatistics(categories, studies, ratings),
    [categories, ratings, studies]
  );
  const gapItems = useMemo(() => computeGapItems(categories, studies, ratings), [categories, ratings, studies]);
  const topGaps = useMemo(() => gapItems.slice(0, 8), [gapItems]);

  const today = new Date().toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <PageLayout>
      <div className="mb-6 flex flex-col gap-4 print:hidden sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Schritt 5 – Ergebnisübersicht</p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">Workshop-Report</h1>
          <p className="mt-1 text-sm text-slate-600">
            Zusammenführung aller Workshop-Schritte. Drucken oder als PDF speichern über den Browser.
          </p>
        </div>
        <ExportButton />
      </div>

      <ReportBody>
        <header className="rounded-lg border border-slate-200 bg-slate-50 px-6 py-8 text-center print:border-slate-300 print:bg-white">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Systematische Literaturübersicht</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{conceptMatrix.title}</h1>
          <p className="mt-2 text-sm text-slate-600">{conceptMatrix.subtitle}</p>
          <p className="mt-4 text-xs text-slate-500">Stand: {today}</p>
        </header>

        <ReportSection id="forschungsfrage" title="1. Forschungsfrage">
          <SectionCard title="Leitforschungsfrage">
            <Prose>{researchQuestion.mainQuestion}</Prose>
          </SectionCard>
          {researchQuestion.subQuestions ? (
            <div className="mt-4">
              <SectionCard title="Unterfragen / Teilziele">
                <Prose emptyText="">{researchQuestion.subQuestions}</Prose>
              </SectionCard>
            </div>
          ) : null}
          {researchQuestion.keywords ? (
            <div className="mt-4">
              <SectionCard title="Schlüsselbegriffe">
                <Prose emptyText="">{researchQuestion.keywords}</Prose>
              </SectionCard>
            </div>
          ) : null}
        </ReportSection>

        <ReportSection id="suchstrategie" title="2. Suchstrategie">
          <div className="grid gap-4 md:grid-cols-2">
            <SectionCard title="Datenbanken & Quellen">
              <Prose>{searchStrategy.databases}</Prose>
            </SectionCard>
            <SectionCard title="Suchstring">
              <Prose>{searchStrategy.searchString}</Prose>
            </SectionCard>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <SectionCard title="Einschlusskriterien">
              <Prose>{searchStrategy.inclusionCriteria}</Prose>
            </SectionCard>
            <SectionCard title="Ausschlusskriterien">
              <Prose>{searchStrategy.exclusionCriteria}</Prose>
            </SectionCard>
          </div>
          <div className="mt-4 space-y-4">
            <SectionCard title="PRISMA: Identifikation">
              <Prose>{searchStrategy.prismaIdentification}</Prose>
            </SectionCard>
            <SectionCard title="PRISMA: Screening">
              <Prose>{searchStrategy.prismaScreening}</Prose>
            </SectionCard>
            <SectionCard title="PRISMA: Eignung (Volltext)">
              <Prose>{searchStrategy.prismaEligibility}</Prose>
            </SectionCard>
            <SectionCard title="PRISMA: Eingeschlossene Studien">
              <Prose>{searchStrategy.prismaIncluded}</Prose>
            </SectionCard>
            {searchStrategy.notes ? (
              <SectionCard title="Weitere Protokollnotizen">
                <Prose emptyText="">{searchStrategy.notes}</Prose>
              </SectionCard>
            ) : null}
          </div>
        </ReportSection>

        <ReportSection id="konzeptmatrix" title="3. Konzeptmatrix – Aggregierte Einblicke">
          <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { value: statistics.studies, label: "Studien" },
              { value: statistics.mainCategories, label: "Hauptkategorien" },
              { value: statistics.subcategories, label: "Unterkategorien" },
              { value: statistics.ratings, label: "Bewertungen" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-slate-200 bg-white px-3 py-4 text-center print:border-slate-300"
              >
                <div className="text-2xl font-bold text-indigo-800">{item.value}</div>
                <div className="text-xs font-medium text-slate-600">{item.label}</div>
              </div>
            ))}
          </div>

          <SectionCard title="Konzepte mit niedrigster thematischer Abdeckung (Auszug)">
            {topGaps.length === 0 ? (
              <Prose>Keine Matrix-Daten verfügbar.</Prose>
            ) : (
              <ul className="list-none space-y-2 p-0">
                {topGaps.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-3 rounded-md border border-slate-100 bg-white px-3 py-2 text-sm print:border-slate-200"
                  >
                    <span className="text-slate-800">{item.label}</span>
                    <span className="shrink-0 font-medium text-orange-700">{item.coverage}%</span>
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>

          {conceptMatrix.gapNotes ? (
            <div className="mt-4">
              <SectionCard title="Notizen zu Forschungslücken (Konzeptmatrix)">
                <Prose emptyText="">{conceptMatrix.gapNotes}</Prose>
              </SectionCard>
            </div>
          ) : null}
        </ReportSection>

        <ReportSection id="synthese" title="4. Synthese">
          <SectionCard title="Kernerkenntnisse">
            <Prose>{synthesis.notes}</Prose>
          </SectionCard>
          {synthesis.implications ? (
            <div className="mt-4">
              <SectionCard title="Implikationen & nächste Schritte">
                <Prose emptyText="">{synthesis.implications}</Prose>
              </SectionCard>
            </div>
          ) : null}
        </ReportSection>
      </ReportBody>

      <p className="mt-8 hidden text-center text-xs text-slate-500 print:block">
        Erstellt mit dem SLR Workshop-Tool · PDF über System-Dialog „Als PDF speichern“
      </p>
    </PageLayout>
  );
}
