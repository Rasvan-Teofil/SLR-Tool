/**
 * PRISMA 2020-style strings for the classic flow layout (banner, center / right columns).
 */

function n(v) {
  const s = String(v ?? "").trim();
  return s === "" ? "0" : s;
}

/** @param {{ config: object, counts: object }} flow */
export function buildPrismaClassicLayout(flow) {
  const { config, counts } = flow;

  const idParts = [`Databases (n = ${n(counts.identificationDatabases)})`];
  if (config.regDetail) {
    idParts.push(`Registers (n = ${n(counts.identificationRegisters)})`);
  }
  if (config.other) {
    idParts.push(`Other sources (n = ${n(counts.identificationOther)})`);
  }
  if (config.previous) {
    idParts.push(`Previous studies (n = ${n(counts.identificationPrevious)})`);
  }

  const idCenter = {
    title: "Records identified from:",
    line: idParts.join(", "),
    detail:
      config.dbDetail && String(counts.databaseDetailNote || "").trim()
        ? String(counts.databaseDetailNote).trim()
        : null,
  };

  const beforeScreen = {
    title: "Records removed before screening:",
    line: `Duplicate records (n = ${n(counts.duplicatesRemoved)})`,
  };

  const screeningRows = [
    {
      center: ["Records screened", `(n = ${n(counts.recordsScreened)})`],
      right: ["Records excluded", `(n = ${n(counts.recordsExcludedTitleAbstract)})`],
    },
    {
      center: ["Reports sought for retrieval", `(n = ${n(counts.reportsSoughtRetrieval)})`],
      right: ["Reports not retrieved", `(n = ${n(counts.reportsNotRetrieved)})`],
    },
    {
      center: ["Reports assessed for eligibility", `(n = ${n(counts.reportsAssessedEligibility)})`],
      right: ["Reports excluded", `(n = ${n(counts.reportsExcludedFullText)})`],
    },
  ];

  let includedLines;
  if (config.metaAnalysis) {
    includedLines = [
      `New studies included in review (n = ${n(counts.studiesIncludedInReview)})`,
      `Reports included in qualitative synthesis (n = ${n(counts.reportsInQualitativeSynthesis)})`,
      `Reports included in meta-analysis (n = ${n(counts.studiesInMetaAnalysis)})`,
    ];
  } else {
    includedLines = [
      "New studies included in review",
      `(n = ${n(counts.studiesIncludedInReview)})`,
    ];
  }

  return {
    header: "Identification of new studies via databases and registers",
    identification: { center: idCenter, right: beforeScreen },
    screeningRows,
    included: { lines: includedLines },
  };
}
