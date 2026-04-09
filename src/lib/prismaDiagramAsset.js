/**
 * PRISMA diagram upload: validation + helpers (frontend-only, data URL storage).
 * v1: PNG only. Future MIME types listed for messaging / extension without implementing PDF/SVG rendering.
 */

/** Raw file size limit — keeps localStorage JSON roughly manageable (base64 expands ~4/3). */
export const PRISMA_DIAGRAM_MAX_BYTES = Math.floor(1.25 * 1024 * 1024);

export const PRISMA_DIAGRAM_MIME_PNG = "image/png";

/** Reserved for later phases (PDF not embedded in report in v1; SVG possible later). */
export const PRISMA_DIAGRAM_MIME_FUTURE = ["image/svg+xml", "application/pdf"];

export function formatMaxSizeLabel() {
  const mb = (PRISMA_DIAGRAM_MAX_BYTES / (1024 * 1024)).toFixed(1).replace(".0", "");
  return `${mb} MB`;
}

/**
 * @param {File | null | undefined} file
 * @returns {{ ok: true } | { ok: false, message: string }}
 */
export function validatePrismaDiagramFile(file) {
  if (!file || !(file instanceof File)) {
    return { ok: false, message: "Keine Datei ausgewählt." };
  }
  if (file.size > PRISMA_DIAGRAM_MAX_BYTES) {
    return {
      ok: false,
      message: `Die Datei ist zu groß (max. ${formatMaxSizeLabel()}, aktuell ca. ${(file.size / (1024 * 1024)).toFixed(2)} MB). Bitte eine kleinere PNG exportieren oder komprimieren.`,
    };
  }
  const extOk = file.name.toLowerCase().endsWith(".png");
  if (!extOk) {
    return {
      ok: false,
      message:
        "In dieser Version bitte nur PNG-Dateien verwenden (Dateiendung .png, Export aus dem PRISMA-Tool). PDF/HTML können später ergänzt werden.",
    };
  }
  return { ok: true };
}

/**
 * @param {string} dataUrl
 */
export function isPngDataUrl(dataUrl) {
  return typeof dataUrl === "string" && dataUrl.startsWith("data:image/png;base64,");
}

/**
 * @param {File} file
 * @returns {Promise<string>}
 */
export function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("Unerwartetes Leseergebnis."));
    };
    reader.onerror = () => reject(reader.error || new Error("Datei konnte nicht gelesen werden."));
    reader.readAsDataURL(file);
  });
}

/**
 * @param {File} file
 * @param {string} dataUrl
 */
export function createPrismaDiagramAsset(file, dataUrl) {
  return {
    fileName: file.name,
    mimeType: PRISMA_DIAGRAM_MIME_PNG,
    dataUrl,
    uploadedAt: new Date().toISOString(),
  };
}
