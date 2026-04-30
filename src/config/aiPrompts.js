/**
 * KI-Prompt-Vorlagen je Arbeitsschritt (zentral pflegbar).
 * KI-Prompt-Vorlagen je Arbeitsschritt. Schlüssel: researchQuestionIdeation, researchQuestionRefinement, searchStrategy, conceptMatrix, synthesis
 *
 * Felder:
 * - id: stabiler Schlüssel
 * - title, description: UI
 * - prompt: vollständiger Text für die Zwischenablage
 * - toolHref / toolLabel (optional): externer Link zum gewünschten KI-Tool
 */

export const AI_PROMPTS_BY_PAGE = {
  /** Schritt 1 A — Ideation: hin zu Leitfrage, Unterfragen, Begriffen */
  researchQuestionIdeation: [
    {
      id: "rq-idea-framing",
      title: "Thema einordnen und erste Leitfrage skizzieren",
      description: "Wenn du noch am Anfang stehst: Thema strukturieren und eine erste Leitfrage formulieren lassen.",
      prompt: `Sie sind Methodenberater:in für systematische Literaturreviews.

Ausgangslage (bitte ausfüllen):
[THEMA / KONTEXT]

Meine erste Idee oder Vorläufer-Leitfrage (optional):
[AKTUELLE FRAGE]

Bitte:
1. Fassen Sie das Thema in 2–3 Sätzen ein und grenzen Sie es fachlich ein.
2. Schlagen Sie eine prägnante Leitforschungsfrage vor (ein Satz).
3. Nennen Sie 3–5 mögliche Schlüsselbegriffe und Synonyme (DE/EN, wenn sinnvoll).
4. Weisen Sie darauf hin, welche Klärungen ich mit der Betreuung klären sollte.

Antwort strukturiert, sachlich, deutsch.`,
      toolHref: "https://chat.openai.com/",
      toolLabel: "ChatGPT öffnen",
    },
    {
      id: "rq-idea-subquestions",
      title: "Unterfragen und Teilziele ableiten",
      description: "Aus Leitfrage oder Themenskizze: strukturierende Unterfragen für Matrix und Auswertung.",
      prompt: `Sie unterstützen bei der Strukturierung einer systematischen Literaturrecherche.

Leitforschungsfrage (Stand jetzt):
[LEITFRAGE]

Unterfragen / Teilziele (falls schon vorhanden — sonst leer lassen):
[UNTERFRAGEN]

Bitte:
1. Leiten Sie 3–6 Unterfragen oder Teilziele ab, die die spätere Konzeptmatrix oder die Auswertung sinnvoll strukturieren.
2. Kennzeichnen Sie Prioritäten (kern vs. ergänzend).
3. Schlagen Sie für jede Unterfrage kurz vor, welche Literaturtyp(en) oder Designs typischerweise relevant wären.

Deutsch, knapp, mit nummerierter Liste.`,
      toolHref: "https://gemini.google.com/",
      toolLabel: "Gemini öffnen",
    },
    {
      id: "rq-idea-keywords",
      title: "Schlüsselbegriffe und Synonyme sammeln",
      description: "Suchnahe Begriffsliste für spätere Datenbanksuche entwickeln.",
      prompt: `Sie helfen bei der Vorbereitung einer Literatursuche für eine SLR.

Thema / Kontext:
[THEMA / KONTEXT]

Leitforschungsfrage:
[LEITFRAGE]

Schlüsselbegriffe bisher (optional):
[SCHLUESSELBEGRIFFE]

Bitte:
1. Listen Sie 8–15 Suchbegriffe mit kurzen Erklärungen und Synonymen (DE/EN).
2. Schlagen Sie Akronyme und verwandte Terms vor.
3. Markieren Sie Begriffe, die mehrdeutig sein könnten und eingegrenzt werden müssen.

Ausgabe als kompakte Tabelle oder Liste.`,
      toolHref: "https://www.perplexity.ai/",
      toolLabel: "Perplexity öffnen",
    },
  ],

  /** Schritt 1 B — Refinement: bestehende Inhalte prüfen und schärfen */
  researchQuestionRefinement: [
    {
      id: "rq-refine-slr-fit",
      title: "Gesamtpaket prüfen (SLR-Tauglichkeit)",
      description: "Leitfrage, Unterfragen und Begriffe gemeinsam auf Fokus und Operationalisierbarkeit prüfen.",
      prompt: `Sie sind Expert:in für systematische Literaturübersichten.

Ich arbeite an folgender Masterarbeit / Literaturrecherche.

Leitforschungsfrage:
[LEITFRAGE]

Unterfragen / Teilziele:
[UNTERFRAGEN]

Schlüsselbegriffe:
[SCHLUESSELBEGRIFFE]

Thema / Kontext (Titel/Kurzbeschreibung):
[THEMA / KONTEXT]

Bitte prüfen Sie in einem Absatz:
1. Ist das Gesamtpaket für eine systematische Literaturrecherche geeignet, fokussiert und operationalisierbar?
2. Wo bestehen Risiken (zu breit, zu viele Konstructs, fehlende Abgrenzung)?
3. Was sollte ich zuerst schärfen — Leitfrage, Unterfragen oder Begriffe?

Danach drei konkrete Verbesserungsvorschläge in Stichpunkten.`,
      toolHref: "https://chat.openai.com/",
      toolLabel: "ChatGPT öffnen",
    },
    {
      id: "rq-refine-finer",
      title: "Leitfrage schärfen (FINER / Machbarkeit)",
      description: "Klassische Prüfung der Leitfrage allein — nachdem erste Entwürfe stehen.",
      prompt: `Sie sind Expert:in für systematische Literaturübersichten.

Thema / Kontext:
[KONTEXT, z. B. Branche, Theorie, praktische Relevanz]

Meine aktuelle Leitforschungsfrage:
[LEITFRAGE]

Bitte bewerten Sie die Frage anhand von FINER (Feasible, Interesting, Novel, Ethical, Relevant) kurz je Kriterium.

Danach:
1. Stärken und Schwächen der Formulierung (Präzision, Messbarkeit, Abgrenzung).
2. Überarbeitete Leitfrage (falls nötig) mit kurzer Begründung.
3. Welche Einschränkungen (Zeitraum, Sprache, Setting) sollte ich explizit festhalten?

Bitte knapp, aber mit konkreten Formulierungsvorschlägen.`,
      toolHref: "https://www.perplexity.ai/",
      toolLabel: "Perplexity öffnen",
    },
    {
      id: "rq-refine-align",
      title: "Unterfragen und Schlüsselbegriffe abstimmen",
      description: "Konsistenz zwischen Unterfragen und Begriffsfeld herstellen.",
      prompt: `Sie unterstützen bei der Abstimmung von Unterfragen und Schlüsselbegriffen für eine SLR.

Leitforschungsfrage:
[LEITFRAGE]

Unterfragen / Teilziele:
[UNTERFRAGEN]

Schlüsselbegriffe:
[SCHLUESSELBEGRIFFE]

Bitte:
1. Zeigen Sie Überschneidungen oder Redundanzen zwischen Unterfragen und Begriffen auf.
2. Schlagen Sie eine konsolidierte Liste von Unterfragen (max. 6) vor.
3. Erweitern oder strukturieren Sie die Schlüsselbegriffe so, dass sie die unterfragen logisch abdecken.

Deutsch, mit klarer Liste am Ende.`,
      toolHref: "https://chat.openai.com/",
      toolLabel: "ChatGPT öffnen",
    },
  ],

  searchStrategy: [
    {
      id: "ss-strategy-full",
      title: "Suchstrategie aus Schritt 1 ableiten",
      description:
        "Auf Basis von Leitfrage, Unterfragen und Begriffen: Datenbanken, Suchstring, Kriterien und Synonyme.",
      prompt: `Auf Basis meiner Leitforschungsfrage, meiner Unterfragen und meiner Schlüsselbegriffe bitte ich um eine nachvollziehbare Suchstrategie für eine systematische Literaturrecherche.

Leitforschungsfrage:
[LEITFRAGE]

Unterfragen / Teilziele:
[UNTERFRAGEN]

Schlüsselbegriffe:
[SCHLUESSELBEGRIFFE]

Meine bisherigen Entwürfe auf diesem Arbeitsschritt (falls ausgefüllt):

Datenbanken & Quellen:
[DATENBANKEN]

Suchstring / Suchlogik:
[SUCHSTRING]

Einschlusskriterien:
[EINSCHLUSS]

Ausschlusskriterien:
[AUSSCHLUSS]

Bitte:
1. Schlagen Sie geeignete wissenschaftliche Datenbanken und ergänzende Quellen vor und begründen Sie knapp.
2. Entwickeln Sie für jedes Hauptkonzept eine Suchbegriffsgruppe (Synonyme, DE/EN, Akronyme).
3. Formulieren Sie einen Booleschen Suchstring (AND/OR, Klammerung) als Entwurf.
4. Formulieren oder verbessern Sie Ein- und Ausschlusskriterien so, dass sie zu meiner Leitfrage passen und dokumentierbar sind.
5. Nennen Sie Sensitivität vs. Spezifität und was ich im Anhang festhalten sollte.

Ausgabe mit klaren Überschriften; einen Block „Suchstring (Entwurf)“ zum Kopieren am Ende.`,
      toolHref: "https://chat.openai.com/",
      toolLabel: "ChatGPT öffnen",
    },
    {
      id: "ss-string-refine",
      title: "Suchstring verfeinern und Testläufe planen",
      description: "Operatoren, Trunkierung und Felder — angepasst an Ihre Begriffe aus Schritt 1.",
      prompt: `Sie unterstützen bei der Verfeinerung einer Suchstrategie für eine SLR.

Bezug aus Schritt 1 — Leitforschungsfrage:
[LEITFRAGE]

Schlüsselbegriffe:
[SCHLUESSELBEGRIFFE]

Aktueller Suchstring (Entwurf):
[SUCHSTRING]

Bitte:
1. Schlagen Sie Anpassungen vor (Trunkierung *, Phrasensuche, Klammerung).
2. Nennen Sie typische Datenbankfelder (z. B. TITLE-ABS-KEY) nur als allgemeine Hinweise.
3. Skizzieren Sie, wie ich mit schmal/breit testen kann, ohne konkrete Trefferzahlen zu erfinden.

Kurz und umsetzbar, deutsch.`,
      toolHref: "https://gemini.google.com/",
      toolLabel: "Gemini öffnen",
    },
  ],

  conceptMatrix: [
    {
      id: "cm-cluster",
      title: "Konzepte clustern und Matrix-Struktur vorschlagen",
      description:
        "Aus Themenlisten oder Abstract-Texten eine hierarchische Konzeptstruktur ableiten (Haupt- und Unterkategorien).",
      prompt: `Ich erstelle eine Konzeptmatrix nach Webster & Watson bzw. einer thematischen Literaturübersicht.

Ausgangslage:
- Thema / Review-Fokus: [THEMA]
- Beispielhafte Studientitel oder kurze Abstract-Auszüge (optional, hier einfügen):
[TEXTE]

Bitte:
1. Schlagen Sie 4–8 Hauptkategorien vor, die den Stand der Literatur sinnvoll strukturieren.
2. Zu jeder Hauptkategorie 2–5 Unterkategorien (spezifische Aspekte, Methoden, Kontexte).
3. Kennzeichnen Sie, welche Kategorien sich überschneiden könnten — und wie ich sie trennen oder zusammenführen sollte.
4. Geben Sie eine knappe Begründung, warum diese Struktur für eine Matrix (Studien × Unterkategorien) geeignet ist.

Ich werde die Vorschläge manuell in meinem ReviewKompass übernehmen und nicht automatisch verifizieren — halten Sie die Terminologie konsistent.`,
      toolHref: "https://elicit.org/",
      toolLabel: "Elicit öffnen",
    },
    {
      id: "cm-coding",
      title: "Einordnung einer Studie in die Matrix (Textbaustein)",
      description:
        "Wenn Sie eine konkrete Publikation bewerten: Prompt zur Einordnung in Ihre bestehenden Konzeptbegriffe.",
      prompt: `Sie helfen bei der konzeptuellen Einordnung einer einzelnen Studie für eine Literatur-Matrix.

Meine Unterkategorien (Liste, exakt so verwenden):
[UNTERKATEGORIEN EINFÜGEN]

Studie:
- Autor:innen, Jahr: […]
- Titel: […]
- Kurzbeschreibung oder Abstract (Auszug): […]

Bitte:
1. Ordnen Sie die Studie relativ zu jeder Unterkategorie ein: vollständig behandelt / am Rande (teilweise) / nicht behandelt — mit jeweils einem kurzen Beleg (Satz aus dem Text oder Paraphrase).
2. Nennen Sie Unsicherheiten, wenn der Text es nicht eindeutig erlaubt.

Wichtig: Keine halluzinierten Zitate — wenn Information fehlt, explizit „nicht ersichtlich“ schreiben.`,
      toolHref: "https://chat.openai.com/",
      toolLabel: "ChatGPT öffnen",
    },
  ],

  synthesis: [
    {
      id: "syn-categories-from-texts",
      title: "Synthese-Kategorien aus Zusammenfassungen entwickeln",
      description:
        "Wiederkehrende Themen und Muster aus Paper-Zusammenfassungen oder Exzerpten — für die spätere Matrix.",
      prompt: `Ich gebe im Folgenden Zusammenfassungen oder Exzerpte mehrerer wissenschaftlicher Artikel ein (ggf. noch Platzhalter).

Leitforschungsfrage meiner Arbeit:
[LEITFRAGE]

Rohmaterial (Zusammenfassungen / Auszüge — hier einfügen):
[PAPER_TEXT]

Bitte:
1. Identifizieren Sie wiederkehrende Themen, Konzepte und Muster.
2. Entwickeln Sie daraus sinnvolle Synthese-Kategorien für eine systematische Literaturrecherche.
3. Geben Sie zu jeder Kategorie eine kurze Definition und Beispiele, welche Arten von Befunden darunter fallen würden.
4. Kennzeichnen Sie Überschneidungen zwischen Kategorien und wie ich sie trennen oder zusammenführen kann.

Wichtig: Keine halluzinierten Zitate — nur aus dem gelieferten Material ableiten; sonst „nicht belegbar“ vermerken.`,
      toolHref: "https://chat.openai.com/",
      toolLabel: "ChatGPT öffnen",
    },
    {
      id: "syn-coding-guide",
      title: "Kodierleitfaden aus Kategorien erstellen",
      description: "Definitionen, Ein- und Ausschlussregeln und Beispiele je Kategorie.",
      prompt: `Auf Basis der folgenden Forschungsfrage und der vorläufigen Kategorien soll ein Kodierleitfaden für die qualitative Synthese einer systematischen Literaturrecherche entstehen.

Leitforschungsfrage:
[LEITFRAGE]

Vorläufige Kategorien / Notizen:
[KATEGORIEN]

Optional — Kodierideen oder erste Definitionen:
[KODIERLEITFADEN]

Bitte erstellen Sie einen Kodierleitfaden, der je Kategorie enthält:
- Kurzdefinition
- Einschlusskriterien (wann zählt ein Befund dazu)
- Ausschlusskriterien (was explizit nicht dazu zählt)
- Ein Beispiel (hypothetisch oder aus dem Kontext, klar als solches gekennzeichnet)

Antwort strukturiert mit Überschriften pro Kategorie.`,
      toolHref: "https://chat.openai.com/",
      toolLabel: "ChatGPT öffnen",
    },
    {
      id: "syn-patterns-gaps",
      title: "Muster und Forschungslücken skizzieren",
      description: "Brücke zur Konzeptmatrix und zu Forschungslücken — aus Kerntexten der Synthese.",
      prompt: `Ich synthetisiere die Literatur für eine Masterarbeit / SLR.

Leitforschungsfrage:
[LEITFRAGE]

Kernerkenntnisse / Rohtext meiner Synthese (Stichpunkte oder Absatz):
[KERNTEXTE]

Notizen zu Kategorien:
[KATEGORIEN]

Bitte:
1. Nennen Sie 3–5 zentrale Muster oder Cluster über die Studien hinweg.
2. Benennen Sie methodische Unterschiede, die die Vergleichbarkeit einschränken könnten.
3. Leiten Sie 3–5 mögliche Forschungslücken ab (empirisch, methodisch, theoretisch oder praxisbezogen — nur wo aus dem Text ableitbar).

Ton: vorsichtig, akademisch, deutsch — keine überzogenen Kausalclaims.`,
      toolHref: "https://www.perplexity.ai/",
      toolLabel: "Perplexity öffnen",
    },
  ],
};

