import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		workspace: ["packages/*/vitest.config.ts"],
		pool: "threads",
		testTimeout: 10000,
	},
});
