/**
 * KI-Prompt-Vorlagen je Arbeitsschritt (zentral pflegbar).
 * KI-Prompt-Vorlagen je Arbeitsschritt. u. a. researchQuestionIdeation, searchStrategy, analysisCodingMaterial, …
 *
 * Felder:
 * - id: stabiler Schlüssel
 * - title, description: UI
 * - prompt: vollständiger Text für die Zwischenablage
 * - toolHref / toolLabel (optional): externer Link zum gewünschten KI-Tool
 */

export const AI_PROMPTS_BY_PAGE = {
  /** Schritt 1 A — Ideation: PICOC-orientiert, ohne Annahme ausgefüllter Leitfrage */
  researchQuestionIdeation: [
    {
      id: "rq-idea-picoc-structure",
      title: "Thema nach PICOC strukturieren und Lücken sichtbar machen",
      description:
        "Nutzt Titel, erste Idee und PICOC-Stichpunkte — Leitfrage und weitere Felder können leer sein ([noch nicht ausgefüllt]).",
      prompt: `Du bist Methodenberater:in für systematische Literaturreviews (PICOC-orientiert).

Titel der Recherche (falls vorhanden):
[THEMA / KONTEXT]

Erste Idee / Themenskizze (optional):
[ERSTE IDEE]

PICOC-Elemente in Stichpunkten (optional — Population, Intervention/Interest, Comparison, Outcome, Context):
[PICOC-ELEMENTE]

Leitforschungsfrage (falls schon vorhanden):
[LEITFRAGE]

Unterfragen / Teilziele (falls vorhanden):
[UNTERFRAGEN]

Schlüsselbegriffe (falls vorhanden):
[SCHLUESSELBEGRIFFE]

Bitte:
1. Strukturiere das Vorhaben explizit nach PICOC (P, I, C, O, Co) — auch wenn Angaben fehlen, markiere Lücken.
2. Benenne fehlende oder unklare PICOC-Elemente und schlage präzisierende Rückfragen vor.
3. Leite daraus eine erste Leitforschungsfrage vor (ein Satz), ohne vorauszusetzen, dass sie schon im Formular steht.
4. Skizziere kurz, wie Unterfragen und Suchbegriffe später anschlussfähig wären.

Antwort strukturiert, sachlich, deutsch.`,
      toolHref: "https://chat.openai.com/",
      toolLabel: "ChatGPT öffnen",
    },
    {
      id: "rq-idea-subquestions-picoc",
      title: "Unterfragen und Teilziele aus PICOC ableiten",
      description: "Strukturierende Unterfragen — Eingaben oben können teils leer sein.",
      prompt: `Du unterstützt bei der Strukturierung einer systematischen Literaturrecherche nach PICOC.

Titel der Recherche (falls vorhanden):
[THEMA / KONTEXT]

PICOC-Elemente (falls vorhanden):
[PICOC-ELEMENTE]

Erste Idee (falls vorhanden):
[ERSTE IDEE]

Leitforschungsfrage (falls vorhanden):
[LEITFRAGE]

Unterfragen / Teilziele (falls vorhanden):
[UNTERFRAGEN]

Bitte:
1. Leite 3–6 Unterfragen oder Teilziele ab, die PICOC-Aspekte und die spätere Konzeptmatrix sinnvoll strukturieren.
2. Kennzeichne Prioritäten (kern vs. ergänzend) und ordne jede Unterfrage einem PICOC-Bereich zu.
3. Schlage je Unterfrage kurz vor, welche Literaturtypen oder Designs typischerweise relevant wären.

Deutsch, knapp, nummeriert.`,
      toolHref: "https://gemini.google.com/",
      toolLabel: "Gemini öffnen",
    },
    {
      id: "rq-idea-keywords-picoc",
      title: "Schlüsselbegriffe und Synonyme je PICOC-Element",
      description: "Suchnahe Begriffe entlang von P, I, C, O, Context — Felder können teils leer sein.",
      prompt: `Du hilfst bei der Vorbereitung einer Literatursuche für eine SLR mit PICOC-Logik.

Titel der Recherche (falls vorhanden):
[THEMA / KONTEXT]

PICOC-Elemente (falls vorhanden):
[PICOC-ELEMENTE]

Leitforschungsfrage (falls vorhanden):
[LEITFRAGE]

Schlüsselbegriffe bisher (falls vorhanden):
[SCHLUESSELBEGRIFFE]

Bitte:
1. Sammle je PICOC-Element (Population, Intervention/Interest, Comparison, Outcome, Context) mindestens drei englische Synonyme, verwandte Begriffe, Akronyme und Schreibweisen — soweit aus den Angaben ableitbar; sonst Vorschläge als Hypothese kennzeichnen.
2. Markiere mehrdeutige Begriffe und schlage Einengungen vor.
3. Gib eine kompakte Übersicht (z. B. Tabelle: PICOC-Bereich | Begriffe DE/EN).

Wichtig: Nicht erfinden, was nicht aus dem Kontext folgt — Lücken explizit benennen.`,
      toolHref: "https://www.perplexity.ai/",
      toolLabel: "Perplexity öffnen",
    },
  ],

  /** Schritt 1 B — Refinement: Inhalte prüfen, PICOC und SLR-Tauglichkeit */
  researchQuestionRefinement: [
    {
      id: "rq-refine-slr-fit",
      title: "Gesamtpaket, PICOC und SLR-Tauglichkeit",
      description: "Leitfrage, Unterfragen, Begriffe und PICOC-Stichpunkte — inkl. Prüfung auf Klarheit und Machbarkeit.",
      prompt: `Du bist Expert:in für systematische Literaturübersichten.

Titel der Recherche (falls vorhanden):
[THEMA / KONTEXT]

PICOC-Stichpunkte (falls erfasst):
[PICOC-ELEMENTE]

Erste Idee / Themenskizze (falls vorhanden):
[ERSTE IDEE]

Leitforschungsfrage:
[LEITFRAGE]

Unterfragen / Teilziele:
[UNTERFRAGEN]

Schlüsselbegriffe:
[SCHLUESSELBEGRIFFE]

Bitte prüfe zuerst PICOC:
1. Sind Population, Intervention/Interest, Comparison, Outcome und Context in Leitfrage und Begleittexten erkennbar bzw. bewusst eingegrenzt?
2. Wo fehlt Abgrenzung oder Operationalisierung?

Danach die Leitfrage qualitativ:
3. Ist sie klar, präzise, neutral, durchführbar, messbar, relevant und ethisch vertretbar?
4. Ist sie für eine systematische Literaturrecherche geeignet (Fokus, Such- und Kodierbarkeit)?

Abschließend:
5. Ist das Gesamtpaket fokussiert und operationalisierbar? Welche Risiken bestehen (zu breit, zu viele Konstrukte)?
6. Drei konkrete Verbesserungsvorschläge in Stichpunkten (Priorität: zuerst …).`,
      toolHref: "https://chat.openai.com/",
      toolLabel: "ChatGPT öffnen",
    },
    {
      id: "rq-refine-finer",
      title: "Leitfrage schärfen (FINER / Machbarkeit)",
      description: "FINER und Formulierung — mit Bezug zu Titel und PICOC-Stichpunkten.",
      prompt: `Du bist Expert:in für systematische Literaturübersichten.

Titel der Recherche:
[THEMA / KONTEXT]

PICOC-Stichpunkte:
[PICOC-ELEMENTE]

Kontext / Ziel (Unterfragen, Stichworte):
[KONTEXT, z. B. Branche, Theorie, praktische Relevanz]

Meine aktuelle Leitforschungsfrage:
[LEITFRAGE]

Bitte bewerte die Frage anhand von FINER (Feasible, Interesting, Novel, Ethical, Relevant) kurz je Kriterium.

Danach:
1. Stärken und Schwächen der Formulierung (Präzision, Messbarkeit, Abgrenzung) in Bezug auf PICOC.
2. Überarbeitete Leitfrage (falls nötig) mit kurzer Begründung.
3. Welche Einschränkungen (Zeitraum, Sprache, Setting) sollte ich explizit festhalten?

Bitte knapp, aber mit konkreten Formulierungsvorschlägen.`,
      toolHref: "https://www.perplexity.ai/",
      toolLabel: "Perplexity öffnen",
    },
    {
      id: "rq-refine-align",
      title: "Unterfragen und Schlüsselbegriffe abstimmen",
      description: "Konsistenz mit Leitfrage und PICOC-Logik.",
      prompt: `Du unterstützt bei der Abstimmung von Unterfragen und Schlüsselbegriffen für eine SLR.

Leitforschungsfrage:
[LEITFRAGE]

Unterfragen / Teilziele:
[UNTERFRAGEN]

Schlüsselbegriffe:
[SCHLUESSELBEGRIFFE]

PICOC-Stichpunkte:
[PICOC-ELEMENTE]

Bitte:
1. Ordne Unterfragen und Begriffe den PICOC-Bereichen zu und zeige Überschneidungen oder Redundanzen.
2. Schlage eine konsolidierte Liste von Unterfragen (max. 6) vor.
3. Strukturiere die Schlüsselbegriffe so, dass sie Leitfrage und Unterfragen logisch abdecken (inkl. Synonyme je PICOC-Bereich, soweit möglich).

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
        "Datenbanken, Synonyme je PICOC-Konzept (mind. drei auf Englisch), Suchstring, Kriterien und PRESS-Orientierung.",
      prompt: `Auf Basis meiner Leitforschungsfrage, Unterfragen und Schlüsselbegriffe bitte ich um eine nachvollziehbare Suchstrategie für eine systematische Literaturrecherche.

Leitforschungsfrage:
[LEITFRAGE]

Unterfragen / Teilziele:
[UNTERFRAGEN]

Schlüsselbegriffe:
[SCHLUESSELBEGRIFFE]

Meine bisherigen Entwürfe auf diesem Arbeitsschritt (falls ausgefüllt):

Datenbanken & Quellen:
[DATENBANKEN]

Synonyme / Suchbegriffe je Konzept (PICOC-orientiert, Stichpunkte):
[SYNONYME / SUCHBEGRIFFE JE KONZEPT]

Suchstring / Suchlogik:
[SUCHSTRING]

Einschlusskriterien:
[EINSCHLUSS]

Ausschlusskriterien:
[AUSSCHLUSS]

Bitte:
1. Schlage geeignete wissenschaftliche Datenbanken und ergänzende Quellen vor und begründe knapp (fachlich prüfen, datenbankspezifisch anpassen).
2. Ergänze oder verbessere Synonyme je PICOC-relevantem Konzept: mindestens drei englische Synonyme, verwandte Begriffe, Akronyme, Schreibweisen und Variationen pro Konzept — konsistent zu meinen Angaben oben.
3. Formuliere oder verbessere einen Booleschen Suchstring (AND/OR/NOT, Klammern, Trunkierung *, Phrasen, ggf. Feldcodes nur als allgemeine Hinweise).
4. Formuliere oder verbessere Ein- und Ausschlusskriterien dokumentierbar und passend zur Leitfrage.
5. Prüfe den Suchstring orientierend an PRESS: Passt er zur PICOC-Frage? Operatoren und Nähe sinnvoll? Subject Headings / Schlagwörter bedacht? Freitext/Synonyme/DE-EN? Rechtschreibung und Syntax? Limits/Filter begründet?
6. Nenne Sensitivität vs. Spezifität und was ich im Anhang festhalten sollte.

Ausgabe mit klaren Überschriften; einen Block „Suchstring (Entwurf)“ zum Kopieren am Ende.`,
      toolHref: "https://chat.openai.com/",
      toolLabel: "ChatGPT öffnen",
    },
    {
      id: "ss-string-refine",
      title: "Suchstring verfeinern, Synonyme und PRESS prüfen",
      description: "Operatoren, Synonymfeld, Trunkierung und PRESS-Check vor Testläufen.",
      prompt: `Du unterstützt bei der Verfeinerung einer Suchstrategie für eine SLR.

Bezug aus Schritt 1 — Leitforschungsfrage:
[LEITFRAGE]

Schlüsselbegriffe:
[SCHLUESSELBEGRIFFE]

Synonyme / Suchbegriffe je Konzept (meine Liste):
[SYNONYME / SUCHBEGRIFFE JE KONZEPT]

Aktueller Suchstring (Entwurf):
[SUCHSTRING]

Einschluss / Ausschluss (Kurz):
[EINSCHLUSS]
[AUSSCHLUSS]

Bitte:
1. Schlage Anpassungen am Suchstring vor (AND/OR/NOT, Trunkierung *, Phrasensuche, Klammerung, ggf. Näheoperatoren nur als Hinweis je Datenbank).
2. Prüfe die Synonymlisten: fehlen je PICOC-Konzept mindestens drei englische Varianten? Ergänze vorsichtig.
3. Gehe die PRESS-Checkliste kurz durch: (1) Übersetzung der Frage in den String, (2) Boolesche/Proximity-Operatoren, (3) Subject Headings / MeSH-ähnliche Begriffe, (4) Freitext/Synonyme/Schreibweisen/DE-EN, (5) Rechtschreibung/Syntax, (6) Limits und Filter.
4. Skizziere, wie ich mit schmal/breit testen kann, ohne konkrete Trefferzahlen zu erfinden.

Kurz und umsetzbar, deutsch.`,
      toolHref: "https://gemini.google.com/",
      toolLabel: "Gemini öffnen",
    },
  ],

  searchStrategyCriteriaDraft: [
    {
      id: "ss-criteria-from-question",
      title: "Prompt 1 · Kriterien aus der Forschungsfrage ableiten",
      prompt: `Du unterstützt mich bei der Entwicklung von Ein- und Ausschlusskriterien für eine Systematic Literature Review.

Leite aus der folgenden Forschungsfrage erste Ein- und Ausschlusskriterien ab. Trenne zwischen Kriterien, die bereits im Titel/Abstract prüfbar sind, und Kriterien, die erst im Volltext beurteilt werden können.

Formuliere klar, knapp und prüfbar. Erfinde keine fachlichen Anforderungen, die nicht aus der Forschungsfrage ableitbar sind.

Forschungsfrage: [LEITFRAGE]
Kontext / Ziel: [KONTEXT_ZIEL]

Ausgabe: Einschlusskriterien | Ausschlusskriterien | Grenzfälle | Titel/Abstract vs. Volltext`,
      toolHref: "https://chat.openai.com/",
      toolLabel: "ChatGPT öffnen",
    },
    {
      id: "ss-criteria-refine",
      title: "Prompt 2 · Kriterien prüfen und schärfen",
      prompt: `Prüfe die folgenden Ein- und Ausschlusskriterien kritisch.

Bewerte, ob sie eindeutig, nicht redundant und direkt aus der Forschungsfrage ableitbar sind. Zeige auf, welche Kriterien zu offen oder zu streng sind und welche im Titel-/Abstract-Screening schwer prüfbar sind. Schlage präzisere Formulierungen vor.

Verändere die Forschungsfrage nicht.

Forschungsfrage: [LEITFRAGE]
Einschlusskriterien: [EINSCHLUSS]
Ausschlusskriterien: [AUSSCHLUSS]`,
      toolHref: "https://chat.openai.com/",
      toolLabel: "ChatGPT öffnen",
    },
  ],

  searchStrategyCriteriaScreening: [
    {
      id: "ss-title-abstract-screening",
      title: "Prompt 3 · Titel-/Abstract-Screening",
      prompt: `Du bist Screening-Assistent für einen Systematic Literature Review.

Entscheide anhand des folgenden Titels und Abstracts, ob die Studie die Einschlusskriterien erfüllt. Antworte NUR mit:

EINSCHLIESSEN | AUSSCHLIESSEN | UNKLAR

Begründe in max. 25 Wörtern. Erfinde keine Informationen. Wenn der Abstract fehlt oder unzureichend ist: antworte mit UNKLAR.

Einschlusskriterien: [EINSCHLUSS]
Ausschlusskriterien: [AUSSCHLUSS]
Titel: [Titel einfügen] | Abstract: [Abstract einfügen]`,
      toolHref: "https://chat.openai.com/",
      toolLabel: "ChatGPT öffnen",
    },
    {
      id: "ss-fulltext-screening",
      title: "Prompt 4 · Volltext-Screening & Ausschlussgrund",
      prompt: `Prüfe den folgenden Volltext gegen die Einschlusskriterien. Bewerte jeden Punkt einzeln mit Ja / Nein / Unklar. Formuliere anschließend einen PRISMA-konformen Ausschlussgrund, falls die Studie nicht eingeschlossen wird. Erfinde keine Informationen aus dem Text.

Kriterien: [EINSCHLUSS]
Volltext: [Volltext oder Auszug einfügen]

Ausgabe: K1: ... | K2: ... | Gesamtentscheidung: ... | Ausschlussgrund: ...`,
      toolHref: "https://chat.openai.com/",
      toolLabel: "ChatGPT öffnen",
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
1. Schlage 4–8 Hauptkategorien vor, die den Stand der Literatur sinnvoll strukturieren.
2. Zu jeder Hauptkategorie 2–5 Unterkategorien (spezifische Aspekte, Methoden, Kontexte).
3. Kennzeichne, welche Kategorien sich überschneiden könnten — und wie ich sie trennen oder zusammenführen sollte.
4. Gib eine knappe Begründung, warum diese Struktur für eine Matrix (Studien × Unterkategorien) geeignet ist.

Ich werde die Vorschläge manuell in meinem SLR Kompass übernehmen und nicht automatisch verifizieren — halte die Terminologie konsistent.`,
      toolHref: "https://elicit.org/",
      toolLabel: "Elicit öffnen",
    },
    {
      id: "cm-coding",
      title: "Einordnung einer Studie in die Matrix (Textbaustein)",
      description:
        "Wenn du eine konkrete Publikation bewertest: Prompt zur Einordnung in deine bestehenden Konzeptbegriffe.",
      prompt: `Du hilfst bei der konzeptuellen Einordnung einer einzelnen Studie für eine Literatur-Matrix.

Meine Unterkategorien (Liste, exakt so verwenden):
[UNTERKATEGORIEN EINFÜGEN]

Studie:
- Autor:innen, Jahr: […]
- Titel: […]
- Kurzbeschreibung oder Abstract (Auszug): […]

Bitte:
1. Ordne die Studie relativ zu jeder Unterkategorie ein: vollständig behandelt / am Rande (teilweise) / nicht behandelt — mit jeweils einem kurzen Beleg (Satz aus dem Text oder Paraphrase).
2. Nenne Unsicherheiten, wenn der Text es nicht eindeutig erlaubt.

Wichtig: Keine halluzinierten Zitate — wenn Information fehlt, explizit „nicht ersichtlich“ schreiben.`,
      toolHref: "https://chat.openai.com/",
      toolLabel: "ChatGPT öffnen",
    },
  ],

  analysisCodingMaterial: [
    {
      id: "ac-material-categories",
      title: "Kategorien aus Material ableiten",
      description: "Übernimmt Forschungsfrage und analysiertes Material.",
      prompt: `Du unterstützt mich bei der Analyse von Literatur für eine Systematic Literature Review.

Forschungsfrage:
[LEITFORSCHUNGSFRAGE]

Analysiertes Material:
[ANALYSIERTES MATERIAL]

Aufgabe:
1. Identifiziere wiederkehrende Themen, Konzepte, Methoden, Outcomes und Kontextfaktoren.
2. Leite daraus 3–6 vorläufige Kategorien ab.
3. Ergänze, falls sinnvoll, Unterkategorien.
4. Begründe kurz, warum jede Kategorie für die Forschungsfrage relevant ist.
5. Kennzeichne, ob die Kategorie eher deduktiv aus der Forschungsfrage oder induktiv aus dem Material entstanden ist.
6. Erfinde keine Inhalte, die nicht im Material erkennbar sind.

Ausgabeformat:
Kategorie | Unterkategorien | kurze Definition | Bezug zum Material | Relevanz für Forschungsfrage | deduktiv/induktiv`,
      toolHref: "https://chat.openai.com/",
      toolLabel: "ChatGPT öffnen",
    },
  ],

  analysisCodingCategoriesReview: [
    {
      id: "ac-categories-review",
      title: "Kategorien prüfen und schärfen",
      description: "Übernimmt Forschungsfrage und Kategoriensystem.",
      prompt: `Prüfe das folgende Kategoriensystem für eine Systematic Literature Review.

Forschungsfrage:
[LEITFORSCHUNGSFRAGE]

Kategoriensystem:
[KATEGORIEN]

Aufgabe:
1. Prüfe, ob die Kategorien klar, trennscharf und relevant sind.
2. Zeige Überschneidungen oder Redundanzen.
3. Schlage präzisere Kategorienamen vor.
4. Schlage vor, welche Kategorien zusammengeführt, getrennt oder gestrichen werden sollten.
5. Verändere die Forschungsfrage nicht.
6. Erfinde keine neuen fachlichen Inhalte ohne Bezug zum vorhandenen Material.

Ausgabe:
Überarbeiteter Kategorienvorschlag | Begründung | Hinweise für Kodierung`,
      toolHref: "https://chat.openai.com/",
      toolLabel: "ChatGPT öffnen",
    },
  ],

  analysisCodingGuideCreate: [
    {
      id: "ac-coding-guide-create",
      title: "Kodierleitfaden erstellen",
      description: "Übernimmt Forschungsfrage und Kategoriensystem.",
      prompt: `Erstelle auf Basis des folgenden Kategoriensystems einen Kodierleitfaden nach Mayring.

Forschungsfrage:
[LEITFORSCHUNGSFRAGE]

Kategoriensystem:
[KATEGORIEN]

Aufgabe:
Erstelle für jede Kategorie:
1. Kategorie-Name
2. Definition
3. Hinweis für ein geeignetes Ankerbeispiel
4. Kodierregel für Zweifelsfälle (ggf. mit Einschluss- bzw. Ausschlusskriterien)

Wichtig:
- Formuliere präzise und prüfbar.
- Kategorien sollen trennscharf sein.
- Erfinde keine Paper-Inhalte.
- Wenn kein echtes Ankerbeispiel vorliegt, schreibe: ‚Ankerbeispiel aus Material ergänzen‘.

Ausgabeformat:
Kategorie | Definition | Einschlussregel | Ausschlussregel | Ankerbeispiel | Kodierregel`,
      toolHref: "https://chat.openai.com/",
      toolLabel: "ChatGPT öffnen",
    },
  ],

  analysisCodingTest: [
    {
      id: "ac-test-coding",
      title: "Kodierleitfaden an Beispieltext prüfen",
      description: "Übernimmt Forschungsfrage, Kodierleitfaden und Textauszug.",
      prompt: `Prüfe, ob der folgende Kodierleitfaden auf einen Beispieltext aus einem Paper anwendbar ist.

Forschungsfrage:
[LEITFORSCHUNGSFRAGE]

Kodierleitfaden:
[KODIERLEITFADEN]

Textauszug:
[TEXTAUSZUG]

Aufgabe:
1. Ordne den Textauszug passenden Kategorien zu.
2. Begründe jede Zuordnung kurz.
3. Kennzeichne, ob die Zuordnung eindeutig, unklar oder problematisch ist.
4. Schlage Verbesserungen am Kodierleitfaden vor.
5. Nutze Ankerbeispiele nur als direkte Zitate aus dem Textauszug.

Ausgabe:
Kategorie | Entscheidung | Begründung | Ankerbeispiel | Anpassung`,
      toolHref: "https://claude.ai/",
      toolLabel: "Claude öffnen",
    },
  ],
};

