/**
 * PRISMA flow: default state and merge for persisted workshop data.
 * Keeps counts as strings so empty fields stay visually blank (CSV/PDF-ready later).
 */

export function createInitialPrismaFlowConfig() {
  return {
    previous: false,
    other: false,
    dbDetail: false,
    regDetail: false,
    metaAnalysis: false,
  };
}

export function createInitialPrismaFlowCounts() {
  return {
    identificationDatabases: "",
    identificationRegisters: "",
    identificationOther: "",
    identificationPrevious: "",
    databaseDetailNote: "",
    duplicatesRemoved: "",
    recordsScreened: "",
    recordsExcludedTitleAbstract: "",
    reportsSoughtRetrieval: "",
    reportsNotRetrieved: "",
    reportsAssessedEligibility: "",
    reportsExcludedFullText: "",
    studiesIncludedInReview: "",
    reportsInQualitativeSynthesis: "",
    studiesInMetaAnalysis: "",
  };
}

export function createInitialPrismaFlow() {
  return {
    config: createInitialPrismaFlowConfig(),
    counts: createInitialPrismaFlowCounts(),
  };
}

export function mergePrismaFlow(parsed) {
  const base = createInitialPrismaFlow();
  if (!parsed || typeof parsed !== "object") return base;
  return {
    config: { ...base.config, ...(parsed.config || {}) },
    counts: { ...base.counts, ...(parsed.counts || {}) },
  };
}
