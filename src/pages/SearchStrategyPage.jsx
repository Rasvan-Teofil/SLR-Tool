import { useCallback } from "react";
import PageHeader from "../components/PageHeader";
import PageLayout from "../components/PageLayout";
import PromptSection from "../components/PromptSection";
import InfoBox from "../components/InfoBox";
import SectionCard from "../components/SectionCard";
import KiQuickLinksBar from "../components/KiQuickLinksBar";
import PrismaDiagramImportCard from "../components/PrismaDiagramImportCard";
import PrismaExternalEmbed from "../components/PrismaExternalEmbed";
import { SEARCH_STRATEGY_AI_EXTRA_TOOLS } from "../config/toolsConfig";
import { applySearchStrategyPromptPlaceholders } from "../config/aiPrompts";
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
        subtitle="Dokumentiere Quellen, Synonyme je Konzept, Suchstrings und Ein- sowie Ausschlusskriterien."
      />

      <div className="mb-6">
        <KiQuickLinksBar title="KI-Schnellzugriff" extraTools={SEARCH_STRATEGY_AI_EXTRA_TOOLS} />
      </div>

      <PromptSection
        pageKey="searchStrategy"
        intro="Die Prompts beziehen Leitfrage, Unterfragen und Schlüsselbegriffe aus Schritt 1 sowie deine Entwürfe auf dieser Seite ein — inklusive Synonyme je Konzept und PRESS-orientierter Prüfung."
        resolvePrompt={resolveSearchStrategyPrompt}
      />

      <div className="mb-6 space-y-6">
        <SectionCard title="Datenbanken & Quellen">
          <textarea
            value={ss.databases}
            onChange={(e) => updateSearchStrategy({ databases: e.target.value })}
            rows={4}
            className={fieldClass}
            placeholder="z. B. IEEE Xplore, ACM Digital Library, Google Scholar …"
          />
        </SectionCard>

        <SectionCard title="Synonyme / Suchbegriffe je Konzept">
          <textarea
            value={ss.synonyms ?? ""}
            onChange={(e) => updateSearchStrategy({ synonyms: e.target.value })}
            rows={6}
            className={fieldClass}
            placeholder="Für jedes PICOC-Konzept mindestens drei englische Synonyme, verwandte Begriffe, Akronyme, Schreibweisen und Variationen sammeln."
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

        <InfoBox title="PRESS-Checkliste zur Prüfung des Suchstrings">
          <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
            <li>Übersetzung der Forschungsfrage: Passt der Suchstring zur PICOC-Frage?</li>
            <li>Boolean / Proximity Operatoren: Sind AND, OR, NOT und ggf. Näheoperatoren korrekt eingesetzt?</li>
            <li>Subject Headings: Sind relevante MeSH-Begriffe oder datenbankähnliche Schlagwörter genutzt?</li>
            <li>Freitextsuche: Sind Synonyme, Schreibweisen, Akronyme und DE/EN-Begriffe enthalten?</li>
            <li>Rechtschreibung und Syntax: Tippfehler, Klammern, Anführungszeichen, Trunkierungen und Feldcodes geprüft?</li>
            <li>Limits and Filter: Sind Zeitraum, Sprache, Dokumenttyp, Population etc. sinnvoll und begründet?</li>
          </ol>
        </InfoBox>

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