/** Neutraler Platzhalter für leere Formularfelder (Schritt 1, Prompt-Ausgabe). */
export const RESEARCH_QUESTION_EMPTY_PLACEHOLDER = "[noch nicht ausgefüllt]";

/**
 * Ersetzt Platzhalter in Schritt-1-Vorlagen aus Titel, PICOC-Skizze, Leitfrage und weiteren Feldern.
 * @param {string} template
 * @param {{
 *   reportTitle?: string,
 *   title?: string,
 *   mainQuestion?: string,
 *   subQuestions?: string,
 *   keywords?: string,
 *   firstIdea?: string,
 *   picocNotes?: string,
 * }} fields
 */
export function applyResearchQuestionPromptPlaceholders(template, fields) {
  const reportTitle = (fields.reportTitle ?? fields.title ?? "").trim();
  const mainQuestion = (fields.mainQuestion ?? "").trim();
  const subQuestions = (fields.subQuestions ?? "").trim();
  const keywords = (fields.keywords ?? "").trim();
  const firstIdea = (fields.firstIdea ?? "").trim();
  const picocNotes = (fields.picocNotes ?? "").trim();

  const leitfrage = mainQuestion || RESEARCH_QUESTION_EMPTY_PLACEHOLDER;
  const unterfragen = subQuestions || RESEARCH_QUESTION_EMPTY_PLACEHOLDER;
  const schluessel = keywords || RESEARCH_QUESTION_EMPTY_PLACEHOLDER;
  const ersteIdee = firstIdea || RESEARCH_QUESTION_EMPTY_PLACEHOLDER;
  const picocElemente = picocNotes || RESEARCH_QUESTION_EMPTY_PLACEHOLDER;

  const themaKontext = reportTitle ? `Titel der Recherche: ${reportTitle}` : RESEARCH_QUESTION_EMPTY_PLACEHOLDER;

  const kontextRichParts = [];
  if (reportTitle) kontextRichParts.push(`Titel der Recherche: ${reportTitle}`);
  if (firstIdea) kontextRichParts.push(`Erste Idee / Themenskizze:\n${firstIdea}`);
  if (picocNotes) kontextRichParts.push(`PICOC-Stichpunkte:\n${picocNotes}`);
  if (subQuestions) kontextRichParts.push(`Unterfragen / Teilziele:\n${subQuestions}`);
  if (keywords) kontextRichParts.push(`Schlüsselbegriffe:\n${keywords}`);
  const kontextRich =
    kontextRichParts.length > 0 ? kontextRichParts.join("\n\n") : RESEARCH_QUESTION_EMPTY_PLACEHOLDER;

  return template
    .replaceAll("[THEMA / KONTEXT]", themaKontext)
    .replaceAll("[ERSTE IDEE]", ersteIdee)
    .replaceAll("[PICOC-ELEMENTE]", picocElemente)
    .replaceAll("[AKTUELLE FRAGE]", ersteIdee)
    .replaceAll("[KONTEXT, z. B. Branche, Theorie, praktische Relevanz]", kontextRich)
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
  const firstIdea = (rq.firstIdea ?? "").trim();
  const picocNotes = (rq.picocNotes ?? "").trim();
  const db = (ss.databases ?? "").trim() || RESEARCH_QUESTION_EMPTY_PLACEHOLDER;
  const such = (ss.searchString ?? "").trim() || RESEARCH_QUESTION_EMPTY_PLACEHOLDER;
  const ein = (ss.inclusionCriteria ?? "").trim() || RESEARCH_QUESTION_EMPTY_PLACEHOLDER;
  const aus = (ss.exclusionCriteria ?? "").trim() || RESEARCH_QUESTION_EMPTY_PLACEHOLDER;
  const prot = (ss.notes ?? "").trim() || RESEARCH_QUESTION_EMPTY_PLACEHOLDER;

  const syn = (ss.synonyms ?? "").trim() || RESEARCH_QUESTION_EMPTY_PLACEHOLDER;
  const contextParts = [];
  if (firstIdea) contextParts.push(`Erste Idee / Themenskizze:\n${firstIdea}`);
  if (picocNotes) contextParts.push(`PICOC-Stichpunkte:\n${picocNotes}`);
  if ((rq.subQuestions ?? "").trim()) contextParts.push(`Unterfragen / Teilziele:\n${rq.subQuestions.trim()}`);
  if ((rq.keywords ?? "").trim()) contextParts.push(`Schlüsselbegriffe:\n${rq.keywords.trim()}`);
  if ((ss.notes ?? "").trim()) contextParts.push(`Protokollnotizen:\n${ss.notes.trim()}`);
  const contextGoal = contextParts.length > 0 ? contextParts.join("\n\n") : RESEARCH_QUESTION_EMPTY_PLACEHOLDER;

  return template
    .replaceAll("[LEITFRAGE]", leit)
    .replaceAll("[KONTEXT_ZIEL]", contextGoal)
    .replaceAll("[UNTERFRAGEN]", unt)
    .replaceAll("[SCHLUESSELBEGRIFFE]", key)
    .replaceAll("[DATENBANKEN]", db)
    .replaceAll("[SUCHSTRING]", such)
    .replaceAll("[EINSCHLUSS]", ein)
    .replaceAll("[AUSSCHLUSS]", aus)
    .replaceAll("[PROTOKOLLNOTIZEN]", prot)
    .replaceAll("[SYNONYME / SUCHBEGRIFFE JE KONZEPT]", syn);
}

