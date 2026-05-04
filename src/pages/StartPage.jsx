import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import PageLayout from "../components/PageLayout";
import SlrSuitabilityCheck from "../components/SlrSuitabilityCheck";

export default function StartPage() {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <PageHeader
        title="Passt eine Systematic Literature Review (SLR) zu deinem Vorhaben?"
        subtitle="Eine SLR eignet sich, wenn du den Forschungsstand zu einem klar abgegrenzten Thema systematisch, nachvollziehbar und reproduzierbar erfassen willst – mit transparenter Suche, definierten Kriterien und dokumentierter Studienauswahl."
      />

      <SlrSuitabilityCheck />

      <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => navigate("/forschungsfrage")}
          className="rounded-lg bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Mit Schritt 1 starten
        </button>
      </div>
    </PageLayout>
  );
}
