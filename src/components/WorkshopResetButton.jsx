import { useWorkshop } from "../context/WorkshopContext";

/**
 * Globaler Reset aller SLR-Daten (localStorage) — mit Sicherheitsabfrage.
 */
export default function WorkshopResetButton() {
  const { resetWorkshop } = useWorkshop();
  return (
    <button
      type="button"
      onClick={resetWorkshop}
      className="shrink-0 rounded-md border border-red-200 bg-red-50 px-2.5 py-1.5 text-[11px] font-medium text-red-800 transition hover:bg-red-100 sm:text-xs"
    >
      Alle SLR-Daten zurücksetzen
    </button>
  );
}
