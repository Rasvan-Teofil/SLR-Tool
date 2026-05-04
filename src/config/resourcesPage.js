/**
 * Inhalt der Seite „Ressourcen & Tools“ — zentral pflegbar.
 */
export const resourcesPageConfig = {
  resourceSections: [
    {
      id: "research-question",
      title: "1. Forschungsfrage formulieren & schärfen",
      intro:
        "Tools zur Ideenfindung, Eingrenzung und Prüfung von Forschungsfragen. KI unterstützt hier beim Strukturieren, ersetzt aber keine fachliche Bewertung.",
      links: [
        {
          id: "chatgpt",
          label: "ChatGPT / OpenAI",
          description: "Formulierung, Strukturierung und kritische Prüfung von Forschungsfragen.",
          href: "https://chatgpt.com/",
          type: "KI",
          purpose: "PICOC/SPIDER/CIMO-Fragen formulieren und FINER-Kriterien prüfen",
          caution: "Kein Ersatz für Quellenarbeit; Ergebnisse fachlich und methodisch prüfen.",
        },
        {
          id: "elicit",
          label: "Elicit",
          description: "KI-gestützte Paper-Suche, Forschungsüberblick und Extraktion.",
          href: "https://elicit.com/",
          type: "KI / Forschung",
          purpose: "Aus Forschungsideen relevante Literatur, mögliche Variablen und Forschungslücken ableiten",
          caution: "Gefundene Quellen und Zusammenfassungen immer am Originalpaper prüfen.",
        },
        {
          id: "consensus",
          label: "Consensus",
          description: "KI-Suchmaschine für wissenschaftliche Evidenz aus Publikationen.",
          href: "https://consensus.app/",
          type: "KI / Evidenz",
          purpose: "Erste Einschätzung, ob zu einer Forschungsfrage belastbare Evidenz existiert",
          caution: "Nicht als alleinige Datenbank für eine SLR verwenden.",
        },
        {
          id: "perplexity",
          label: "Perplexity",
          description: "Antwortmaschine mit Quellenangaben für schnelle Orientierung.",
          href: "https://www.perplexity.ai/",
          type: "KI / Web",
          purpose: "Begriffe, Synonyme, Anwendungskontexte und Einstiegsliteratur sammeln",
          caution: "Webquellen von wissenschaftlichen Quellen trennen.",
        },
      ],
    },
    {
      id: "search-screening",
      title: "2. Suchstrategie, Datenbanken & Screening",
      intro:
        "Tools zur systematischen Suche, Dokumentation und Auswahl von Literatur. Ziel ist ein reproduzierbarer Such- und Screening-Prozess.",
      links: [
        {
          id: "semantic-scholar",
          label: "Semantic Scholar",
          description: "KI-gestützte wissenschaftliche Suchmaschine.",
          href: "https://www.semanticscholar.org/",
          type: "Datenbank / KI",
          purpose: "Relevante Papers, verwandte Arbeiten und Zitationsbeziehungen finden",
          caution: "Suchstrategie zusätzlich in geeigneten Fachdatenbanken dokumentieren.",
        },
        {
          id: "openalex",
          label: "OpenAlex",
          description: "Offener Katalog wissenschaftlicher Werke, Autor:innen, Institutionen und Quellen.",
          href: "https://openalex.org/",
          type: "Metadaten / Open",
          purpose: "Publikations- und Metadaten prüfen, Quellenkontexte nachvollziehen",
          caution: "Metadaten können unvollständig sein; bei wichtigen Quellen DOI/Verlag gegenprüfen.",
        },
        {
          id: "rayyan",
          label: "Rayyan",
          description: "Review-Plattform für Titel-/Abstract-Screening und Kollaboration.",
          href: "https://www.rayyan.ai/",
          type: "Screening",
          purpose: "Treffer importieren, labeln, ein-/ausschließen und Entscheidungen dokumentieren",
          caution: "KI-Priorisierung unterstützt nur; finale Entscheidungen müssen begründet werden.",
        },
        {
          id: "covidence",
          label: "Covidence",
          description: "Systematic-Review-Software für Screening, Extraktion und Teamarbeit.",
          href: "https://www.covidence.org/",
          type: "Review-Management",
          purpose: "Screening-Workflows und Datenextraktion professionell organisieren",
          caution: "Eher umfangreich/kommerziell; für kleine studentische Reviews ggf. zu groß.",
        },
      ],
    },
    {
      id: "analysis-coding",
      title: "3. Analyse & Kodierung",
      intro:
        "Tools zur qualitativen Analyse, Kategorienbildung und Arbeit mit Kodierleitfäden. KI kann Vorschläge machen, die Kodierung muss jedoch methodisch kontrolliert werden.",
      links: [
        {
          id: "maxqda",
          label: "MAXQDA AI Assist",
          description: "Qualitative Datenanalyse mit KI-Unterstützung für Zusammenfassungen und Codes.",
          href: "https://www.maxqda.com/products/ai-assist",
          type: "QDA / KI",
          purpose: "Kategorien, Subcodes und Zusammenfassungen für kodierte Segmente entwickeln",
          caution: "KI-Vorschläge mit Kodierleitfaden und Originaltext abgleichen.",
        },
        {
          id: "atlasti",
          label: "ATLAS.ti",
          description: "Qualitative Datenanalyse mit KI-Funktionen für Dokumente und Kodierung.",
          href: "https://atlasti.com/",
          type: "QDA / KI",
          purpose: "Textstellen analysieren, Codes entwickeln und Dokumente systematisch auswerten",
          caution: "Automatische Kodierung nicht ungeprüft übernehmen.",
        },
        {
          id: "nvivo",
          label: "NVivo",
          description: "Etabliertes Tool für qualitative und Mixed-Methods-Analyse.",
          href: "https://lumivero.com/products/nvivo/",
          type: "QDA",
          purpose: "Literatur, Notizen, Codes und Auswertungen in einem Projekt organisieren",
          caution: "Für kurze Workshop-Übungen ggf. zu umfangreich; eher als Referenztool nennen.",
        },
        {
          id: "taguette",
          label: "Taguette",
          description: "Freies Open-Source-Tool zum Markieren, Taggen und Exportieren qualitativer Daten.",
          href: "https://www.taguette.org/",
          type: "Open Source / QDA",
          purpose: "Einfaches Kodieren von Textstellen ohne kommerzielle Lizenz",
          caution: "Weniger Funktionsumfang als MAXQDA, ATLAS.ti oder NVivo.",
        },
      ],
    },
    {
      id: "concept-matrix",
      title: "4. Konzeptmatrix, Literaturmapping & Forschungslücken",
      intro:
        "Tools zur visuellen Erschließung des Forschungsfelds, zur Identifikation verwandter Arbeiten und zur Entwicklung von Forschungslücken.",
      links: [
        {
          id: "connected-papers",
          label: "Connected Papers",
          description: "Visuelles Tool zum Finden und Erkunden verwandter wissenschaftlicher Arbeiten.",
          href: "https://www.connectedpapers.com/",
          type: "Mapping",
          purpose: "Literaturcluster, zentrale Arbeiten und angrenzende Forschungsstränge erkennen",
          caution: "Visualisierung ergänzt die Suche, ersetzt aber keine dokumentierte Suchstrategie.",
        },
        {
          id: "researchrabbit",
          label: "ResearchRabbit",
          description: "Literaturmapping, Citation Maps und Trendbeobachtung.",
          href: "https://www.researchrabbit.ai/",
          type: "Mapping / KI",
          purpose: "Ausgehend von Seed-Papers verwandte Literatur und Forschungsentwicklungen finden",
          caution: "Startpaper bewusst wählen, sonst entstehen verzerrte Literaturcluster.",
        },
        {
          id: "litmaps",
          label: "Litmaps",
          description: "Literaturkarten und Zitationspfade für Literature Discovery.",
          href: "https://www.litmaps.com/",
          type: "Mapping",
          purpose: "Themenfelder, Paper-Verbindungen und mögliche Forschungslücken sichtbar machen",
          caution: "Nicht jede Lücke im Mapping ist automatisch eine wissenschaftliche Forschungslücke.",
        },
        {
          id: "scite",
          label: "scite.ai",
          description: "Smart Citations zeigen, wie Paper von anderen Arbeiten zitiert werden.",
          href: "https://scite.ai/",
          type: "Zitationsanalyse / KI",
          purpose: "Unterstützende, kontrastierende oder erwähnende Zitationskontexte prüfen",
          caution: "Zitationskontext immer mit dem Originalpaper interpretieren.",
        },
      ],
    },
  ],

  baseLinks: [
    {
      id: "google-scholar",
      label: "Google Scholar",
      href: "https://scholar.google.com/",
      type: "Datenbank",
    },
    {
      id: "crossref",
      label: "Crossref",
      href: "https://www.crossref.org/",
      type: "Metadaten",
    },
    {
      id: "base",
      label: "BASE",
      href: "https://www.base-search.net/",
      type: "Datenbank / Open",
    },
    {
      id: "unpaywall",
      label: "Unpaywall / OADOI",
      href: "https://unpaywall.org/",
      type: "Open Access",
    },
    {
      id: "prisma",
      label: "PRISMA",
      href: "https://www.prisma-statement.org/",
      type: "Reporting",
    },
    {
      id: "zotero",
      label: "Zotero",
      href: "https://www.zotero.org/",
      type: "Literaturverwaltung",
    },
  ],

  references: [
    {
      id: "bramer-searching",
      title:
        "Bramer, W. M., De Jonge, G. B., Rethlefsen, M. L., Mast, F., & Kleijnen, J. (2018). A systematic approach to searching: An efficient and complete method to develop literature searches.",
      note: "Methodischer Leitfaden zur Entwicklung vollständiger und effizienter Suchstrategien.",
      href: "https://doi.org/10.5195/jmla.2018.283",
    },
    {
      id: "brereton-slr-software",
      title:
        "Brereton, P., Kitchenham, B. A., Budgen, D., Turner, M., & Khalil, M. (2007). Lessons from applying the systematic literature review process within the software engineering domain.",
      note: "Erfahrungen mit SLR-Prozessen im Software-Engineering; nützlich für Planung, Screening und Dokumentation.",
      href: "https://doi.org/10.1016/j.jss.2006.07.009",
    },
    {
      id: "research-question-framework",
      title: "Klingemann Library LibGuides. (o. J.). Define your research question & select framework.",
      note: "Praxisorientierte Orientierung zur Entwicklung von Forschungsfragen und passenden Frameworks.",
      href: "https://libguides.berlin-international.de/books/research-skills/page/define-your-research-question-select-framework",
    },
    {
      id: "heil-literaturrecherche",
      title: "Heil, E. A. (2021). Methode der systematischen Literaturrecherche.",
      note: "Deutschsprachige Einführung in Vorgehen und Dokumentation systematischer Literaturrecherche.",
      href: "https://doi.org/10.22029/jlupub-17189",
    },
    {
      id: "hosseini-research-questions",
      title:
        "Hosseini, M.-S., Jahanshahlou, F., Akbarzadeh, M. A., Zarei, M., & Vaez-Gharamaleki, Y. (2024). Formulating research questions for evidence-based studies.",
      note: "Orientierung zur Formulierung prüfbarer Forschungsfragen für evidenzbasierte Studien.",
      href: "https://doi.org/10.1016/j.glmedi.2023.100046",
    },
    {
      id: "liberati-prisma-2009",
      title:
        "Liberati, A. et al. (2009). The PRISMA statement for reporting systematic reviews and meta-analyses: Explanation and elaboration.",
      note: "Erläuterung und Ausarbeitung zum PRISMA-Statement 2009.",
      href: "https://doi.org/10.1371/journal.pmed.1000100",
    },
    {
      id: "mayring-qualitative-inhaltsanalyse",
      title: "Mayring, P. (2022). Qualitative Inhaltsanalyse: Grundlagen und Techniken (13. Aufl.). Beltz.",
      note: "Grundlagenwerk für qualitative Inhaltsanalyse und regelgeleitete Kategorienbildung.",
      href: "https://www.beltz.de/fachmedien/paedagogik/produkte/details/48632-qualitative-inhaltsanalyse.html",
    },
    {
      id: "mcgowan-press",
      title:
        "McGowan, J., Sampson, M., Salzwedel, D. M., Cogo, E., Foerster, V., & Lefebvre, C. (2016). PRESS peer review of electronic search strategies: 2015 guideline statement.",
      note: "Guideline zur Peer-Review-Prüfung elektronischer Suchstrategien.",
      href: "https://doi.org/10.1016/j.jclinepi.2016.01.021",
    },
    {
      id: "rethlefsen-prisma-s",
      title:
        "Rethlefsen, M. L. et al. (2021). PRISMA-S: An extension to the PRISMA Statement for Reporting Literature Searches in Systematic Reviews.",
      note: "Erweiterung zur transparenten Berichterstattung von Suchstrategien in systematischen Reviews.",
      href: "https://doi.org/10.1186/s13643-020-01542-z",
    },
    {
      id: "elsevier-finer",
      title: "Elsevier Author Services. (2020). FINER: A research framework.",
      note: "Kurzüberblick zu FINER als Prüfraster für Forschungsfragen.",
      href: "https://scientific-publishing.webshop.elsevier.com/research-process/finer-research-framework/",
    },
    {
      id: "trifu-prisma",
      title: "Trifu, A. (2022). Applying the PRISMA method.",
      note: "Anwendungsbeispiel zur PRISMA-orientierten Darstellung eines Review-Prozesses.",
      href: "https://doi.org/10.1051/matecconf/202235400052",
    },
    {
      id: "covidence-screening-guide",
      title: "Covidence. (2024). A practical guide: Screening for Systematic Reviews.",
      note: "Praxisleitfaden für Titel-/Abstract- und Volltext-Screening.",
      href: "https://www.covidence.org/wp-content/uploads/2025/05/A-practical-guide-Screening-for-Systematic-Reviews.pdf",
    },
    {
      id: "ww",
      title: "Webster, J., & Watson, R. T. (2002). Analyzing the past to prepare for the future: Writing a literature review.",
      note: "Klassische Grundlage für thematische / Konzept-Matrix-Ansätze in der IS-Literatur.",
      href: "https://doi.org/10.2307/4132319",
    },
    {
      id: "prisma2020",
      title: "Page, M. J. et al. (2021). The PRISMA 2020 statement.",
      note: "Reporting systematischer Reviews und Meta-Analysen.",
      href: "https://doi.org/10.1136/bmj.n71",
    },
    {
      id: "tranfield",
      title:
        "Tranfield, D., Denyer, D., & Smart, P. (2003). Towards a Methodology for Developing Evidence-Informed Management Knowledge by Means of Systematic Review.",
      note: "Häufig zitiert für strukturierte Literaturübersichten in der Managementforschung.",
      href: "https://josephmahoney.web.illinois.edu/BADM504_Fall%202013/6_Tranfield,%20Denyer%20and%20Smart%20(2003).pdf",
    },
  ],
};
