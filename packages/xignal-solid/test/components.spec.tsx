import * as vt from "vitest";

import { delay } from "es-toolkit/promise";

import { expectGetElementToBeInTheDocument } from "@private/tests/browser";
import { cleanupable } from "@private/tests/utils";

import { signal } from "xignal";
import { Show } from "@xignal/solid";

import { render } from "~/test/utils";

const cleanup = cleanupable();

vt.beforeEach(() => {
	cleanup();
});

vt.describe("Show", () => {
	vt.it("should work", async () => {
		const when = signal<unknown>();

		cleanup(
			render(() => (
				<Show when={when} fallback="fallback">
					children
				</Show>
			)),
		);

		const expectText = async (text: string) => {
			__VITEST_BROWSER_HEADLESS_DISABLED_AND_UI_ENABLED__ && (await delay(500));
			await expectGetElementToBeInTheDocument((page) => page.getByText(text));
		};
		const expectFallback = () => expectText("fallback");
		const expectChildren = () => expectText("children");
		const expectFallbackWhen = async (set?: unknown) => {
			when.set(set);
			await expectFallback();
		};

		const expectChildrenWhen = async (set?: unknown) => {
			when.set(set);
			await expectChildren();
		};

		await expectFallback();
		await expectChildrenWhen(true);
		await expectFallbackWhen(false);
		await expectChildrenWhen(1);
		await expectFallbackWhen(0);
		await expectChildrenWhen("string");
		await expectFallbackWhen("");
		await expectChildrenWhen({ key: "value" });
		await expectFallbackWhen(null);
		await expectChildrenWhen(["element"]);
		await expectFallbackWhen(undefined);
	});
});