/** Neutraler Platzhalter für leere Formularfelder (Schritt 1, Prompt-Ausgabe). */
export const RESEARCH_QUESTION_EMPTY_PLACEHOLDER = "[noch nicht ausgefüllt]";

/**
 * Ersetzt nur die markierten Platzhalter in den Vorlagen aus `researchQuestion`.
 * @param {string} template
 * @param {{ title?: string, mainQuestion?: string, subQuestions?: string, keywords?: string }} fields
 */
export function applyResearchQuestionPromptPlaceholders(template, fields) {
  const title = (fields.title ?? "").trim();
  const mainQuestion = (fields.mainQuestion ?? "").trim();
  const subQuestions = (fields.subQuestions ?? "").trim();
  const keywords = (fields.keywords ?? "").trim();

  const parts = [];
  if (title) parts.push(`Titel / Themengebiet: ${title}`);
  if (subQuestions) parts.push(`Unterfragen / Teilziele:\n${subQuestions}`);
  if (keywords) parts.push(`Schlüsselbegriffe:\n${keywords}`);
  const themaKontext = parts.length > 0 ? parts.join("\n\n") : RESEARCH_QUESTION_EMPTY_PLACEHOLDER;

  const leitfrage = mainQuestion || RESEARCH_QUESTION_EMPTY_PLACEHOLDER;
  const unterfragen = subQuestions || RESEARCH_QUESTION_EMPTY_PLACEHOLDER;
  const schluessel = keywords || RESEARCH_QUESTION_EMPTY_PLACEHOLDER;

  return template
    .replaceAll("[THEMA / KONTEXT]", themaKontext)
    .replaceAll("[AKTUELLE FRAGE]", leitfrage)
    .replaceAll("[KONTEXT, z. B. Branche, Theorie, praktische Relevanz]", themaKontext)
    .replaceAll("[LEITFRAGE]", leitfrage)
    .replaceAll("[UNTERFRAGEN]", unterfragen)
    .replaceAll("[SCHLUESSELBEGRIFFE]", schluessel);
}

