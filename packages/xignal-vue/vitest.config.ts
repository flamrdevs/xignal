import { defineProject } from "vitest/config";

import vue from "@vitejs/plugin-vue";

import { custom } from "@private/tests/config";

const config = custom(__dirname);

export default defineProject({
	define: {
		...config.define,
	},
	plugins: [config.plugins, vue()],
	test: {
		include: ["test/**/*.browser.test.ts"],
		...config.test,
	},
});
