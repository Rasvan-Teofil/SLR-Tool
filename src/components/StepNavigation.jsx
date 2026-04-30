import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { brand } from "../config/brand";
import {
  PROCESS_STEP_TOTAL,
  WORKSHOP_STEPS,
  processIndexForPath,
  stepIndexForPath,
} from "../constants/workshopSteps";
import BrandMark from "./BrandMark";
import WorkshopResetButton from "./WorkshopResetButton";

export default function StepNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentIndex = stepIndexForPath(location.pathname);
  const procIdx = processIndexForPath(location.pathname);
  const isSupplementary = procIdx === null;
  const progress = isSupplementary
    ? 100
    : Math.round(((procIdx + 1) / PROCESS_STEP_TOTAL) * 100);

  function goRelative(delta) {
    const next = currentIndex + delta;
    if (next < 0 || next >= WORKSHOP_STEPS.length) return;
    navigate(WORKSHOP_STEPS[next].path);
  }

  return (
    <nav
      className="rounded-lg bg-white/90 p-2.5 md:p-3"
      aria-label="SLR-Schritte"
    >
      <div className="mb-2 flex flex-col gap-1 border-b border-slate-100 pb-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <BrandMark compact />
        <div className="flex w-full min-w-0 flex-col items-stretch gap-2 sm:max-w-[min(100%,24rem)] sm:items-end">
          <p className="text-[11px] leading-snug text-slate-500 sm:text-right">{brand.claim}</p>
          <div className="flex justify-end">
            <WorkshopResetButton />
          </div>
        </div>
      </div>

      <div className="mb-2 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">SLR-Fortschritt</p>
          <p className="truncate text-xs font-semibold text-slate-800 sm:text-sm">
            {isSupplementary ? (
              <>Referenz (ohne Arbeitsschritt): {WORKSHOP_STEPS[currentIndex]?.label}</>
            ) : (
              <>
                Schritt {procIdx + 1} von {PROCESS_STEP_TOTAL}: {WORKSHOP_STEPS[currentIndex]?.label}
              </>
            )}
          </p>
        </div>
        <div className="h-1.5 w-full max-w-md shrink-0 overflow-hidden rounded-full bg-slate-100 sm:ml-auto">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>

      <ul className="flex flex-wrap gap-1 border-t border-slate-100 pt-2">
        {WORKSHOP_STEPS.map((step) => (
          <li key={step.path}>
            <NavLink
              to={step.path}
              className={({ isActive }) =>
                `inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition md:px-2.5 md:text-[13px] ${
                  isActive
                    ? "bg-indigo-100 text-indigo-900"
                    : step.processIndex === null
                      ? "bg-slate-50 text-slate-500 hover:bg-slate-100"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`
              }
              end={step.path === "/"}
            >
              {step.processIndex !== null ? (
                <span className="tabular-nums text-[10px] opacity-70 md:text-xs">{step.processIndex + 1}.</span>
              ) : (
                <span className="text-[10px] opacity-60 md:text-xs" aria-hidden>
                  ·
                </span>
              )}
              {step.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="mt-2 flex flex-wrap items-center gap-1.5 border-t border-slate-100 pt-2">
        <button
          type="button"
          onClick={() => goRelative(-1)}
          disabled={currentIndex === 0}
          className="rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        >
          Zurück
        </button>
        <button
          type="button"
          onClick={() => goRelative(1)}
          disabled={currentIndex >= WORKSHOP_STEPS.length - 1}
          className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        >
          Weiter
        </button>
        <NavLink
          to="/dashboard"
          className="rounded-md bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-slate-900 md:text-sm"
        >
          Zur Auswertung
        </NavLink>
      </div>
    </nav>
  );
}
