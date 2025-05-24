import path from "node:path";

import { defineConfig, passthroughImageService } from "astro/config";

import preact from "@astrojs/preact";
import react from "@astrojs/react";
import solid from "@astrojs/solid-js";
import svelte, { vitePreprocess } from "@astrojs/svelte";
import vue from "@astrojs/vue";

import tailwindcss from "@tailwindcss/vite";

import { build } from "tsdown";

await build({ config: false, cwd: path.resolve(process.cwd(), "src/theme/sync"), entry: "src/index.ts" });

export default defineConfig({
	integrations: [
		solid({ include: ["**/*.solid.tsx"] }),
		preact({ include: ["**/*.preact.tsx"] }),
		react({ include: ["**/*.react.tsx"] }),
		svelte({ preprocess: vitePreprocess() }),
		vue(),
	],
	image: {
		service: passthroughImageService(),
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
