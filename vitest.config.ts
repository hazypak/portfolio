import { defineConfig } from "vitest/config";

// Separate from vite.config.ts, whose root is client/ — tests cover the API layer.
export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    environment: "node",
  },
});
