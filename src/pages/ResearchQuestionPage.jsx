import { useCallback } from "react";
import PageHeader from "../components/PageHeader";
import PageLayout from "../components/PageLayout";
import PromptSection from "../components/PromptSection";
import InfoBox from "../components/InfoBox";
import SectionCard from "../components/SectionCard";
import SlrSuitabilityCheck from "../components/SlrSuitabilityCheck";
import ResearchQuestionIdeationTools from "../components/ResearchQuestionIdeationTools";
import { applyResearchQuestionPromptPlaceholders } from "../config/aiPrompts";
import { useWorkshop } from "../context/WorkshopContext";

export default function ResearchQuestionPage() {
  const { state, updateResearchQuestion, updateConceptMatrix } = useWorkshop();
  const rq = state.researchQuestion;
  const reportTitle = state.conceptMatrix.title;

  const resolveResearchQuestionPrompt = useCallback(
    (item) =>
      applyResearchQuestionPromptPlaceholders(item.prompt, {
        title: reportTitle,
        mainQuestion: rq.mainQuestion,
        subQuestions: rq.subQuestions,
        keywords: rq.keywords,
      }),
    [reportTitle, rq.mainQuestion, rq.subQuestions, rq.keywords]
  );

  return (
    <PageLayout>
      <PageHeader stepLabel="Schritt 1 – Forschungsfrage" title="Forschungsfrage formulieren" />

      <div className="mb-6 space-y-6">
        <SlrSuitabilityCheck />

        <SectionCard title="Titel Ihrer Recherche">
          <p className="mb-2 text-sm text-slate-600">
            Dieser Name erscheint als Hauptüberschrift in der Ergebnisübersicht (Druck/PDF) und über der Konzeptmatrix
            — anstelle des Platzhalters „Ihr Forschungsthema“.
          </p>
          <input
            type="text"
            value={reportTitle}
            onChange={(e) => updateConceptMatrix({ title: e.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none focus:border-indigo-400"
            placeholder="z. B. Kurztitel oder Thema Ihrer SLR"
            autoComplete="off"
          />
        </SectionCard>

        <ResearchQuestionIdeationTools />

        <SectionCard title="Leitforschungsfrage">
          <textarea
            value={rq.mainQuestion}
            onChange={(e) => updateResearchQuestion({ mainQuestion: e.target.value })}
            rows={5}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none focus:border-indigo-400"
            placeholder="z. B. Welchen Einfluss hat … auf … im Kontext von …?"
          />
        </SectionCard>

        <SectionCard title="Unterfragen / Teilziele (optional)">
          <textarea
            value={rq.subQuestions}
            onChange={(e) => updateResearchQuestion({ subQuestions: e.target.value })}
            rows={4}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none focus:border-indigo-400"
            placeholder="Welche Aspekte möchten Sie zusätzlich klären?"
          />
        </SectionCard>

        <SectionCard title="Schlüsselbegriffe">
          <textarea
            value={rq.keywords}
            onChange={(e) => updateResearchQuestion({ keywords: e.target.value })}
            rows={3}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none focus:border-indigo-400"
            placeholder="Synonyme, verwandte Terms, Abkürzungen …"
          />
        </SectionCard>
      </div>

      <InfoBox title="Hinweis">
        <p>
          Eine präzise Forschungsfrage hilft bei der Suchstrategie und bei der Einordnung der Literatur in der
          Konzeptmatrix. Formulieren Sie PICOC/SPIDER o. ä. nach den Vorgaben Ihrer Veranstaltung.
        </p>
      </InfoBox>

      <PromptSection
        pageKey="researchQuestionIdeation"
        sectionTitle="KI: Inhalte entwickeln"
        intro="Prompts, um von Thema und ersten Ideen zu Leitfrage, Unterfragen und Begriffen zu kommen — Werte aus den Feldern oben werden eingesetzt, wo vorgesehen."
        resolvePrompt={resolveResearchQuestionPrompt}
      />

      <PromptSection
        pageKey="researchQuestionRefinement"
        sectionTitle="KI: Inhalte prüfen und schärfen"
        intro="Wenn du bereits Text in den Feldern hast: prüfen, präzisieren und auf SLR-Tauglichkeit trimmen."
        resolvePrompt={resolveResearchQuestionPrompt}
      />
    </PageLayout>
  );
}
