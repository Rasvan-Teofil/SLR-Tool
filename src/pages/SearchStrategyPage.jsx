import PageHeader from "../components/PageHeader";
import PageLayout from "../components/PageLayout";
import PageToolGrid from "../components/PageToolGrid";
import InfoBox from "../components/InfoBox";
import SectionCard from "../components/SectionCard";
import { PAGE_TOOL_LINKS } from "../config/pageToolLinks";
import { useWorkshop } from "../context/WorkshopContext";

const fieldClass =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none focus:border-indigo-400";

export default function SearchStrategyPage() {
  const { state, updateSearchStrategy } = useWorkshop();
  const ss = state.searchStrategy;

  return (
    <PageLayout>
      <PageHeader
        stepLabel="Schritt 2 – Suchstrategie"
        title="Suchstrategie und Dokumentation"
        subtitle="Dokumentieren Sie Quellen, Suchstrings und Kriterien. Die PRISMA-Phasen fassen die Protokollierung strukturiert zusammen (ohne separates Flow-Diagramm)."
      />

      <PageToolGrid
        intro="Datenbanken, Operatoren und Reporting — ausgewählt für die Dokumentation Ihrer Suche."
        tools={PAGE_TOOL_LINKS.searchStrategy}
      />

      <div className="mb-6 space-y-6">
        <InfoBox title="PRISMA-orientierte Struktur">
          <p>
            Nutzen Sie die vier Felder unten, um Treffer aus Identifikation, Screening, Eignungsprüfung und
            finalen Einschluss kurz zu erfassen. Ergänzen Sie Details Ihres Suchprotokolls in den allgemeinen
            Notizen.
          </p>
        </InfoBox>

        <SectionCard title="Datenbanken & Quellen">
          <textarea
            value={ss.databases}
            onChange={(e) => updateSearchStrategy({ databases: e.target.value })}
            rows={4}
            className={fieldClass}
            placeholder="z. B. IEEE Xplore, ACM Digital Library, Google Scholar …"
          />
        </SectionCard>

        <SectionCard title="Suchstring / Suchlogik">
          <textarea
            value={ss.searchString}
            onChange={(e) => updateSearchStrategy({ searchString: e.target.value })}
            rows={5}
            className={fieldClass}
            placeholder="Vollständige Booleschen Ausdrücke oder tabellarische Zerlegung nach Konzepten."
          />
        </SectionCard>

        <div className="grid gap-6 md:grid-cols-2">
          <SectionCard title="Einschlusskriterien">
            <textarea
              value={ss.inclusionCriteria}
              onChange={(e) => updateSearchStrategy({ inclusionCriteria: e.target.value })}
              rows={6}
              className={fieldClass}
              placeholder="Population, Intervention, Outcomes …"
            />
          </SectionCard>
          <SectionCard title="Ausschlusskriterien">
            <textarea
              value={ss.exclusionCriteria}
              onChange={(e) => updateSearchStrategy({ exclusionCriteria: e.target.value })}
              rows={6}
              className={fieldClass}
              placeholder="Konferenz-only, Sprache, Zeitraum …"
            />
          </SectionCard>
        </div>

        <SectionCard title="PRISMA: Identifikation (Treffer aus Recherche)">
          <textarea
            value={ss.prismaIdentification}
            onChange={(e) => updateSearchStrategy({ prismaIdentification: e.target.value })}
            rows={3}
            className={fieldClass}
            placeholder="Anzahl Datensätze je Quelle, Dubletten, gesamt identifiziert …"
          />
        </SectionCard>

        <SectionCard title="PRISMA: Screening (Titel/Abstract)">
          <textarea
            value={ss.prismaScreening}
            onChange={(e) => updateSearchStrategy({ prismaScreening: e.target.value })}
            rows={3}
            className={fieldClass}
            placeholder="Geprüft, ausgeschlossen, ausgeschlossen mit Gründen …"
          />
        </SectionCard>

        <SectionCard title="PRISMA: Eignung (Volltext)">
          <textarea
            value={ss.prismaEligibility}
            onChange={(e) => updateSearchStrategy({ prismaEligibility: e.target.value })}
            rows={3}
            className={fieldClass}
            placeholder="Volltext angefordert/assessed, ausgeschlossen mit Gründen …"
          />
        </SectionCard>

        <SectionCard title="PRISMA: Eingeschlossene Studien">
          <textarea
            value={ss.prismaIncluded}
            onChange={(e) => updateSearchStrategy({ prismaIncluded: e.target.value })}
            rows={3}
            className={fieldClass}
            placeholder="Final eingeschlossen, qualitative/quantitative Synthese …"
          />
        </SectionCard>

        <SectionCard title="Weitere Notizen zum Protokoll">
          <textarea
            value={ss.notes}
            onChange={(e) => updateSearchStrategy({ notes: e.target.value })}
            rows={4}
            className={fieldClass}
            placeholder="Besonderheiten, Snowballing, Forward/Backward Search …"
          />
        </SectionCard>
      </div>
    </PageLayout>
  );
}
