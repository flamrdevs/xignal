import { defineProject } from "vitest/config";

import vue from "@vitejs/plugin-vue";

import { custom } from "@private/tests/config";

const config = custom(__dirname, { browser: true });

export default defineProject({
	define: {
		...config.define,
	},
	plugins: [vue()],
	test: {
		include: ["test/**/*.spec.ts"],
		...config.test,
	},
});
