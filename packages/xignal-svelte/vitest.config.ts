import { defineProject } from "vitest/config";

import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";

import { custom } from "@private/tests/config";

const config = custom(__dirname);

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