/**
 * Schritt 2: Platzhalter mit Inhalten aus Forschungsfrage und aktuellem Suchstrategie-Entwurf füllen.
 */
export function applySearchStrategyPromptPlaceholders(template, { researchQuestion, searchStrategy }) {
  const rq = researchQuestion || {};
  const ss = searchStrategy || {};
  const leit = (rq.mainQuestion ?? "").trim() || RESEARCH_QUESTION_EMPTY_PLACEHOLDER;
  const unt = (rq.subQuestions ?? "").trim() || RESEARCH_QUESTION_EMPTY_PLACEHOLDER;
  const key = (rq.keywords ?? "").trim() || RESEARCH_QUESTION_EMPTY_PLACEHOLDER;
  const db = (ss.databases ?? "").trim() || RESEARCH_QUESTION_EMPTY_PLACEHOLDER;
  const such = (ss.searchString ?? "").trim() || RESEARCH_QUESTION_EMPTY_PLACEHOLDER;
  const ein = (ss.inclusionCriteria ?? "").trim() || RESEARCH_QUESTION_EMPTY_PLACEHOLDER;
  const aus = (ss.exclusionCriteria ?? "").trim() || RESEARCH_QUESTION_EMPTY_PLACEHOLDER;
  const prot = (ss.notes ?? "").trim() || RESEARCH_QUESTION_EMPTY_PLACEHOLDER;

  return template
    .replaceAll("[LEITFRAGE]", leit)
    .replaceAll("[UNTERFRAGEN]", unt)
    .replaceAll("[SCHLUESSELBEGRIFFE]", key)
    .replaceAll("[DATENBANKEN]", db)
    .replaceAll("[SUCHSTRING]", such)
    .replaceAll("[EINSCHLUSS]", ein)
    .replaceAll("[AUSSCHLUSS]", aus)
    .replaceAll("[PROTOKOLLNOTIZEN]", prot);
}

