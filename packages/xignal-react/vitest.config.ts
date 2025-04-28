import { defineProject } from "vitest/config";

import react from "@vitejs/plugin-react";

import { custom } from "@private/tests/config";

const config = custom(__dirname, { browser: true });

export default defineProject({
	define: {
		...config.define,
	},
	plugins: [react()],
	test: {
		include: ["test/**/*.spec.tsx"],
		...config.test,
	},
});
