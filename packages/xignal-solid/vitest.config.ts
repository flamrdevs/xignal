import { defineProject } from "vitest/config";

import solid from "vite-plugin-solid";

import { custom } from "tests/config";

const config = custom(__dirname, { browser: true });

export default defineProject({
	define: {
		...config.define,
	},
	plugins: [solid()],
	test: {
		include: ["test/**/*.spec.tsx"],
		...config.test,
	},
});
