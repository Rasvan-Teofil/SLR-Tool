import PageHeader from "../components/PageHeader";
import PageLayout from "../components/PageLayout";
import PageToolGrid from "../components/PageToolGrid";
import InfoBox from "../components/InfoBox";
import SectionCard from "../components/SectionCard";
import { PAGE_TOOL_LINKS } from "../config/pageToolLinks";
import { useWorkshop } from "../context/WorkshopContext";

export default function ResearchQuestionPage() {
  const { state, updateResearchQuestion } = useWorkshop();
  const rq = state.researchQuestion;

  return (
    <PageLayout>
      <PageHeader
        stepLabel="Schritt 1 – Forschungsfrage"
        title="Forschungsfrage formulieren"
        subtitle="Definieren Sie Ihre Leitfrage und erste Suchbegriffe. Diese Grundlage steuert Ihre gesamte systematische Recherche und die spätere Auswertung."
      />

      <PageToolGrid
        intro="Hilfen zur Schärfung und Strukturierung Ihrer Fragestellung — öffnen in einem neuen Tab."
        tools={PAGE_TOOL_LINKS.researchQuestion}
      />

      <div className="mb-6 space-y-6">
        <InfoBox title="Hinweis">
          <p>
            Eine präzise Forschungsfrage hilft bei der Suchstrategie und bei der Einordnung der Literatur in der
            Konzeptmatrix. Formulieren Sie PICOC/SPIDER o. ä. nach den Vorgaben Ihrer Veranstaltung.
          </p>
        </InfoBox>

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
    </PageLayout>
  );
}
