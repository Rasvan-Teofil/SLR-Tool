/**
 * KI-Prompt-Vorlagen je Arbeitsschritt (zentral pflegbar).
 * Seiten binden über denselben Schlüssel wie PAGE_TOOL_LINKS ein: researchQuestion | searchStrategy | conceptMatrix | synthesis
 *
 * Felder:
 * - id: stabiler Schlüssel
 * - title, description: UI
 * - prompt: vollständiger Text für die Zwischenablage
 * - toolHref / toolLabel (optional): externer Link zum gewünschten KI-Tool
 */

export const AI_PROMPTS_BY_PAGE = {
  researchQuestion: [
    {
      id: "rq-pico-spider",
      title: "Forschungsfrage schärfen (PICO / SPIDER)",
      description:
        "Nutzen Sie diesen Prompt, wenn Sie eine erste Idee haben und sie in eine strukturierte, literaturrelevante Frage übersetzen möchten.",
      prompt: `Sie sind Methodenberater:in für systematische Literaturreviews in der Management- und Wirtschaftsinformatikforschung.

Mein Themengebiet und meine erste Idee (bitte unten einfügen):
[THEMA / KONTEXT]

Meine bisherige Formulierung einer möglichen Leitfrage (optional):
[AKTUELLE FRAGE]

Bitte:
1. Bewerten Sie, ob sich die Frage eher für ein PICO- (interventions-/outcome-orientiert) oder ein SPIDER-Schema (qualitativ/explorativ) eignet, und begründen Sie knapp.
2. Leiten Sie daraus eine präzise Leitforschungsfrage ab (ein Satz, klar und überprüfbar).
3. Formulieren Sie 2–4 Unterfragen oder Teilziele, die die Matrix oder die Suche strukturieren können.
4. Nennen Sie 5–8 Schlüsselbegriffe und sinnvolle Synonyme/Übersetzungen für die Literatursuche (Deutsch/Englisch, wenn sinnvoll).
5. Listen Sie offene Klärungen auf, die ich mit meiner Betreuungsperson abstimmen sollte.

Antworten Sie strukturiert mit klaren Überschriften, sachlich und akademisch.`,
      toolHref: "https://chat.openai.com/",
      toolLabel: "ChatGPT öffnen",
    },
    {
      id: "rq-critique",
      title: "Leitfrage kritisch prüfen (FINER / Machbarkeit)",
      description:
        "Wenn Ihre Frage bereits steht: Prüfung auf Schärfe, Machbarkeit und Abgrenzung — bevor Sie die Suchstrategie festigen.",
      prompt: `Sie sind Expert:in für systematische Literaturübersichten.

Meine geplante Masterarbeit / der Review-Fokus:
[KONTEXT, z. B. Branche, Theorie, praktische Relevanz]

Meine aktuelle Leitforschungsfrage:
[LEITFRAGE]

Bitte bewerten Sie die Frage anhand von FINER (Feasible, Interesting, Novel, Ethical, Relevant) kurz je Kriterium.

Danach:
1. Nennen Sie Stärken und Schwächen der Formulierung (Präzision, Messbarkeit, Abgrenzung).
2. Schlagen Sie eine überarbeitete Version der Leitfrage vor (falls nötig, mit Begründung).
3. Welche Einschränkungen (Zeitraum, Sprache, Setting) sollte ich explizit festhalten, um die Suche realistisch zu halten?

Bitte knapp halten, aber mit konkreten Formulierungsvorschlägen.`,
      toolHref: "https://www.perplexity.ai/",
      toolLabel: "Perplexity öffnen",
    },
  ],

  searchStrategy: [
    {
      id: "ss-boolean",
      title: "Suchstring und Boolsche Logik entwickeln",
      description:
        "Hilft beim Übergang von Konzepten zu datenbanktauglichen Suchausdrücken inkl. Trunkierung und Feldern.",
      prompt: `Sie unterstützen bei der Erstellung einer systematischen Suchstrategie für wissenschaftliche Datenbanken.

Kernkonzepte / PICO oder SPIDER-Elemente:
[KONZEPTE]

Schlüsselbegriffe und Synonyme (falls schon vorhanden):
[BEGRIFFE]

Datenbanken oder Quellen, die ich nutze (optional):
[Z. B. Scopus, Web of Science, IEEE Xplore, Google Scholar …]

Bitte:
1. Schlagen Sie für jedes Hauptkonzept eine Gruppe von Suchbegriffen vor (DE/EN, Akronyme, verwandte Terms).
2. Entwickeln Sie einen kombinierten Booleschen Suchstring (AND/OR, Klammerung), den ich in typischen Datenbanken anpassen kann.
3. Geben Sie Hinweise zu Trunkierung (*), Phrasensuche ("…") und ggf. Feldern (TITLE-ABS-KEY o. ä.) als allgemeine Empfehlung — ohne eine konkrete Datenbank zu simulieren, falls unklar.
4. Listen Sie mögliche Sensitivitäts- vs. Spezifitäts-Abwägungen und wie ich sie dokumentieren kann (für PRISMA/Anhang).

Ausgabe klar strukturiert, mit einem Block „Suchstring (Entwurf)“ zum Kopieren.`,
      toolHref: "https://chat.openai.com/",
      toolLabel: "ChatGPT öffnen",
    },
    {
      id: "ss-prisma-doc",
      title: "Suchprotokoll & PRISMA-Phasen formulieren",
      description:
        "Formulierungshilfe für die dokumentierten PRISMA-Abschnitte (Identifikation bis Einschluss) in sachlichem Prosa-Stil.",
      prompt: `Ich dokumentiere eine systematische Literaturrecherche und nutze PRISMA-orientierte Abschnitte in meinem Protokoll.

Aktueller Stand in Stichpunkten:
- Datenbanken und Suchdaten: […]
- Treffer nach Suche (roh): […]
- Nach Dublettenbeseitigung: […]
- Screening Titel/Abstract: geprüft / ausgeschlossen: […]
- Volltext: angefordert / nicht erhalten / ausgeschlossen mit Gründen: […]
- Eingeschlossen zur Extraktion: […]

Bitte formulieren Sie daraus in neutral-wissenschaftlichem Deutsch kurze Fließtext-Absätze für:
1) Identifikation der Treffer
2) Screening auf Titel/Abstract-Ebene
3) Eignungsprüfung am Volltext
4) Final eingeschlossene Studien

Verwenden Sie keine erfundenen Zahlen — kennzeichnen Sie Platzhalter klar, wo noch Daten fehlen.`,
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
      id: "syn-narrative",
      title: "Narrative Synthese strukturieren",
      description:
        "Gliederung für das Diskussions- bzw. Literaturkapitel aus Muster, Widersprüchen und Forschungslücken.",
      prompt: `Ich schreibe die Synthese meiner systematischen Literaturübersicht für eine Masterarbeit.

Kontext:
- Leitfrage: [LEITFRAGE]
- Kernergebnisse aus der Matrix / wichtigste Muster: [STICHPUNKTE]
- Offene Lücken oder widersprüchliche Befunde: […]

Bitte:
1. Schlagen Sie eine Gliederung für einen Abschnitt „Diskussion der Literatur“ oder „Synthese“ vor (nummerierte Überschriften).
2. Formulieren Sie 2–3 Überleitungssätze zwischen den Abschnitten.
3. Heben Sie hervor, wo Theorie, Methodik und Praxis getrennt diskutiert werden sollten.
4. Listen Sie Formulierungen auf, mit denen ich Vorsicht und Grenzen der Evidenz akademisch angemessen ausdrücken kann (ohne Übertreibung).

Ton: präzise, deutsch, für ein Hochschulpublikum.`,
      toolHref: "https://chat.openai.com/",
      toolLabel: "ChatGPT öffnen",
    },
    {
      id: "syn-implications",
      title: "Implikationen und Forschungsagenda ableiten",
      description:
        "Vom Matrix- und Synthesefinal zu praktischen und wissenschaftlichen Folgerungen für die Abschlussarbeit.",
      prompt: `Aus meiner SLR-Auswertung möchte ich Implikationen und eine kleine Forschungsagenda ableiten.

Kurz zusammengefasst:
- Hauptbefunde (3–5 Bulletpoints): […]
- Zielgruppe der Arbeit (Praxis vs. Wissenschaft): […]
- Einschränkungen der eigenen Suche: […]

Bitte:
1. Trennen Sie klar: praktische Implikationen vs. theoretische Implikationen.
2. Nennen Sie 3–5 konkrete Ideen für Folgeforschung, priorisiert nach Machbarkeit in einer Masterarbeit.
3. Formulieren Sie jeweils einen Satz „So könnte ich das im letzten Kapitel meiner Arbeit positionieren.“

Bleiben Sie vorsichtig bei Kausalclaims — nur dort, wo die Literatur das hergibt.`,
      toolHref: "https://www.perplexity.ai/",
      toolLabel: "Perplexity öffnen",
    },
  ],
};

/** Gültige Seitenschlüssel (für Typisierung/Erweiterung im Team) */
export const AI_PROMPT_PAGE_KEYS = Object.keys(AI_PROMPTS_BY_PAGE);
