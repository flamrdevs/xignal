import fs from "node:fs";
import path from "node:path";

import type { ViteUserConfig } from "vitest/config";

export const custom = (
	__dirname: string,
	{
		browser,
	}: {
		/**
		 * enable browser mode
		 */
		browser?: boolean;
	} = {},
) => {
	const { name } = JSON.parse(fs.readFileSync(path.resolve(__dirname, "package.json"), "utf-8")) as {
		name: string;
	};

	const __VITEST_BROWSER_HEADLESS_ENABLED__ = !!process.env.VITEST_BROWSER_HEADLESS;

	const __VITEST_UI_ENABLED_ = !!process.env.VITEST_UI;

	const __VITEST_BROWSER_HEADLESS_DISABLED_AND_UI_ENABLED__ =
		!__VITEST_BROWSER_HEADLESS_ENABLED__ && __VITEST_UI_ENABLED_;

	return {
		define: {
			__VITEST_BROWSER_HEADLESS_ENABLED__,
			__VITEST_UI_ENABLED_,
			__VITEST_BROWSER_HEADLESS_DISABLED_AND_UI_ENABLED__,
		},
		test: {
			name,
			...(browser && {
				browser: {
					enabled: true,
					provider: "playwright",
					headless: __VITEST_BROWSER_HEADLESS_ENABLED__,
					instances: [{ browser: "chromium" }],
				},
			}),
		},
	} satisfies ViteUserConfig;
};
