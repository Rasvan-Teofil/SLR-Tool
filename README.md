# ReviewKompass — SLR-Begleiter

Mehrseitige Webanwendung als **Begleiter für systematische Literaturrecherche** (z. B. Masterarbeit): Forschungsfrage, Suchstrategie (inkl. PRISMA-orientierter Felder), Konzeptmatrix nach Webster & Watson, Synthese, **Ressourcen & Tools** und eine **Ergebnisübersicht** mit lesbarer Konzeptmatrix zum Export (PDF über den Browser-Druckdialog).

Produktname und Claim sind in [`src/config/brand.js`](src/config/brand.js) zentral gepflegt; das HTML-`<title>` in [`index.html`](index.html) sollte bei Umbenennung mitgezogen werden.

Stack: **React 18**, **Vite**, **Tailwind CSS v4**, **React Router**, reines Frontend (geeignet für **Vercel Hobby**).

## Projektstruktur

```
src/
  App.jsx
  main.jsx
  styles.css
  config/
    brand.js              # Produktname, Claim, Monogramm
    toolsConfig.js        # KI-Schnellzugriffe je Arbeitsschritt (1–4)
    resourcesPage.js     # Inhalt Seite „Ressourcen & Tools“
  constants/
    workshopSteps.js       # Schritt-Definitionen & Pfade (5 Prozessschritte + Ressourcen ohne Nummer)
  context/
    WorkshopContext.jsx   # Globaler State, localStorage
  layout/
    AppLayout.jsx
  lib/
    conceptMatrix.js
  components/
    …
    BrandMark.jsx
    PageToolGrid.jsx
    ConceptMatrixReadOnlyTable.jsx
  pages/
    …
    ResourcesPage.jsx
    DashboardPage.jsx
vercel.json
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

- Anwendungsdaten werden unter **`slr-workshop-state-v1`** gespeichert (technischer Schlüsselname, unabhängig vom Produktnamen).
- **Gerätelokal:** kein automatischer Abgleich zwischen Browsern oder Rechnern.
- Ältere reine Matrix-Daten (`forschungsthema-matrix-data-v1`) werden beim **ersten Start** migriert, sofern noch kein neuer Speicher existiert.

## PDF-Export / Druck

- Auf der **Ergebnisübersicht**: Button **„Als PDF speichern (Druckdialog)“** ruft `window.print()` auf.
- Im Druckdialog **„Als PDF speichern“** / **Microsoft Print to PDF** wählen.

## Deployment auf Vercel

1. Repository zu **GitHub** pushen.
2. In Vercel **Add New Project** → Repo auswählen.
3. Framework: **Vite**, Build: `npm run build`, Output: `dist`.
4. [`vercel.json`](vercel.json) für SPA-Deep-Links.

Ohne Backend, ohne Vercel Postgres.

## Routen

| Pfad             | Inhalt                    |
|------------------|---------------------------|
| `/`              | Forschungsfrage           |
| `/suchstrategie` | Suchstrategie / PRISMA    |
| `/konzeptmatrix` | Konzeptmatrix             |
| `/synthese`      | Synthese                  |
| `/ressourcen`    | Ressourcen & Tools        |
| `/dashboard`     | Ergebnisübersicht / Report |

## Hinweise

Inhalte und Methodik (Webster & Watson, PRISMA-Felder) dienen der strukturierten Arbeit; kein Ersatz für offizielle PRISMA-Reporting-Pflichten oder Prüfungsvorgaben Ihrer Hochschule.
