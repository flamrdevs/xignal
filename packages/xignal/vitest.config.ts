import { defineProject } from "vitest/config";

import { custom } from "@private/tests/config";

const config = custom(__dirname);

export default defineProject({
	define: {
		...config.define,
	},
	test: {
		environment: "node",
		include: ["test/**/*.test.ts"],
		benchmark: {
			include: ["test/**/*.bench.ts"],
		},
		...config.test,
	},
});