/**
 * Schritt 3 (state: synthesis): Platzhalter für Analyse & Kodierung (Material, Kategorien, Kodierleitfaden, Test).
 */
export function applySynthesisPromptPlaceholders(template, { researchQuestion, synthesis }) {
  const rq = researchQuestion || {};
  const sy = synthesis || {};
  const leit = (rq.mainQuestion ?? "").trim() || RESEARCH_QUESTION_EMPTY_PLACEHOLDER;
  const kat = (sy.categoryNotes ?? "").trim() || RESEARCH_QUESTION_EMPTY_PLACEHOLDER;
  const kod = (sy.codingGuide ?? "").trim() || RESEARCH_QUESTION_EMPTY_PLACEHOLDER;
  const material = (sy.material ?? "").trim() || RESEARCH_QUESTION_EMPTY_PLACEHOLDER;
  const textAuszug = (sy.testTextExcerpt ?? "").trim() || RESEARCH_QUESTION_EMPTY_PLACEHOLDER;

  return template
    .replaceAll("[LEITFORSCHUNGSFRAGE]", leit)
    .replaceAll("[LEITFRAGE]", leit)
    .replaceAll("[KATEGORIEN]", kat)
    .replaceAll("[KODIERLEITFADEN]", kod)
    .replaceAll("[ANALYSIERTES MATERIAL]", material)
    .replaceAll("[TEXTAUSZUG]", textAuszug);
}

/** Gültige Seitenschlüssel (für Typisierung/Erweiterung im Team) */
export const AI_PROMPT_PAGE_KEYS = Object.keys(AI_PROMPTS_BY_PAGE);
