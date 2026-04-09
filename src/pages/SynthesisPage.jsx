import PageHeader from "../components/PageHeader";
import PageLayout from "../components/PageLayout";
import InfoBox from "../components/InfoBox";
import SectionCard from "../components/SectionCard";
import { useWorkshop } from "../context/WorkshopContext";

const fieldClass =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none focus:border-indigo-400";

export default function SynthesisPage() {
  const { state, updateSynthesis } = useWorkshop();
  const sy = state.synthesis;

  return (
    <PageLayout>
      <PageHeader
        stepLabel="Schritt 4 – Synthese"
        title="Synthese und Einordnung"
        subtitle="Fassen Sie Muster, Widersprüche und offene Punkte aus der Literatur zusammen – als Überleitung zur dokumentierten Ergebnisübersicht."
      />

      <div className="mb-6 space-y-6">
        <InfoBox title="Arbeitshinweis">
          <p>
            Die Konzeptmatrix liefert strukturierte Evidenz zur Abdeckung von Konzepten; hier ordnen Sie die
            inhaltliche Story und Ihre Interpretation für den Workshop-Report ein.
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
