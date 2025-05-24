import { defineConfig } from "tsdown";

export const define = (entry: string[]) => {
	return defineConfig({
		entry,
		format: "esm",
		target: "esnext",
		platform: "neutral",
		minify: false,
		dts: {
			isolatedDeclarations: true,
		},
		clean: true,
		publint: true,
		unbundle: true,
	});
};
