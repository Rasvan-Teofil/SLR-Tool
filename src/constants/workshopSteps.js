export const WORKSHOP_STEPS = [
  { path: "/", label: "Forschungsfrage", short: "1" },
  { path: "/suchstrategie", label: "Suchstrategie", short: "2" },
  { path: "/konzeptmatrix", label: "Konzeptmatrix", short: "3" },
  { path: "/synthese", label: "Synthese", short: "4" },
  { path: "/dashboard", label: "Ergebnisübersicht", short: "5" },
];

export function stepIndexForPath(pathname) {
  const normalized = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
  const idx = WORKSHOP_STEPS.findIndex((s) => s.path === normalized);
  return idx >= 0 ? idx : 0;
}
