import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { WORKSHOP_STEPS, stepIndexForPath } from "../constants/workshopSteps";

export default function StepNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentIndex = stepIndexForPath(location.pathname);
  const total = WORKSHOP_STEPS.length;
  const progress = Math.round(((currentIndex + 1) / total) * 100);

  function goRelative(delta) {
    const next = currentIndex + delta;
    if (next < 0 || next >= WORKSHOP_STEPS.length) return;
    navigate(WORKSHOP_STEPS[next].path);
  }

  return (
    <nav
      className="print:hidden mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
      aria-label="Workshop-Schritte"
    >
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Workshop-Fortschritt</p>
          <p className="text-sm font-semibold text-slate-800">
            Schritt {currentIndex + 1} von {total}: {WORKSHOP_STEPS[currentIndex]?.label}
          </p>
        </div>
        <div className="h-2 w-full max-w-md overflow-hidden rounded-full bg-slate-100 sm:ml-auto">
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

      <ul className="flex flex-wrap gap-2 border-t border-slate-100 pt-4">
        {WORKSHOP_STEPS.map((step, i) => (
          <li key={step.path}>
            <NavLink
              to={step.path}
              className={({ isActive }) =>
                `inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-100 text-indigo-900"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`
              }
              end={step.path === "/"}
            >
              <span className="tabular-nums text-xs opacity-70">{i + 1}.</span>
              {step.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={() => goRelative(-1)}
          disabled={currentIndex === 0}
          className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Zurück
        </button>
        <button
          type="button"
          onClick={() => goRelative(1)}
          disabled={currentIndex >= WORKSHOP_STEPS.length - 1}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Weiter
        </button>
        <NavLink
          to="/dashboard"
          className="rounded-md bg-slate-800 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-900"
        >
          Zum Dashboard
        </NavLink>
      </div>
    </nav>
  );
}
