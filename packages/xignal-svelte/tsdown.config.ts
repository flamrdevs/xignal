import { defineConfig } from "tsdown";

import { config } from "../../tsdown.ts";

export default defineConfig({
	entry: ["src/index.svelte.ts"],
	...config,
});
