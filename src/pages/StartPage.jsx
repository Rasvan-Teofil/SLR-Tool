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

      <section className="mt-6 rounded-lg border border-red-200 bg-red-50/70 p-4 text-sm text-slate-800">
        <h2 className="mb-2 text-base font-semibold text-slate-900">Kritische Reflexion der KI-Nutzung</h2>
        <p className="mb-3 max-w-4xl leading-relaxed text-slate-700">
          KI kann dich beim Strukturieren, Formulieren und Prüfen unterstützen. Sie bleibt aber ein Werkzeug: Die
          fachliche, methodische und ethische Verantwortung liegt immer bei dir.
        </p>
        <ul className="grid gap-2 text-sm text-slate-700 md:grid-cols-2">
          <li className="flex gap-2">
            <span className="mt-0.5 text-red-600">○</span>
            <span>Arbeite immer mit Human in the Loop: Jede KI-Ausgabe wird gelesen, hinterfragt und geprüft.</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-0.5 text-red-600">○</span>
            <span>KI kann relevante Aspekte übersehen, falsch gewichten oder methodische Grenzen verschleiern.</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-0.5 text-red-600">○</span>
            <span>KI kann Inhalte, Quellen, Zitate oder DOI-Angaben erzeugen, die es so nicht gibt.</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-0.5 text-red-600">○</span>
            <span>Prüfe Aussagen im Originalpaper, suche Belege nach und validiere Quellen eigenständig.</span>
          </li>
          <li className="flex gap-2 md:col-span-2">
            <span className="mt-0.5 text-red-600">○</span>
            <span>
              Prompt-Hilfen sind keine Einladung, das Denken abzugeben: Nutze KI als Sparringspartner, nicht als
              automatische Entscheidungsinstanz.
            </span>
          </li>
        </ul>
      </section>

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
