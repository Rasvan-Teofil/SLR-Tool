import InfoBox from "./InfoBox";

/** Kompakte Übersicht zu Arten von Forschungslücken (Hilfe beim Ausfüllen). */
export default function ResearchGapsTypesInfo() {
  return (
    <InfoBox title="Arten von Forschungslücken (Orientierung)">
      <ul className="space-y-2 text-sm text-slate-700">
        <li>
          <span className="font-medium text-slate-800">Empirische Lücke:</span> Es fehlen Studien zu bestimmten
          Zielgruppen, Branchen, Ländern, Kontexten oder Zeiträumen.
        </li>
        <li>
          <span className="font-medium text-slate-800">Methodische Lücke:</span> Vorhandene Arbeiten nutzen ähnliche
          Designs; alternative Methoden, Datenquellen oder Analyseverfahren fehlen.
        </li>
        <li>
          <span className="font-medium text-slate-800">Theoretische Lücke:</span> Ein Phänomen ist mit bestimmten
          Theorien noch unzureichend erklärt oder verglichen.
        </li>
        <li>
          <span className="font-medium text-slate-800">Praktische Lücke:</span> Es fehlen belastbare Erkenntnisse zu
          Umsetzung, Wirkung oder Nutzung in realen Anwendungskontexten.
        </li>
        <li>
          <span className="font-medium text-slate-800">Widerspruchslücke:</span> Studien liefern unterschiedliche oder
          widersprüchliche Befunde; Klärungsbedarf bleibt.
        </li>
      </ul>
    </InfoBox>
  );
}
