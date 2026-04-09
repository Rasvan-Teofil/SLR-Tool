# Forschungsmatrix – Vercel Ready

## Lokal starten
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Deployment auf Vercel
1. Dieses Projekt zu GitHub hochladen
2. In Vercel `Add New Project` wählen
3. GitHub-Repo importieren
4. Framework erkennt Vercel automatisch als `Vite`
5. Auf `Deploy` klicken

## Wichtige Info
Die Daten werden im Browser über `localStorage` gespeichert.
Das bedeutet:
- jeder Nutzer hat seinen eigenen lokalen Stand
- auf einem anderen Gerät sind die Daten nicht automatisch da
- für gemeinsames Arbeiten bräuchte man später ein Backend / Datenbank