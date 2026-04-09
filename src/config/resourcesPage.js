/**
 * Inhalt der Seite „Ressourcen & Tools“ — zentral pflegbar.
 */
export const resourcesPageConfig = {
  toolSections: [
    {
      id: "ki",
      title: "KI-gestützte Recherche & Textarbeit",
      intro:
        "Hilfen zur Ideenfindung und Strukturierung — Quellen und Behauptungen immer eigenständig prüfen (halluzinationssicher arbeiten).",
      links: [
        {
          id: "perplexity",
          label: "Perplexity",
          description: "Antworten mit Quellenangaben",
          href: "https://www.perplexity.ai/",
          icon: "●",
        },
        {
          id: "elicit",
          label: "Elicit",
          description: "Paper-Suche & Extraktion (Forschung)",
          href: "https://elicit.org/",
          icon: "●",
        },
        {
          id: "consensus",
          label: "Consensus",
          description: "Evidence aus Publikationen",
          href: "https://consensus.app/",
          icon: "●",
        },
        {
          id: "scite",
          label: "scite.ai",
          description: "Zitationskontexte",
          href: "https://scite.ai/",
          icon: "●",
        },
        {
          id: "chatgpt",
          label: "ChatGPT / OpenAI",
          description: "Formulierung & Struktur (kein Ersatz für Quellenarbeit)",
          href: "https://chat.openai.com/",
          icon: "●",
        },
      ],
    },
    {
      id: "recherche",
      title: "Klassische Recherche & Metadaten",
      intro: "Offizielle Datenbanken und Hilfen ohne KI-Fokus.",
      links: [
        {
          id: "scholar",
          label: "Google Scholar",
          description: "Breite Literatursuche",
          href: "https://scholar.google.com/",
          icon: "◆",
        },
        {
          id: "crossref",
          label: "Crossref",
          description: "DOI & Metadaten",
          href: "https://www.crossref.org/",
          icon: "◆",
        },
        {
          id: "base",
          label: "BASE",
          description: "Suchmaschine wissenschaftl. Repositorien",
          href: "https://www.base-search.net/",
          icon: "◆",
        },
        {
          id: "unpaywall",
          label: "Unpaywall / OADOI",
          description: "Open-Access-Versionen finden",
          href: "https://unpaywall.org/",
          icon: "◆",
        },
      ],
    },
  ],

  extraLinks: [
    {
      id: "prisma",
      label: "PRISMA",
      href: "http://www.prisma-statement.org/",
      icon: "◇",
    },
    {
      id: "covidence",
      label: "Covidence",
      href: "https://www.covidence.org/",
      icon: "◇",
    },
    {
      id: "zotero",
      label: "Zotero",
      href: "https://www.zotero.org/",
      icon: "◇",
    },
    {
      id: "jane",
      label: "Jane (Biomed)",
      href: "https://jane.biosemantics.org/",
      icon: "◇",
    },
    {
      id: "connected",
      label: "Connected Papers",
      href: "https://www.connectedpapers.com/",
      icon: "◇",
    },
  ],

  references: [
    {
      id: "ww",
      title: "Webster, J., & Watson, R. T. (2002). Analyzing the past to prepare for the future: Writing a literature review.",
      note: "Klassische Grundlage für thematische / Konzept-Matrix-Ansätze in der IS-Literatur.",
      href: "https://doi.org/10.2307/4132338",
    },
    {
      id: "prisma2020",
      title: "Page, M. J. et al. (2021). The PRISMA 2020 statement.",
      note: "Reporting systematischer Reviews und Meta-Analysen.",
      href: "https://doi.org/10.1136/bmj.n71",
    },
    {
      id: "tranfield",
      title: "Tranfield, D., Denyer, D., & Smart, P. (2003). Towards a methodology for developing evidence-informed management knowledge.",
      note: "Häufig zitiert für strukturierte Literaturübersichten in der Managementforschung.",
      href: "https://doi.org/10.1080/0020754022000032577",
    },
  ],
};
