import KiQuickLinksBar from "./KiQuickLinksBar";
import { RESEARCH_QUESTION_AI_EXTRA_TOOLS } from "../config/toolsConfig";

/**
 * KI-Schnellzugriffe für die frühe Ideation (Leitfrage, Unterfragen, Begriffe).
 */
export default function ResearchQuestionIdeationTools() {
  return (
    <KiQuickLinksBar
      title="KI-Hilfe zum Entwickeln der Forschungsfrage"
      intro="Links öffnen in einem neuen Tab — ideal, um dein Vorhaben zu erklären, eine Leitfrage zu finden, Unterfragen abzuleiten oder Begriffe zu sammeln."
      extraTools={RESEARCH_QUESTION_AI_EXTRA_TOOLS}
    />
  );
}
