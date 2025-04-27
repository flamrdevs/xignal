import type { UserConfig } from "tsdown";

export const config = {
	format: "esm",
	target: "esnext",
	platform: "neutral",
	minify: true,
	dts: {
		isolatedDeclarations: true,
	},
	clean: true,
} satisfies UserConfig;
