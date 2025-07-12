import { defineConfig } from "vitest/config";

const packages = "*";

export default defineConfig({
	test: {
		projects: [
			`packages/${packages}/vitest.config.ts`,
			{
				test: {
					include: [`packages/${packages}/test/**/*.node.test.ts`],
					name: "node",
					environment: "node",
				},
			},
		],
		pool: "threads",
		testTimeout: 10000,
	},
});
