import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		projects: [
			"packages/*/vitest.config.ts",
			{
				test: {
					include: ["packages/*/test/**/*.node.test.ts"],
					name: "node",
					environment: "node",
				},
			},
		],
		pool: "threads",
		testTimeout: 10000,
	},
});
