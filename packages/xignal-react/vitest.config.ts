import { defineProject } from "vitest/config";

import react from "@vitejs/plugin-react";

import { custom } from "@private/tests/config";

const config = custom(__dirname);

export default defineProject({
	define: {
		...config.define,
	},
	plugins: [config.plugins, react()],
	test: {
		include: ["test/**/*.browser.test.tsx"],
		...config.test,
	},
});
