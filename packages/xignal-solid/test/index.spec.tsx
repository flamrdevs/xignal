import * as vt from "vitest";

import { delay } from "es-toolkit/promise";

import { expectGetElementsToBeInTheDocument } from "@private/tests/browser";
import { initCSSRuntimeCounter } from "@private/tests/ui";
import { cleanupable } from "@private/tests/utils";

import { render } from "~/test/utils";

import * as counterState from "./counter.state";
import Counter from "./Counter";

const cleanup = cleanupable();

vt.beforeEach(() => {
	cleanup();
});

vt.describe("Counter", () => {
	vt.it("should work", async () => {
		__VITEST_BROWSER_HEADLESS_DISABLED_AND_UI_ENABLED__ && cleanup(initCSSRuntimeCounter());

		cleanup(render(() => <Counter />));

		await expectGetElementsToBeInTheDocument((page) => [page.getByText("count 0"), page.getByText("doubled 0")]);

		__VITEST_BROWSER_HEADLESS_DISABLED_AND_UI_ENABLED__ && (await delay(1000));

		counterState.count.set(1);

		await expectGetElementsToBeInTheDocument((page) => [page.getByText("count 1"), page.getByText("doubled 2")]);

		__VITEST_BROWSER_HEADLESS_DISABLED_AND_UI_ENABLED__ && (await delay(1000));

		counterState.count.set(2);

		await expectGetElementsToBeInTheDocument((page) => [page.getByText("count 2"), page.getByText("doubled 4")]);
	});
});
