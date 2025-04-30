import { defineProject } from "vitest/config";

import solid from "vite-plugin-solid";

import { custom } from "@private/tests/config";

const config = custom(__dirname);

export default defineProject({
	define: {
		...config.define,
	},
	plugins: [config.plugins, solid()],
	test: {
		include: ["test/**/*.spec.tsx"],
		...config.test,
	},
});
