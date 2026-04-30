import SectionCard from "./SectionCard";

/**
 * Kompakter SLR-Eignungscheck vor Schritt 1 (Orientierung, keine Datenspeicherung).
 */
export default function SlrSuitabilityCheck() {
  return (
    <SectionCard title="Passt eine Systematic Literature Review (SLR) zu deinem Vorhaben?">
      <p className="mb-4 text-sm text-slate-600">
        Eine SLR eignet sich, wenn du den{" "}
        <strong className="font-medium text-slate-800">Forschungsstand zu einem klar abgegrenzten Thema</strong>{" "}
        systematisch, nachvollziehbar und reproduzierbar erfassen willst — mit transparenter Suche, definierten
        Kriterien und dokumentierter Studienauswahl.
      </p>

      <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50/80 p-3 text-sm text-slate-800">
        <p className="mb-2 font-medium text-slate-900">Kurz prüfen</p>
        <ol className="list-decimal space-y-1.5 pl-4 text-slate-700">
          <li>Möchtest du den Forschungsstand zu einem klar abgegrenzten Thema systematisch erfassen?</li>
          <li>
            <span className="font-medium">Wenn ja:</span> Gibt es ausreichend wissenschaftliche Literatur, und kannst
            du Suche, Datenbanken und Auswahlkriterien transparent dokumentieren?
          </li>
          <li>
            <span className="font-medium">Dann:</span> Eine SLR ist wahrscheinlich geeignet — arbeite die Schritte in
            diesem Tool der Reihe nach ab.
          </li>
          <li>
            <span className="font-medium">Wenn nein / unsicher:</span> Alternativen sind z. B.{" "}
            <em>explorative Recherche</em>, <em>narrative Literaturübersicht</em> oder <em>Scoping Review</em> — spreche
            die Wahl mit deiner Betreuung ab.
          </li>
        </ol>
      </div>

      <div className="mb-3 flex flex-wrap items-center justify-center gap-2 text-xs sm:gap-3">
        <div className="rounded-md border border-indigo-200 bg-indigo-50 px-2.5 py-1.5 text-center text-slate-800">
          Start: klar abgegrenztes Thema?
        </div>
        <span className="text-slate-400" aria-hidden>
          →
        </span>
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-center text-slate-800">
          Ja: genug Literatur + dokumentierbar?
        </div>
        <span className="text-slate-400" aria-hidden>
          →
        </span>
        <div className="rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-center text-slate-800">
          SLR wahrscheinlich sinnvoll
        </div>
      </div>

      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">Mini-Checkliste</p>
      <ul className="grid gap-1.5 text-sm text-slate-700 sm:grid-cols-2">
        <li className="flex gap-2">
          <span className="text-indigo-500">○</span>
          Thema und Zielgruppe / Kontext sind benennbar
        </li>
        <li className="flex gap-2">
          <span className="text-indigo-500">○</span>
          Erwartung an belastbare, vergleichbare Quellen
        </li>
        <li className="flex gap-2">
          <span className="text-indigo-500">○</span>
          Suchstrings und Kriterien sind dokumentierbar
        </li>
        <li className="flex gap-2">
          <span className="text-indigo-500">○</span>
          Zeitraum und Sprache sind absteckbar
        </li>
        <li className="flex gap-2 sm:col-span-2">
          <span className="text-indigo-500">○</span>
          Der zeitliche Aufwand für Screening und Extraktion ist eingeplant
        </li>
      </ul>
    </SectionCard>
  );
}
