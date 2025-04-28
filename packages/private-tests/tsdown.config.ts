import { defineConfig } from "tsdown";
import type { UserConfig } from "tsdown";

const config = {
	format: "esm",
	target: "esnext",
	platform: "neutral",
	minify: true,
	dts: {
		isolatedDeclarations: true,
		resolve: true,
	},
} satisfies UserConfig;

export default defineConfig([
	{
		entry: ["ui/index.ts"],
		outDir: "dist/ui",
		...config,
		clean: false,
	},
]);
