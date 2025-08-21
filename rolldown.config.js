import { defineConfig } from "rolldown";

export default defineConfig([
  {
    input: "src/index.js",
    output: {
      file: "dist/index.mjs",
      format: "esm",
    },
    external: ["luxon"],
  },
  {
    input: "src/index.js",
    output: {
      file: "dist/index.cjs",
      format: "cjs",
    },
    external: ["luxon"],
  },
]);
