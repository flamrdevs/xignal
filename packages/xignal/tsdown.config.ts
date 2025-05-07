import { defineConfig } from "tsdown";

import { config } from "../../tsdown.ts";

export default defineConfig({
	entry: ["src/index.ts", "src/storage/index.ts", "src/standard-schema/index.ts", "src/standard-schema/storage.ts"],
	...config,
});
