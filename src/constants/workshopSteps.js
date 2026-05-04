/**
 * Navigationsreihenfolge: Start (Vorüberlegung, nicht nummeriert), dann Arbeitsschritte 1–5,
 * zuletzt „Ressourcen & Tools“ ohne Prozess-Nummer (Referenz, nicht Teil des SLR-Ablaufs).
 */
export const WORKSHOP_STEPS = [
  { path: "/", label: "Start", short: null, processIndex: null, isPrelude: true },
  { path: "/forschungsfrage", label: "Forschungsfrage", short: "1", processIndex: 0 },
  { path: "/suchstrategie", label: "Suchstrategie", short: "2", processIndex: 1 },
  { path: "/synthese", label: "Analyse & Codierung", short: "3", processIndex: 2 },
  { path: "/konzeptmatrix", label: "Konzeptmatrix", short: "4", processIndex: 3 },
  { path: "/dashboard", label: "Ergebnisübersicht", short: "5", processIndex: 4 },
  { path: "/ressourcen", label: "Ressourcen & Tools", short: null, processIndex: null },
];

/** Anzahl der nummerierten Prozessschritte (ohne Ressourcen-Seite) */
export const PROCESS_STEP_TOTAL = 5;

export function stepIndexForPath(pathname) {
  const normalized = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
  const idx = WORKSHOP_STEPS.findIndex((s) => s.path === normalized);
  return idx >= 0 ? idx : 0;
}

/** 0-basierter Index im Prozess (0–4), oder null auf Start (Vorüberlegung) und Ressourcen-Seite */
export function processIndexForPath(pathname) {
  const normalized = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
  const step = WORKSHOP_STEPS.find((s) => s.path === normalized);
  return step && step.processIndex !== null && step.processIndex !== undefined ? step.processIndex : null;
}
