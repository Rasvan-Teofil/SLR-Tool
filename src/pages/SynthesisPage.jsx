import { useCallback } from "react";
import PageHeader from "../components/PageHeader";
import PageLayout from "../components/PageLayout";
import PromptSection from "../components/PromptSection";
import InfoBox from "../components/InfoBox";
import SectionCard from "../components/SectionCard";
import KiQuickLinksBar from "../components/KiQuickLinksBar";
import { ANALYSIS_CODING_AI_EXTRA_TOOLS } from "../config/toolsConfig";
import { applySynthesisPromptPlaceholders } from "../config/aiPrompts";
import { useWorkshop } from "../context/WorkshopContext";

const fieldClass =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none focus:border-indigo-400";

const promptGrid = "max-w-3xl sm:grid-cols-1";

export default function SynthesisPage() {
  const { state, updateSynthesis } = useWorkshop();
  const sy = state.synthesis;

  const resolveAnalysisPrompt = useCallback(
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
        stepLabel="Schritt 3 – Analyse & Codierung"
        title="Analyse & Codierung"
        subtitle="Material strukturieren, Kategorien ableiten und einen Kodierleitfaden für die Konzeptmatrix vorbereiten."
      />

      <div className="mb-6 space-y-6">
        <InfoBox title="Worum geht es in diesem Schritt?">
          <p className="text-sm text-slate-700">
            Nach der Literaturauswahl werden relevante Texte systematisch gelesen und ausgewertet. Wiederkehrende
            Konzepte, Themen, Methoden, Outcomes oder Kontextfaktoren fließen in ein Kategoriensystem ein — als Basis
            für den Kodierleitfaden und die tabellarische Gegenüberstellung in der Konzeptmatrix.
          </p>
        </InfoBox>

        <SectionCard title="Analysiertes Material">
          <p className="mb-2 text-sm text-slate-600">
            Du kannst hier zunächst auch nur stichpunktartig Paper-Titel, Abstracts, zentrale Notizen oder kurze
            Zusammenfassungen eintragen — und später ergänzen.
          </p>
          <textarea
            value={sy.material ?? ""}
            onChange={(e) => updateSynthesis({ material: e.target.value })}
            rows={5}
            className={fieldClass}
            placeholder="Welche Papers, Abstracts, Ergebnisabschnitte, Diskussionen oder Textauszüge werden analysiert? Beispiel: Paper 1–5; jeweils Abstract, Results und Discussion; markierte PDF-Auszüge …"
          />
        </SectionCard>

        <KiQuickLinksBar title="KI-Schnellzugriff" extraTools={ANALYSIS_CODING_AI_EXTRA_TOOLS} />

        <PromptSection
          pageKey="analysisCodingMaterial"
          sectionTitle="KI-Hilfe: Kategorien aus Material ableiten"
          intro={null}
          resolvePrompt={resolveAnalysisPrompt}
          gridClassName={promptGrid}
        />

        <SectionCard title="Vorläufige Kategorien / Kategoriensystem">
          <textarea
            value={sy.categoryNotes}
            onChange={(e) => updateSynthesis({ categoryNotes: e.target.value })}
            rows={8}
            className={fieldClass}
            placeholder="Kategorie | Unterkategorien | kurze Definition | Bezug zum Material | Relevanz | deduktiv/induktiv"
          />
        </SectionCard>

        <InfoBox title="Kategorien prüfen">
          <p className="text-sm text-slate-700">
            Prüfe, ob die Kategorien trennscharf, verständlich und für die Forschungsfrage relevant sind. Kategorien
            sollten weder zu breit noch zu kleinteilig sein. Ähnliche Kategorien kannst du zusammenführen, unklare
            Kategorien schärfen und fehlende ergänzen.
          </p>
        </InfoBox>

        <PromptSection
          pageKey="analysisCodingCategoriesReview"
          sectionTitle="KI-Hilfe: Kategorien prüfen und schärfen"
          intro={null}
          resolvePrompt={resolveAnalysisPrompt}
          gridClassName={promptGrid}
        />

        <InfoBox title="Kodierleitfaden – Bestandteile">
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>Kategorie-Name</li>
            <li>Definition</li>
            <li>Einschlussregel</li>
            <li>Ausschlussregel / Abgrenzung</li>
            <li>Ankerbeispiel aus einem Paper</li>
            <li>Kodierregel für Zweifelsfälle</li>
          </ul>
        </InfoBox>

        <PromptSection
          pageKey="analysisCodingGuideCreate"
          sectionTitle="KI-Hilfe: Kodierleitfaden erstellen"
          intro={null}
          resolvePrompt={resolveAnalysisPrompt}
          gridClassName={promptGrid}
        />

        <SectionCard title="Kodierleitfaden nach Mayring">
          <textarea
            value={sy.codingGuide}
            onChange={(e) => updateSynthesis({ codingGuide: e.target.value })}
            rows={10}
            className={fieldClass}
            placeholder={`Kategorie:\nDefinition:\nEinschlussregel:\nAusschlussregel / Abgrenzung:\nAnkerbeispiel aus Material:\nKodierregel für Zweifelsfälle:`}
          />
        </SectionCard>

        <SectionCard title="Testcodierung / Anwendung auf Beispielpaper">
          <textarea
            value={sy.testCoding ?? ""}
            onChange={(e) => updateSynthesis({ testCoding: e.target.value })}
            rows={6}
            className={fieldClass}
            placeholder={`Paper / Textauszug:\nZugeordnete Kategorie:\nBegründung:\nEindeutig / unklar / problematisch:\nAnpassung am Kodierleitfaden:`}
          />
        </SectionCard>

        <SectionCard title="Textauszug für Test-Prompt (optional)">
          <p className="mb-2 text-sm text-slate-600">
            Kurzer Abschnitt aus einem Paper — wird im Prompt „Kodierleitfaden an Beispieltext prüfen“ für [TEXTAUSZUG]
            eingesetzt, falls ausgefüllt. Alternativ den Auszug direkt im KI-Chat ergänzen.
          </p>
          <textarea
            value={sy.testTextExcerpt ?? ""}
            onChange={(e) => updateSynthesis({ testTextExcerpt: e.target.value })}
            rows={5}
            className={fieldClass}
            placeholder="Hier markierten Text aus PDF/Viewer einfügen …"
          />
        </SectionCard>

        <PromptSection
          pageKey="analysisCodingTest"
          sectionTitle="KI-Hilfe: Kodierleitfaden an Beispieltext prüfen"
          intro="Wenn [TEXTAUSZUG] im kopierten Prompt leer ist, den Auszug im Chat einfügen."
          resolvePrompt={resolveAnalysisPrompt}
          gridClassName={promptGrid}
        />
      </div>
    </PageLayout>
  );
}
