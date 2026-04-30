import { useCallback } from "react";
import PageHeader from "../components/PageHeader";
import PageLayout from "../components/PageLayout";
import PageToolGrid from "../components/PageToolGrid";
import PromptSection from "../components/PromptSection";
import InfoBox from "../components/InfoBox";
import SectionCard from "../components/SectionCard";
import PrismaDiagramImportCard from "../components/PrismaDiagramImportCard";
import PrismaExternalEmbed from "../components/PrismaExternalEmbed";
import { applySearchStrategyPromptPlaceholders } from "../config/aiPrompts";
import { PAGE_TOOL_LINKS } from "../config/toolsConfig";
import { useWorkshop } from "../context/WorkshopContext";

const fieldClass =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none focus:border-indigo-400";

export default function SearchStrategyPage() {
  const { state, updateSearchStrategy } = useWorkshop();
  const ss = state.searchStrategy;

  const resolveSearchStrategyPrompt = useCallback(
    (item) =>
      applySearchStrategyPromptPlaceholders(item.prompt, {
        researchQuestion: state.researchQuestion,
        searchStrategy: ss,
      }),
    [state.researchQuestion, ss]
  );

  return (
    <PageLayout>
      <PageHeader
        stepLabel="Schritt 2 – Suchstrategie"
        title="Suchstrategie und Dokumentation"
        subtitle="Dokumentieren Sie Quellen, Suchstrings und Kriterien. Das eingebettete Flowdiagramm-Tool und der PNG-Upload ergänzen die Dokumentation auf dieser Seite."
      />

      <PageToolGrid
        intro="KI-Tools zur systematischen Literaturfindung, Netzwerken und Qualitätschecks — öffnen in einem neuen Tab."
        tools={PAGE_TOOL_LINKS.searchStrategy}
      />

      <PromptSection
        pageKey="searchStrategy"
        intro="Die Prompts beziehen automatisch deine Angaben aus Schritt 1 (Leitfrage, Unterfragen, Schlüsselbegriffe) und die Entwürfe auf dieser Seite ein."
        resolvePrompt={resolveSearchStrategyPrompt}
      />

      <div className="mb-6 space-y-6">
        <InfoBox title="PRISMA-Flowdiagramm">
          <p>
            Unten ist das externe PRISMA-Flowdiagramm-Tool eingebettet — Änderungen dort werden nicht automatisch in
            diesem Arbeitsblatt gespeichert. Sie können das exportierte Diagramm (PNG) anschließend hochladen; es
            erscheint in der Ergebnisübersicht.
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

        <PrismaExternalEmbed />

        <PrismaDiagramImportCard />

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
