import { defineProject } from "vitest/config";

import { custom } from "@private/tests/config";

const config = custom(__dirname);

export default defineProject({
	define: {
		...config.define,
	},
	test: {
		include: ["test/**/*.test.ts"],
		...config.test,
	},
});
