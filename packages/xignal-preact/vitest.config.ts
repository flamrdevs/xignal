import { defineProject } from "vitest/config";

import preact from "@preact/preset-vite";

import { custom } from "@private/tests/config";

const config = custom(__dirname);

export default defineProject({
	define: {
		...config.define,
	},
	plugins: [config.plugins, preact()],
	test: {
		include: ["test/**/*.browser.test.tsx"],
		...config.test,
	},
});