/**
 * Schritt Synthese: Kontext aus Forschungsfrage und Synthesefeldern.
 */
export function applySynthesisPromptPlaceholders(template, { researchQuestion, synthesis }) {
  const rq = researchQuestion || {};
  const sy = synthesis || {};
  const leit = (rq.mainQuestion ?? "").trim() || RESEARCH_QUESTION_EMPTY_PLACEHOLDER;
  const unt = (rq.subQuestions ?? "").trim() || RESEARCH_QUESTION_EMPTY_PLACEHOLDER;
  const key = (rq.keywords ?? "").trim() || RESEARCH_QUESTION_EMPTY_PLACEHOLDER;
  const kat = (sy.categoryNotes ?? "").trim() || RESEARCH_QUESTION_EMPTY_PLACEHOLDER;
  const kod = (sy.codingGuide ?? "").trim() || RESEARCH_QUESTION_EMPTY_PLACEHOLDER;
  const kern = (sy.notes ?? "").trim() || RESEARCH_QUESTION_EMPTY_PLACEHOLDER;
  const paperPh = RESEARCH_QUESTION_EMPTY_PLACEHOLDER;

  return template
    .replaceAll("[LEITFRAGE]", leit)
    .replaceAll("[UNTERFRAGEN]", unt)
    .replaceAll("[SCHLUESSELBEGRIFFE]", key)
    .replaceAll("[KATEGORIEN]", kat)
    .replaceAll("[KODIERLEITFADEN]", kod)
    .replaceAll("[KERNTEXTE]", kern)
    .replaceAll("[PAPER_TEXT]", paperPh);
}

/** Gültige Seitenschlüssel (für Typisierung/Erweiterung im Team) */
export const AI_PROMPT_PAGE_KEYS = Object.keys(AI_PROMPTS_BY_PAGE);
