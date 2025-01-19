import { defineConfig } from "tsup"
import tsupConfig from "@repo/typescript-config/tsup.json" with { type: "json" }

export default defineConfig({
  ...tsupConfig,

  // Ensure we preserve path aliases during build
  esbuildOptions(options) {
    options.alias = {
      "@": "./src"
    }
  }
})
