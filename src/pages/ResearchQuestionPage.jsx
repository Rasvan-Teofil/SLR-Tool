import { useCallback } from "react";
import PageHeader from "../components/PageHeader";
import PageLayout from "../components/PageLayout";
import PromptSection from "../components/PromptSection";
import InfoBox from "../components/InfoBox";
import SectionCard from "../components/SectionCard";
import ResearchQuestionIdeationTools from "../components/ResearchQuestionIdeationTools";
import { applyResearchQuestionPromptPlaceholders } from "../config/aiPrompts";
import { useWorkshop } from "../context/WorkshopContext";

const fieldClass =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none focus:border-indigo-400";

export default function ResearchQuestionPage() {
  const { state, updateResearchQuestion, updateConceptMatrix } = useWorkshop();
  const rq = state.researchQuestion;
  const reportTitle = state.conceptMatrix.title;

  const resolveResearchQuestionPrompt = useCallback(
    (item) =>
      applyResearchQuestionPromptPlaceholders(item.prompt, {
        reportTitle,
        mainQuestion: rq.mainQuestion,
        subQuestions: rq.subQuestions,
        keywords: rq.keywords,
        firstIdea: rq.firstIdea,
        picocNotes: rq.picocNotes,
      }),
    [reportTitle, rq.mainQuestion, rq.subQuestions, rq.keywords, rq.firstIdea, rq.picocNotes]
  );

  return (
    <PageLayout>
      <PageHeader stepLabel="Schritt 1 – Forschungsfrage" title="Forschungsfrage formulieren" />

      <div className="mb-6 space-y-6">
        <InfoBox title="PICOC-Framework für die Forschungsfrage">
          <p className="mb-3 text-sm text-slate-700">
            Orientierung als Checkliste — du kannst Stichpunkte auch im optionalen Feld unten festhalten:
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-slate-700">
            <li>
              <span className="font-medium text-slate-800">Population:</span> Welche Zielgruppe, Fälle, Organisationen
              oder Kontexteinheiten?
            </li>
            <li>
              <span className="font-medium text-slate-800">Intervention / Interest:</span> Welche Maßnahme, welches
              Phänomen oder welcher Einfluss?
            </li>
            <li>
              <span className="font-medium text-slate-800">Comparison:</span> Womit wird verglichen? Gruppen, Settings,
              Zeitpunkte oder Alternativen?
            </li>
            <li>
              <span className="font-medium text-slate-800">Outcome:</span> Welche Wirkung, welches Ergebnis oder welche
              Veränderung?
            </li>
            <li>
              <span className="font-medium text-slate-800">Context:</span> In welchem fachlichen, organisatorischen,
              sozialen oder räumlichen Kontext?
            </li>
          </ul>
          <p className="mt-3 text-sm text-slate-600">
            Nimm dir ca. 15 Minuten Zeit, um daraus eine erste Leitforschungsfrage abzuleiten.
          </p>
        </InfoBox>

        <SectionCard title="Titel deiner Recherche">
          <p className="mb-2 text-sm text-slate-600">
            Dieser Name erscheint als Hauptüberschrift in der Ergebnisübersicht (Druck/PDF) und über der Konzeptmatrix
            — anstelle des Platzhalters „dein Forschungsthema“.
          </p>
          <input
            type="text"
            value={reportTitle}
            onChange={(e) => updateConceptMatrix({ title: e.target.value })}
            className={fieldClass}
            placeholder="z. B. Kurztitel oder Thema deiner SLR"
            autoComplete="off"
          />
        </SectionCard>

        <SectionCard title="Optional: PICOC-Stichpunkte & erste Idee">
          <p className="mb-3 text-sm text-slate-600">
            Für die Prompts „KI: Inhalte entwickeln“ — unabhängig davon, ob die Leitfrage schon steht. Wird in der
            Ergebnisübersicht ausgegeben, wenn ausgefüllt.
          </p>
          <label className="block text-sm font-medium text-slate-700">PICOC-Elemente (Stichpunkte)</label>
          <textarea
            value={rq.picocNotes ?? ""}
            onChange={(e) => updateResearchQuestion({ picocNotes: e.target.value })}
            rows={4}
            className={`${fieldClass} mt-1`}
            placeholder="Population, Intervention/Interest, Comparison, Outcome, Context …"
          />
          <label className="mt-4 block text-sm font-medium text-slate-700">Erste Idee / Themenskizze</label>
          <textarea
            value={rq.firstIdea ?? ""}
            onChange={(e) => updateResearchQuestion({ firstIdea: e.target.value })}
            rows={3}
            className={`${fieldClass} mt-1`}
            placeholder="Was möchtest du grob untersuchen, bevor die Leitfrage feststeht?"
          />
        </SectionCard>

        <ResearchQuestionIdeationTools />

        <PromptSection
          pageKey="researchQuestionIdeation"
          sectionTitle="KI: Inhalte entwickeln"
          intro="Prompts arbeiten mit Platzhaltern (Titel, PICOC, erste Idee, Leitfrage, Unterfragen, Schlüsselbegriffe). Leere Felder erscheinen im kopierten Text als [noch nicht ausgefüllt]."
          resolvePrompt={resolveResearchQuestionPrompt}
        />

        <SectionCard title="Leitforschungsfrage">
          <textarea
            value={rq.mainQuestion}
            onChange={(e) => updateResearchQuestion({ mainQuestion: e.target.value })}
            rows={5}
            className={fieldClass}
            placeholder="z. B. Welchen Einfluss hat … auf … im Kontext von …?"
          />
          <div className="mt-4 rounded-md border border-slate-200 bg-white px-3 py-3">
            <h3 className="text-sm font-semibold text-slate-800">Qualitätsmerkmale</h3>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">Checkliste</p>
            <ul className="mt-2 grid gap-x-4 gap-y-1.5 text-sm text-slate-700 sm:grid-cols-2">
              <li>✓ Klar</li>
              <li>✓ Präzise</li>
              <li>✓ Neutral</li>
              <li>✓ Durchführbar</li>
              <li>✓ Messbar</li>
              <li>✓ Relevant für Zielgruppe und Fachbereich</li>
              <li>✓ Forschungslücke</li>
              <li>✓ Ethisch</li>
            </ul>
          </div>
        </SectionCard>

        <SectionCard title="Unterfragen / Teilziele (optional)">
          <textarea
            value={rq.subQuestions}
            onChange={(e) => updateResearchQuestion({ subQuestions: e.target.value })}
            rows={4}
            className={fieldClass}
            placeholder="Welche Aspekte möchtest du zusätzlich klären?"
          />
        </SectionCard>

        <SectionCard title="Schlüsselbegriffe">
          <textarea
            value={rq.keywords}
            onChange={(e) => updateResearchQuestion({ keywords: e.target.value })}
            rows={3}
            className={fieldClass}
            placeholder="Synonyme, verwandte Terms, Abkürzungen …"
          />
        </SectionCard>

        <PromptSection
          pageKey="researchQuestionRefinement"
          sectionTitle="KI: Inhalte prüfen und schärfen"
          intro="Übernimmt die ausgefüllten Felder und prüft zusätzlich PICOC-Abdeckung, Fragequalität und Eignung für eine systematische Literaturrecherche."
          resolvePrompt={resolveResearchQuestionPrompt}
        />
      </div>
    </PageLayout>
  );
}
