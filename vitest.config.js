// vitest.config.js
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["tests/**/*.test.js"],
    coverage: {
      include: ["src/**/*.js"],
    },
  },
});
