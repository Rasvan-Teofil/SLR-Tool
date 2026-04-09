# SLR Workshop-Tool (Forschungsmatrix)

Mehrseitige Workshop-Webanwendung für einen **systematischen Literaturreview-Prozess**: Forschungsfrage, Suchstrategie (inkl. PRISMA-orientierter Felder), Konzeptmatrix nach Webster & Watson, Synthese und eine **Ergebnisübersicht** zum Export (PDF über den Browser-Druckdialog).

Stack: **React 18**, **Vite**, **Tailwind CSS v4**, **React Router**, reines Frontend (geeignet für **Vercel Hobby**).

## Projektstruktur

```
src/
  App.jsx                 # Router & Provider
  main.jsx
  styles.css              # Tailwind + Druck-Styles (@media print)
  constants/
    workshopSteps.js      # Schritt-Definitionen & Pfade
  context/
    WorkshopContext.jsx   # Globaler Workshop-State, localStorage
  layout/
    AppLayout.jsx         # Schritt-Navigation + Outlet
  lib/
    conceptMatrix.js      # Matrix-Hilfsfunktionen (CSV, Abdeckung, Statistik)
  components/
    PageLayout.jsx
    PageHeader.jsx
    StepNavigation.jsx
    SectionCard.jsx
    InfoBox.jsx
    ExportButton.jsx
  pages/
    ResearchQuestionPage.jsx
    SearchStrategyPage.jsx
    ConceptMatrixPage.jsx
    SynthesisPage.jsx
    DashboardPage.jsx     # Report / Ergebnisübersicht
vercel.json               # SPA-Rewrites für Client-Routing
```

## Lokale Nutzung

```bash
npm install
npm run dev
```

Produktions-Build:

```bash
npm run build
npm run preview
```

## Datenhaltung (localStorage)

- Alle Workshop-Daten werden unter dem Schlüssel **`slr-workshop-state-v1`** im Browser gespeichert.
- **Gerätelokal:** kein automatischer Abgleich zwischen Browsern oder Rechnern.
- Bestehende reine Matrix-Daten aus älteren Versionen (`forschungsthema-matrix-data-v1`) werden beim **ersten Start** in den gemeinsamen Staat übernommen, sofern noch kein neuer Schlüssel existiert.

## PDF-Export / Druck

- Auf der Seite **Ergebnisübersicht** (Dashboard): Button **„Als PDF speichern (Druckdialog)“** ruft `window.print()` auf.
- Im Druckdialog des Browsers **„Als PDF speichern“** / **Microsoft Print to PDF** wählen.
- Schritt-Navigation und Steuer-Buttons sind für die Druckansicht ausgeblendet (`print:hidden`).

## Deployment auf Vercel

1. Repository zu **GitHub** pushen.
2. In Vercel **Add New Project** → Repo auswählen.
3. Framework: **Vite** (wird erkannt), Build: `npm run build`, Output: `dist`.
4. [`vercel.json`](vercel.json) stellt sicher, dass **Deep-Links** (z. B. `/dashboard`) auf `index.html` auflösen (SPA).

Es werden **keine** bezahlten Datenbanken oder Vercel Postgres benötigt; die App läuft **ohne Backend**.

## Routen

| Pfad               | Inhalt                |
|--------------------|-----------------------|
| `/`                | Forschungsfrage       |
| `/suchstrategie`   | Suchstrategie / PRISMA-Felder |
| `/konzeptmatrix`   | Konzeptmatrix         |
| `/synthese`        | Synthese              |
| `/dashboard`       | Ergebnisübersicht     |

## Lizenz / Hinweise

Dieses Projekt dient Lehr- und Workshopzwecken. Inhalte der Konzeptmatrix orientieren sich an der gängigen Literaturstruktur (Webster & Watson); PRISMA-Felder dienen der strukturierten Protokollierung ohne Anspruch auf vollständiges PRISMA-Reporting.
