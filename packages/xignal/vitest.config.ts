import { defineProject } from "vitest/config";

import { custom } from "@private/tests/config";

const config = custom(__dirname);

export default defineProject({
	define: {
		...config.define,
	},
	plugins: [config.plugins],
	test: {
		include: ["test/**/*.browser.test.ts"],
		...config.test,
	},
});
