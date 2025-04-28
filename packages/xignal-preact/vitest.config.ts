import { defineProject } from "vitest/config";

import preact from "@preact/preset-vite";

import { custom } from "@private/tests/config";

const config = custom(__dirname, { browser: true });

export default defineProject({
	define: {
		...config.define,
	},
	plugins: [preact()],
	test: {
		include: ["test/**/*.spec.tsx"],
		...config.test,
	},
});
