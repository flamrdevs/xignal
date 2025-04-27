import { defineProject } from "vitest/config";

import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";

import { custom } from "tests/config";

const config = custom(__dirname, { browser: true });

export default defineProject({
	define: {
		...config.define,
	},
	plugins: [svelte({ preprocess: vitePreprocess() })],
	test: {
		include: ["test/**/*.spec.ts"],
		...config.test,
	},
});
