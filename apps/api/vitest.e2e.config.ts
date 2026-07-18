import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["test/**/*.e2e-spec.ts"],
    exclude: ["dist/**", "src/generated/**", "coverage/**"],
    clearMocks: true,
    restoreMocks: true,
    hookTimeout: 30_000,
  },
});
