/**
 * KI-Research-Tools für den Schnellzugriff je Arbeitsphase (Schritt 1–4).
 * Immer zuerst: ChatGPT und Google Gemini; danach 3–4 phasenspezifische Tools.
 */

const CHATGPT = {
  id: "chatgpt",
  label: "ChatGPT",
  description:
    "Formulierungen deiner Forschungsfrage schärfen, Begriffe klären und Suchlogik in natürlicher Sprache vorbereiten.",
  href: "https://chat.openai.com/",
  icon: "◆",
};

const GOOGLE_GEMINI = {
  id: "gemini",
  label: "Gemini",
  description:
    "Alternative KI-Perspektive für Struktur, Synonyme und erste Einordnung deiner SLR-Fragestellung.",
  href: "https://gemini.google.com/",
  icon: "◇",
};

const CLAUDE = {
  id: "claude",
  label: "Claude",
  description: "Längere Texte, Kodierleitfaden und vorsichtige Paraphrasen — ideal neben ChatGPT und Gemini.",
  href: "https://claude.ai/",
  icon: "✦",
};

/** Appweit einheitliche Reihenfolge: ChatGPT, Gemini, Claude */
export const AI_QUICK_LINK_CORE = [CHATGPT, GOOGLE_GEMINI, CLAUDE];

/** Erste zwei Einträge (Legacy, z. B. PRISMA-Flow-Fallbacks) */
export const STANDARD_TOOLS = [CHATGPT, GOOGLE_GEMINI];

const PERPLEXITY = {
  id: "perplexity",
  label: "Perplexity",
  description:
    "Schnelle Recherche mit Quellenhinweisen, um dein Thema und verwandte Diskurse vor der Fragestellung zu erkunden.",
  href: "https://www.perplexity.ai/",
  icon: "◎",
};

const CONSENSUS = {
  id: "consensus",
  label: "Consensus",
  description:
    "Aggregierte Aussagen aus der Literatur finden und prüfen, ob zu deiner Frage bereits Evidenz konsolidiert ist.",
  href: "https://consensus.app/",
  icon: "▣",
};

const ELICIT = {
  id: "elicit",
  label: "Elicit",
  description:
    "Relevante Papers zu deiner Frage aufspüren und erste Treffer für Screening und Zitationsketten sammeln.",
  href: "https://elicit.org/",
  icon: "▪",
};

const SEMANTIC_SCHOLAR = {
  id: "semantic-scholar",
  label: "Semantic Scholar",
  description:
    "Paper-Discovery mit Einordnung von Zitationen und thematisch verwandter Arbeit für deine Suchstrings.",
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
    "Prüfen, wie spätere Arbeiten deine Kandidaten zitieren — unterstützend, erwähnend oder widersprechend.",
  href: "https://scite.ai/",
  icon: "⬡",
};

const SCISPACE = {
  id: "scispace",
  label: "SciSpace",
  description:
    "PDFs verstehen, Abschnitte zusammenfassen und Tabellen für deine Konzeptmatrix gezielt extrahieren.",
  href: "https://scispace.com/",
  icon: "◉",
};

const NOTEBOOKLM = {
  id: "notebooklm",
  label: "NotebookLM",
  description:
    "Hochgeladene Quellen bündeln und Zusammenfassungen für deine qualitative Auswertung vorbereiten.",
  href: "https://notebooklm.google.com/",
  icon: "▤",
};

/** Schritt 1: zusätzlich zu den drei Kern-Tools */
export const RESEARCH_QUESTION_AI_EXTRA_TOOLS = [PERPLEXITY, CONSENSUS];

/** Schritt 2: phasenspezifische Ergänzungen zur Suchstrategie */
export const SEARCH_STRATEGY_AI_EXTRA_TOOLS = [
  { ...ELICIT, id: "elicit-search-quick" },
  SEMANTIC_SCHOLAR,
  RESEARCH_RABBIT,
  { ...SCITE, id: "scite-search-quick" },
];

/** Schritt 4 Konzeptmatrix: zusätzliche Tools */
export const CONCEPT_MATRIX_AI_EXTRA_TOOLS = [
  { ...SCITE, id: "scite-matrix-quick" },
  { ...SCISPACE, id: "scispace-matrix-quick" },
  { ...ELICIT, id: "elicit-matrix-quick" },
  { ...SEMANTIC_SCHOLAR, id: "semantic-scholar-matrix-quick" },
];

/** Schritt 3 Analyse & Codierung */
export const ANALYSIS_CODING_AI_EXTRA_TOOLS = [
  { ...CONSENSUS, id: "consensus-analysis-quick" },
  { ...SCITE, id: "scite-analysis-quick" },
  NOTEBOOKLM,
  { ...ELICIT, id: "elicit-analysis-quick" },
];

/** Kompakte Schnellzugriffe für Schritt 1 (Ideenfindung) — Kern + Perplexity + Consensus */
export const RESEARCH_IDEATION_QUICK_LINKS = [...AI_QUICK_LINK_CORE, ...RESEARCH_QUESTION_AI_EXTRA_TOOLS];

export const STEP_TOOLS = {
  step1: [...AI_QUICK_LINK_CORE, PERPLEXITY, CONSENSUS, ELICIT],
  step2: [
    ...AI_QUICK_LINK_CORE,
    { ...ELICIT, id: "elicit-search", description: "Suchläufe und Screening-Ideen strukturieren und Trefferlisten für PRISMA vorbereiten." },
    SEMANTIC_SCHOLAR,
    RESEARCH_RABBIT,
    { ...SCITE, id: "scite-search", description: "Zitationskontext prüfen, bevor du Papers fest in deine Strategie aufnimmst." },
  ],
  step3: [
    ...AI_QUICK_LINK_CORE,
    { ...SCITE, id: "scite-matrix", description: "Supporting vs. widersprechende Zitate je Paper erfassen — ideal für Matrix-Spalten zur Evidenzlage." },
    { ...SCISPACE, id: "scispace-matrix", description: "Volltexte schnell erfassen und Vergleichspunkte für deine Konzeptmatrix ableiten." },
    { ...ELICIT, id: "elicit-matrix", description: "Strukturierte Daten und Extraktionsfelder aus Papers für den tabellarischen Vergleich holen." },
    { ...SEMANTIC_SCHOLAR, id: "semantic-scholar-matrix", description: "TL;DR und Zitationsnetze nutzen, um Papers in der Matrix einzuordnen." },
  ],
  step4: [
    ...AI_QUICK_LINK_CORE,
    { ...CONSENSUS, id: "consensus-synth", description: "Breite Literaturlage zu deiner Frage bündeln, bevor du Befunde strukturiert festhältst." },
    { ...SCITE, id: "scite-synth", description: "Widersprüche und Debatten zwischen Studien erkennen — hilfreich für die Einordnung in Matrix und Kodierung." },
    NOTEBOOKLM,
    { ...ELICIT, id: "elicit-synth", description: "Evidenz aus mehreren Quellen zusammenfassen und Lücken für dein Fazit markieren." },
  ],
};

/** Abwärtskompatibel zu den Seiten-Keys (analysisCoding = früher synthesis, aktuell ungenutzt auf der Seite) */
export const PAGE_TOOL_LINKS = {
  researchQuestion: STEP_TOOLS.step1,
  searchStrategy: STEP_TOOLS.step2,
  conceptMatrix: STEP_TOOLS.step3,
  analysisCoding: STEP_TOOLS.step4,
  synthesis: STEP_TOOLS.step4,
};
