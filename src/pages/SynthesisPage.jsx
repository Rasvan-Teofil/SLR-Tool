import { useCallback } from "react";
import PageHeader from "../components/PageHeader";
import PageLayout from "../components/PageLayout";
import PromptSection from "../components/PromptSection";
import InfoBox from "../components/InfoBox";
import SectionCard from "../components/SectionCard";
import { applySynthesisPromptPlaceholders } from "../config/aiPrompts";
import { useWorkshop } from "../context/WorkshopContext";

const fieldClass =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none focus:border-indigo-400";

export default function SynthesisPage() {
  const { state, updateSynthesis } = useWorkshop();
  const sy = state.synthesis;

  const resolveSynthesisPrompt = useCallback(
    (item) =>
      applySynthesisPromptPlaceholders(item.prompt, {
        researchQuestion: state.researchQuestion,
        synthesis: sy,
      }),
    [state.researchQuestion, sy]
  );

  return (
    <PageLayout>
      <PageHeader
        stepLabel="Schritt 3 – Synthese"
        title="Synthese und Kodierung"
        subtitle="Aus den Papers Kategorien, Muster und Forschungslücken ableiten — als Vorbereitung für die Konzeptmatrix."
      />

      <SectionCard title="Was ist in der Synthese zu tun?">
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
          <li>relevante Studien vergleichen und gegenüberstellen</li>
          <li>wiederkehrende Themen und Cluster identifizieren</li>
          <li>Kategorien bilden und einen Kodierleitfaden festhalten</li>
          <li>zentrale Konzepte und methodische Unterschiede festhalten</li>
          <li>Forschungslücken und Widersprüche benennen</li>
          <li>Ergebnisse später in Konzeptmatrix und Ergebnisübersicht überführen</li>
        </ul>
      </SectionCard>

      <div className="mb-6 mt-6 space-y-6">
        <SectionCard title="Kategorien (Artefakt)">
          <p className="mb-2 text-sm text-slate-600">
            Notiere vorläufige Synthese-Kategorien: z. B. Name, kurze Beschreibung, typische Papers, charakteristische
            Befunde.
          </p>
          <textarea
            value={sy.categoryNotes}
            onChange={(e) => updateSynthesis({ categoryNotes: e.target.value })}
            rows={8}
            className={fieldClass}
            placeholder={`Beispiel:\n• Kategorie „Digital Leadership“ — Beschreibung … — Papers: … — typische Befunde …`}
          />
        </SectionCard>

        <SectionCard title="Kodierleitfaden (Artefakt)">
          <p className="mb-2 text-sm text-slate-600">
            Definitionen und Regeln, wie du Textstellen oder Befunde den Kategorien zuordnest.
          </p>
          <textarea
            value={sy.codingGuide}
            onChange={(e) => updateSynthesis({ codingGuide: e.target.value })}
            rows={8}
            className={fieldClass}
            placeholder={`Pro Kategorie z. B.: Code / Kategorie — Definition — Einschlussregel — Ausschlussregel — Beispiel aus einem Paper …`}
          />
        </SectionCard>

        <SectionCard title="Kernerkenntnisse / Synthesetext">
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

      <InfoBox title="Exzerpte für KI-Prompts">
        <p className="text-sm text-slate-700">
          Für den Prompt „Synthese-Kategorien aus Zusammenfassungen“ fügst du Paper-Zusammenfassungen am besten direkt
          in den Chat der gewählten KI ein — der Platzhalter im kopierten Prompt markiert die Stelle dafür. Leitfrage
          und Felder aus diesem Tool werden automatisch ergänzt, wo vorgesehen.
        </p>
      </InfoBox>

      <PromptSection
        pageKey="synthesis"
        intro="KI-Unterstützung für Kategorien, Kodierleitfaden und Muster/Lücken — mit Bezug zu deiner Leitfrage und den Synthesefeldern."
        resolvePrompt={resolveSynthesisPrompt}
      />
    </PageLayout>
  );
}
