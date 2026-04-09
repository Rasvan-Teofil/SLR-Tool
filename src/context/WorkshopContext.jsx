import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { createEmptyRatings, createInitialConceptMatrixData } from "../lib/conceptMatrix";
import { createInitialPrismaFlow, mergePrismaFlow } from "../lib/prismaFlowDefaults";

export const LEGACY_MATRIX_STORAGE_KEY = "forschungsthema-matrix-data-v1";
export const WORKSHOP_STORAGE_KEY = "slr-workshop-state-v1";

function createInitialResearchQuestion() {
  return {
    mainQuestion: "",
    subQuestions: "",
    keywords: "",
  };
}

function createInitialSearchStrategy() {
  return {
    databases: "",
    searchString: "",
    inclusionCriteria: "",
    exclusionCriteria: "",
    prismaIdentification: "",
    prismaScreening: "",
    prismaEligibility: "",
    prismaIncluded: "",
    notes: "",
    prismaFlow: createInitialPrismaFlow(),
    /** @type {null | { fileName: string, mimeType: string, dataUrl: string, uploadedAt: string }} */
    prismaDiagramAsset: null,
  };
}

function createInitialSynthesis() {
  return {
    notes: "",
    implications: "",
  };
}

export function createInitialWorkshopState() {
  return {
    version: 1,
    researchQuestion: createInitialResearchQuestion(),
    searchStrategy: createInitialSearchStrategy(),
    conceptMatrix: createInitialConceptMatrixData(),
    synthesis: createInitialSynthesis(),
  };
}

function mergeConceptMatrixFromLegacy(parsed) {
  return {
    ...createInitialConceptMatrixData(),
    ...parsed,
    ratings: parsed.ratings && typeof parsed.ratings === "object" ? parsed.ratings : {},
  };
}

function loadPersistedState() {
  try {
    const stored = localStorage.getItem(WORKSHOP_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const base = createInitialWorkshopState();
      return {
        ...base,
        ...parsed,
        researchQuestion: { ...base.researchQuestion, ...(parsed.researchQuestion || {}) },
        searchStrategy: {
          ...base.searchStrategy,
          ...(parsed.searchStrategy || {}),
          prismaFlow: mergePrismaFlow(
            parsed.searchStrategy && parsed.searchStrategy.prismaFlow
              ? parsed.searchStrategy.prismaFlow
              : null
          ),
        },
        synthesis: { ...base.synthesis, ...(parsed.synthesis || {}) },
        conceptMatrix:
          parsed.conceptMatrix && typeof parsed.conceptMatrix === "object"
            ? {
                ...createInitialConceptMatrixData(),
                ...parsed.conceptMatrix,
                ratings:
                  parsed.conceptMatrix.ratings && typeof parsed.conceptMatrix.ratings === "object"
                    ? parsed.conceptMatrix.ratings
                    : {},
              }
            : base.conceptMatrix,
      };
    }

    const legacy = localStorage.getItem(LEGACY_MATRIX_STORAGE_KEY);
    if (legacy) {
      const parsed = JSON.parse(legacy);
      const base = createInitialWorkshopState();
      return {
        ...base,
        conceptMatrix: mergeConceptMatrixFromLegacy(parsed),
      };
    }
  } catch {
    /* fall through */
  }
  return createInitialWorkshopState();
}

const WorkshopContext = createContext(null);

export function WorkshopProvider({ children }) {
  const [state, setState] = useState(loadPersistedState);

  useEffect(() => {
    setState((current) => ({
      ...current,
      conceptMatrix: {
        ...current.conceptMatrix,
        ratings: createEmptyRatings(
          current.conceptMatrix.categories,
          current.conceptMatrix.studies,
          current.conceptMatrix.ratings
        ),
      },
    }));
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(WORKSHOP_STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      if (e instanceof DOMException && e.name === "QuotaExceededError") {
        window.alert(
          "Der Browser-Speicher ist voll (z. B. durch ein sehr großes PRISMA-PNG). Bitte eine kleinere PNG verwenden oder andere Inhalte kürzen."
        );
      }
    }
  }, [state]);

  const updateResearchQuestion = useCallback((patch) => {
    setState((s) => ({
      ...s,
      researchQuestion: { ...s.researchQuestion, ...patch },
    }));
  }, []);

  const updateSearchStrategy = useCallback((patch) => {
    setState((s) => ({
      ...s,
      searchStrategy: { ...s.searchStrategy, ...patch },
    }));
  }, []);

  const updateSynthesis = useCallback((patch) => {
    setState((s) => ({
      ...s,
      synthesis: { ...s.synthesis, ...patch },
    }));
  }, []);

  const updateConceptMatrix = useCallback((updater) => {
    setState((current) => {
      const nextMatrix =
        typeof updater === "function" ? updater(current.conceptMatrix) : { ...current.conceptMatrix, ...updater };
      return {
        ...current,
        conceptMatrix: {
          ...nextMatrix,
          ratings: createEmptyRatings(nextMatrix.categories, nextMatrix.studies, nextMatrix.ratings),
        },
      };
    });
  }, []);

  const resetWorkshop = useCallback(() => {
    if (!window.confirm("Möchten Sie wirklich alle gespeicherten SLR-Daten in diesem Browser zurücksetzen?")) return;
    setState(createInitialWorkshopState());
    try {
      localStorage.removeItem(LEGACY_MATRIX_STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({
      state,
      updateResearchQuestion,
      updateSearchStrategy,
      updateSynthesis,
      updateConceptMatrix,
      resetWorkshop,
    }),
    [state, updateResearchQuestion, updateSearchStrategy, updateSynthesis, updateConceptMatrix, resetWorkshop]
  );

  return <WorkshopContext.Provider value={value}>{children}</WorkshopContext.Provider>;
}

export function useWorkshop() {
  const ctx = useContext(WorkshopContext);
  if (!ctx) {
    throw new Error("useWorkshop must be used within WorkshopProvider");
  }
  return ctx;
}
