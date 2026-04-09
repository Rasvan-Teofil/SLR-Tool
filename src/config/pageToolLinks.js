/**
 * Externe Schnellzugriffe pro Arbeitsphase (5–6 Links je Seite).
 * URLs bei Bedarf hier zentral pflegen.
 */
export const PAGE_TOOL_LINKS = {
  researchQuestion: [
    {
      id: "pico",
      label: "PICO / PICOS (Cochrane)",
      description: "Fragestruktur für interventionelle Fragestellungen",
      href: "https://training.cochrane.org/online-learning/core-software-cochrane-reviews/information-specialists-tool/pico-search",
      icon: "◆",
    },
    {
      id: "spider",
      label: "SPIDER (qualitativ)",
      description: "Alternative zu PICO für qualitative Synthese",
      href: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5138547/",
      icon: "◇",
    },
    {
      id: "finer",
      label: "FINER-Kriterien",
      description: "Machbarkeit und Relevanz der Forschungsfrage prüfen",
      href: "https://www.nihr.ac.uk/documents/finer-criteria-for-a-good-research-question/20487",
      icon: "◈",
    },
    {
      id: "cochrane-lib",
      label: "Cochrane Library",
      description: "Systematische Reviews als Referenz",
      href: "https://www.cochranelibrary.com/",
      icon: "◎",
    },
    {
      id: "grade",
      label: "GRADE Working Group",
      description: "Kontext evidenzbasierter Fragen",
      href: "https://www.gradeworkinggroup.org/",
      icon: "▣",
    },
    {
      id: "sb",
      label: "Suchstrategie (UKHSA)",
      description: "Leitfaden Abschnitt Fragestellung",
      href: "https://www.gov.uk/guidance/how-to-search-the-literature-for-public-health-research",
      icon: "▪",
    },
  ],

  searchStrategy: [
    {
      id: "prisma",
      label: "PRISMA 2020",
      description: "Statement und Checkliste",
      href: "http://www.prisma-statement.org/",
      icon: "◇",
    },
    {
      id: "pubmed",
      label: "PubMed User Guide",
      description: "Suche und MeSH",
      href: "https://pubmed.ncbi.nlm.nih.gov/help/",
      icon: "◆",
    },
    {
      id: "ieee",
      label: "IEEE Xplore Search Tips",
      description: "Technik & Informatik",
      href: "https://ieeexplore.ieee.org/Xplorehelp/",
      icon: "▣",
    },
    {
      id: "dbis",
      label: "DBIS Datenbanken",
      description: "Überblick universitäre Datenbanken (DE)",
      href: "https://dbis.uni-regensburg.de/",
      icon: "◎",
    },
    {
      id: "operator",
      label: "Boolean / Proximity",
      description: "Suchoperatoren (NCBI Bookshelf)",
      href: "https://www.ncbi.nlm.nih.gov/books/NBK7040/",
      icon: "▪",
    },
    {
      id: "openaire",
      label: "OpenAIRE Explore",
      description: "Open Access & EU-Projekte",
      href: "https://explore.openaire.eu/",
      icon: "▫",
    },
  ],

  conceptMatrix: [
    {
      id: "ww",
      label: "Webster & Watson (2002)",
      description: "Konzeptmatrix / ThemenrasterLiteratur",
      href: "https://doi.org/10.2307/4132338",
      icon: "◆",
    },
    {
      id: "matrix",
      label: "Thematische Synthese (NIHR)",
      description: "Methodischer Rahmen",
      href: "https://evidence.nihr.ac.uk/collection/thematic-synthesis-guide/",
      icon: "◇",
    },
    {
      id: "covidence",
      label: "Covidence",
      description: "Screening-Tool (kostenpflichtig für Teams; Orientierung)",
      href: "https://www.covidence.org/",
      icon: "◎",
    },
    {
      id: "rayyan",
      label: "Rayyan",
      description: "Kollaboratives Screening",
      href: "https://www.rayyan.ai/",
      icon: "▣",
    },
    {
      id: "excel",
      label: "Microsoft Excel-Training",
      description: "Tabellen für Extraktion",
      href: "https://support.microsoft.com/excel",
      icon: "▪",
    },
    {
      id: "dedup",
      label: "Deduplizieren (EPPI)",
      description: "Hinweise zu Dubletten",
      href: "https://eppi.ioe.ac.uk/cms/Default.aspx?tabid=2939",
      icon: "▫",
    },
  ],

  synthesis: [
    {
      id: "thematic",
      label: "Thematic Synthesis (ESRC)",
      description: "Überblick qualitative Synthese",
      href: "https://www.hra.nhs.uk/planning-and-improving-research/application-summaries/research-summaries/thematic-synthesis/",
      icon: "◆",
    },
    {
      id: "swic",
      label: "SWIC / Literatur diskutieren",
      description: "Strukturierte Einordnung",
      href: "https://students.unimelb.edu.au/academic-skills/resources/reading/writing-a-literature-review",
      icon: "◇",
    },
    {
      id: "thesis",
      label: "Literaturkapitel schreiben",
      description: "Graduate writing (UNC)",
      href: "https://writingcenter.unc.edu/tips-and-tools/literature-reviews/",
      icon: "◎",
    },
    {
      id: "critical",
      label: "Critical appraisal (CASP)",
      description: "Checklisten qualitativ/quantitativ",
      href: "https://casp-uk.net/",
      icon: "▣",
    },
    {
      id: "soep",
      label: "Paraphrasieren & Zitieren",
      description: "Purdue OWL — Quellenarbeit",
      href: "https://owl.purdue.edu/owl/research_and_citation/using_research/quoting_paraphrasing_and_summarizing/index.html",
      icon: "▪",
    },
    {
      id: "zotero",
      label: "Zotero",
      description: "Literaturverwaltung & Zitierstile",
      href: "https://www.zotero.org/",
      icon: "▫",
    },
  ],
};
