import { useMemo } from "react";
import ConceptMatrixPrintTable from "../components/ConceptMatrixPrintTable";
import ConceptMatrixReadOnlyTable from "../components/ConceptMatrixReadOnlyTable";
import ExportButton from "../components/ExportButton";
import PageLayout from "../components/PageLayout";
import SectionCard from "../components/SectionCard";
import { brand } from "../config/brand";
import { useWorkshop } from "../context/WorkshopContext";
import { computeGapItems, computeStatistics, normalizeRatings } from "../lib/conceptMatrix";

function ReportBody({ children }) {
  return <div className="report-print-root space-y-8 text-slate-800">{children}</div>;
}

function ReportSection({ id, title, children, allowPageBreak = false }) {
  return (
    <section
      id={id}
      className={allowPageBreak ? "print:break-inside-auto" : "print:break-inside-avoid"}
    >
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
  const topGaps = useMemo(() => gapItems.slice(0, 5), [gapItems]);

  const today = new Date().toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <PageLayout>
      <div className="mb-6 flex flex-col gap-4 print:hidden sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Schritt 6 – Ergebnisübersicht</p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">Ihre SLR-Ergebnisübersicht</h1>
          <p className="mt-1 text-sm text-slate-600">
            Zum Nachschlagen beim Schreiben und Reflektieren. Als PDF über den Browser-Druckdialog speichern.
          </p>
        </div>
        <ExportButton />
      </div>

      <ReportBody>
        <header className="rounded-lg border border-slate-200 bg-slate-50 px-6 py-8 text-center print:border-slate-300 print:bg-white">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            {brand.productName} · Systematische Literaturübersicht
          </p>
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

        <ReportSection id="konzeptmatrix" title="3. Konzeptmatrix" allowPageBreak>
          <p className="mb-4 text-sm leading-relaxed text-slate-600 print:hidden">
            Vollständige Übersicht Ihrer Bewertungen (Webster &amp; Watson): Ideal, um Abdeckung und Lücken direkt am
            Raster zu erkennen — ohne in den Bearbeitungsmodus wechseln zu müssen.
          </p>
          <p className="mb-2 hidden text-xs text-slate-700 print:block">
            Konzeptmatrix (Druck: kompakte Symbole, siehe Legende unter der Tabelle).
          </p>

          <div className="print:hidden">
            <ConceptMatrixReadOnlyTable
              categories={categories}
              studies={studies}
              ratings={ratings}
              caption="Konzeptmatrix — Abdeckung je Studie und Unterkonzept"
            />
          </div>

          <ConceptMatrixPrintTable
            categories={categories}
            studies={studies}
            ratings={ratings}
            caption="Konzeptmatrix — Druckversion (kompakt)"
          />

          <p className="mt-3 text-xs text-slate-500 print:text-slate-600">
            Kompakt: {statistics.studies} Studien · {statistics.mainCategories} Hauptkategorien ·{" "}
            {statistics.subcategories} Unterkategorien · {statistics.ratings} gesetzte Bewertungen (ohne „noch nicht
            bewertet“).
          </p>

          <div className="mt-6">
            <SectionCard title="Wenig abgedeckte Konzepte (Top 5)">
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
                      <span className="shrink-0 font-medium text-orange-700">{item.coverage}% Abdeckung</span>
                    </li>
                  ))}
                </ul>
              )}
            </SectionCard>
          </div>

          {conceptMatrix.gapNotes ? (
            <div className="mt-4">
              <SectionCard title="Ihre Notizen zu Forschungslücken">
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
        Erstellt mit {brand.productName} · PDF über System-Dialog „Als PDF speichern“
      </p>
    </PageLayout>
  );
}
