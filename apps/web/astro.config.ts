import path from "node:path";

import { defineConfig, passthroughImageService } from "astro/config";
import preact from "@astrojs/preact";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import svelte, { vitePreprocess } from "@astrojs/svelte";
import vue from "@astrojs/vue";

import tailwindcss from "@tailwindcss/vite";
import { build } from "tsdown";

await build({ config: false, cwd: path.resolve(process.cwd(), "src/theme/sync"), entry: "src/index.ts" });

export default defineConfig({
	site: "https://xignal.pages.dev",
	integrations: [
		solid({ include: ["**/*.solid.tsx"] }),
		preact({ include: ["**/*.preact.tsx"] }),
		react({ include: ["**/*.react.tsx"] }),
		svelte({ preprocess: vitePreprocess() }),
		vue(),
		sitemap(),
	],
	image: {
		service: passthroughImageService(),
	},
	vite: {
		plugins: [tailwindcss()],
	},
	devToolbar: {
		enabled: false,
	},
});
