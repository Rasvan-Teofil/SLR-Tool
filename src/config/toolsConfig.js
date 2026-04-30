/**
 * KI-Research-Tools für den Schnellzugriff je Arbeitsphase (Schritt 1–4).
 * Immer zuerst: ChatGPT und Google Gemini; danach 3–4 phasenspezifische Tools.
 */

const CHATGPT = {
  id: "chatgpt",
  label: "ChatGPT",
  description:
    "Formulierungen Ihrer Forschungsfrage schärfen, Begriffe klären und Suchlogik in natürlicher Sprache vorbereiten.",
  href: "https://chat.openai.com/",
  icon: "◆",
};

const GOOGLE_GEMINI = {
  id: "gemini",
  label: "Google Gemini",
  description:
    "Alternative KI-Perspektive für Struktur, Synonyme und erste Einordnung Ihrer SLR-Fragestellung.",
  href: "https://gemini.google.com/",
  icon: "◇",
};

/** Erste zwei Einträge auf jeder Seite */
export const STANDARD_TOOLS = [CHATGPT, GOOGLE_GEMINI];

const PERPLEXITY = {
  id: "perplexity",
  label: "Perplexity",
  description:
    "Schnelle Recherche mit Quellenhinweisen, um Ihr Thema und verwandte Diskurse vor der Fragestellung zu erkunden.",
  href: "https://www.perplexity.ai/",
  icon: "◎",
};

const CONSENSUS = {
  id: "consensus",
  label: "Consensus",
  description:
    "Aggregierte Aussagen aus der Literatur finden und prüfen, ob zu Ihrer Frage bereits Evidenz konsolidiert ist.",
  href: "https://consensus.app/",
  icon: "▣",
};

const ELICIT = {
  id: "elicit",
  label: "Elicit",
  description:
    "Relevante Papers zu Ihrer Frage aufspüren und erste Treffer für Screening und Zitationsketten sammeln.",
  href: "https://elicit.org/",
  icon: "▪",
};

const SEMANTIC_SCHOLAR = {
  id: "semantic-scholar",
  label: "Semantic Scholar",
  description:
    "Paper-Discovery mit Einordnung von Zitationen und thematisch verwandter Arbeit für Ihre Suchstrings.",
  href: "https://www.semanticscholar.org/",
  icon: "▫",
};

const RESEARCH_RABBIT = {
  id: "research-rabbit",
  label: "Research Rabbit",
  description:
    "Literatur-Netzwerke visualisieren und von einem Startpaper aus systematisch verwandte Quellen erschließen.",
  href: "https://www.researchrabbit.ai/",
  icon: "◈",
};

const SCITE = {
  id: "scite",
  label: "Scite",
  description:
    "Prüfen, wie spätere Arbeiten Ihre Kandidaten zitieren — unterstützend, erwähnend oder widersprechend.",
  href: "https://scite.ai/",
  icon: "⬡",
};

const SCISPACE = {
  id: "scispace",
  label: "SciSpace",
  description:
    "PDFs verstehen, Abschnitte zusammenfassen und Tabellen für Ihre Konzeptmatrix gezielt extrahieren.",
  href: "https://scispace.com/",
  icon: "◉",
};

const NOTEBOOKLM = {
  id: "notebooklm",
  label: "NotebookLM",
  description:
    "Hochgeladene Quellen bündeln und narrative Zusammenfassungen für Ihre SLR-Synthese erzeugen.",
  href: "https://notebooklm.google.com/",
  icon: "▤",
};

/** Kompakte Schnellzugriffe für Schritt 1 (Ideenfindung) — Teilmenge, nicht 1:1 die volle step1-Liste. */
export const RESEARCH_IDEATION_QUICK_LINKS = [CHATGPT, GOOGLE_GEMINI, PERPLEXITY, CONSENSUS];

export const STEP_TOOLS = {
  step1: [
    ...STANDARD_TOOLS,
    PERPLEXITY,
    CONSENSUS,
    ELICIT,
  ],
  step2: [
    ...STANDARD_TOOLS,
    { ...ELICIT, id: "elicit-search", description: "Suchläufe und Screening-Ideen strukturieren und Trefferlisten für PRISMA vorbereiten." },
    SEMANTIC_SCHOLAR,
    RESEARCH_RABBIT,
    { ...SCITE, id: "scite-search", description: "Zitationskontext prüfen, bevor Sie Papers fest in Ihre Strategie aufnehmen." },
  ],
  step3: [
    ...STANDARD_TOOLS,
    { ...SCITE, id: "scite-matrix", description: "Supporting vs. widersprechende Zitate je Paper erfassen — ideal für Matrix-Spalten zur Evidenzlage." },
    { ...SCISPACE, id: "scispace-matrix", description: "Volltexte schnell erfassen und Vergleichspunkte für Ihre Konzeptmatrix ableiten." },
    { ...ELICIT, id: "elicit-matrix", description: "Strukturierte Daten und Extraktionsfelder aus Papers für den tabellarischen Vergleich holen." },
    { ...SEMANTIC_SCHOLAR, id: "semantic-scholar-matrix", description: "TL;DR und Zitationsnetze nutzen, um Papers in der Matrix einzuordnen." },
  ],
  step4: [
    ...STANDARD_TOOLS,
    { ...CONSENSUS, id: "consensus-synth", description: "Breite Literaturlage zu Ihrer Frage bündeln, bevor Sie Ihre eigene Synthese formulieren." },
    { ...SCITE, id: "scite-synth", description: "Widersprüche und Debatten zwischen Studien erkennen — zentral für eine ehrliche SLR-Einordnung." },
    NOTEBOOKLM,
    { ...ELICIT, id: "elicit-synth", description: "Evidenz aus mehreren Quellen zusammenfassen und Lücken für Ihr Fazit markieren." },
  ],
};

/** Abwärtskompatibel zu den Seiten-Keys */
export const PAGE_TOOL_LINKS = {
  researchQuestion: STEP_TOOLS.step1,
  searchStrategy: STEP_TOOLS.step2,
  conceptMatrix: STEP_TOOLS.step3,
  synthesis: STEP_TOOLS.step4,
};
