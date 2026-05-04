import { useCallback, useId, useRef, useState } from "react";
import SectionCard from "./SectionCard";
import UploadedDiagramPreview from "./UploadedDiagramPreview";
import { useWorkshop } from "../context/WorkshopContext";
import {
  createPrismaDiagramAsset,
  formatMaxSizeLabel,
  isPngDataUrl,
  readFileAsDataURL,
  validatePrismaDiagramFile,
} from "../lib/prismaDiagramAsset";

const btnDanger =
  "inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-900 hover:bg-red-100";

export default function PrismaDiagramImportCard() {
  const id = useId();
  const inputRef = useRef(null);
  const { state, updateSearchStrategy } = useWorkshop();
  const asset = state.searchStrategy.prismaDiagramAsset ?? null;

  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");

  const clearFileInput = useCallback(() => {
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  const handleRemove = useCallback(() => {
    setError(null);
    clearFileInput();
    updateSearchStrategy({ prismaDiagramAsset: null });
  }, [clearFileInput, updateSearchStrategy]);

  const handleFile = useCallback(
    async (fileList) => {
      setError(null);
      const file = fileList?.[0];
      const v = validatePrismaDiagramFile(file);
      if (!v.ok) {
        setError(v.message);
        clearFileInput();
        return;
      }
      setStatus("loading");
      try {
        const dataUrl = await readFileAsDataURL(file);
        if (!isPngDataUrl(dataUrl)) {
          setError("Die Datei ist kein gültiges PNG (Inhalt passt nicht zu PNG/Base64).");
          clearFileInput();
          return;
        }
        updateSearchStrategy({
          prismaDiagramAsset: createPrismaDiagramAsset(file, dataUrl),
        });
      } catch {
        setError("Die Datei konnte nicht gelesen werden. Bitte erneut versuchen.");
        clearFileInput();
      } finally {
        setStatus("idle");
      }
    },
    [clearFileInput, updateSearchStrategy]
  );

  return (
    <SectionCard title="PRISMA-Diagramm hochladen">
      <div className="space-y-3 text-sm text-slate-700">
        <p className="text-xs leading-relaxed text-slate-600">
          Lade hier das <strong>exportierte Diagramm</strong> aus dem externen PRISMA-Tool hoch (z. B. PNG-Export).
          Es erscheint in der Ergebnisübersicht und im Druck/PDF-Export des Berichts. Aktuell:{" "}
          <strong>PNG</strong>, max. {formatMaxSizeLabel()} (wegen Browser-Speicher).
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={inputRef}
            id={id}
            type="file"
            accept="image/png,.png"
            className="sr-only"
            disabled={status === "loading"}
            onChange={(e) => {
              handleFile(e.target.files);
            }}
          />
          <label
            htmlFor={id}
            className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-medium text-indigo-900 hover:bg-indigo-100"
          >
            {status === "loading" ? "Wird geladen…" : asset ? "Diagramm ersetzen…" : "PNG auswählen…"}
          </label>
          {asset ? (
            <button type="button" className={btnDanger} onClick={handleRemove}>
              Entfernen
            </button>
          ) : null}
        </div>

        {error ? (
          <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-950" role="alert">
            {error}
          </p>
        ) : null}

        {asset ? (
          <div className="border-t border-slate-200 pt-3">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">Vorschau</p>
            <UploadedDiagramPreview asset={asset} variant="editor" />
          </div>
        ) : (
          <p className="text-xs italic text-slate-500">Noch kein Diagramm hinterlegt.</p>
        )}
      </div>
    </SectionCard>
  );
}
