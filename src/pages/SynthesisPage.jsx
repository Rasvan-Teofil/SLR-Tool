import PageHeader from "../components/PageHeader";
import PageLayout from "../components/PageLayout";
import PageToolGrid from "../components/PageToolGrid";
import PromptSection from "../components/PromptSection";
import InfoBox from "../components/InfoBox";
import SectionCard from "../components/SectionCard";
import { PAGE_TOOL_LINKS } from "../config/toolsConfig";
import { useWorkshop } from "../context/WorkshopContext";

const fieldClass =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none focus:border-indigo-400";

export default function SynthesisPage() {
  const { state, updateSynthesis } = useWorkshop();
  const sy = state.synthesis;

  return (
    <PageLayout>
      <PageHeader
        stepLabel="Schritt 3 – Synthese"
        title="Synthese und Einordnung"
        subtitle="Fassen Sie Muster, Widersprüche und offene Punkte aus der Literatur zusammen – als Grundlage für die strukturierte Konzeptmatrix im nächsten Schritt."
      />

      <PageToolGrid
        intro="KI-Tools zum Zusammenführen von Evidenz, Erkennen von Konflikten und Formulieren Ihrer SLR-Synthese — öffnen in einem neuen Tab."
        tools={PAGE_TOOL_LINKS.synthesis}
      />

      <PromptSection pageKey="synthesis" />

      <div className="mb-6 space-y-6">
        <InfoBox title="Arbeitshinweis">
          <p>
            Hier formulieren Sie die narrative Synthese Ihrer Literaturlage. Im nächsten Schritt ordnen Sie die
            Befunde in der Konzeptmatrix tabellarisch – die Ergebnisübersicht führt beides zusammen.
          </p>
        </InfoBox>

        <SectionCard title="Synthesetext / Kernerkenntnisse">
          <textarea
            value={sy.notes}
            onChange={(e) => updateSynthesis({ notes: e.target.value })}
            rows={10}
            className={fieldClass}
            placeholder="Thematische Cluster, konsistente Befunde, methodische Einschränkungen …"
          />
        </SectionCard>

        <SectionCard title="Implikationen & nächste Schritte">
          <textarea
            value={sy.implications}
            onChange={(e) => updateSynthesis({ implications: e.target.value })}
            rows={6}
            className={fieldClass}
            placeholder="Praxisrelevanz, Forschungslücken, mögliche Folgestudien …"
          />
        </SectionCard>
      </div>
    </PageLayout>
  );
}
