import { defineConfig, mergeConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import baseConfig from "./vite.config.js";

/**
 * Ein-Bündel-HTML (JS/CSS inline) für Versand und Öffnen per file://.
 * Standard-Build: weiter mit `vite.config.js` / `npm run build`.
 */
export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [
      viteSingleFile({
        useRecommendedBuildConfig: true,
        removeViteModuleLoader: true,
        deleteInlinedFiles: true,
      }),
    ],
    build: {
      outDir: "dist-single",
      emptyOutDir: true,
      cssCodeSplit: false,
      assetsInlineLimit: Number.MAX_SAFE_INTEGER,
      chunkSizeWarningLimit: 10000000,
      rollupOptions: {
        output: {
          inlineDynamicImports: true,
        },
      },
    },
  })
);
