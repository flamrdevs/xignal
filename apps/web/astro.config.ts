import { defineConfig, passthroughImageService } from "astro/config";

import preact from "@astrojs/preact";
import react from "@astrojs/react";
import solid from "@astrojs/solid-js";
import svelte, { vitePreprocess } from "@astrojs/svelte";
import vue from "@astrojs/vue";

import tailwindcss from "@tailwindcss/vite";

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
