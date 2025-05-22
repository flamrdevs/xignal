import * as vt from "vitest";

import { expectGetElementToBeInTheDocument } from "@private/tests/browser";
import "@private/tests/styles";

import { mount } from "~/test/utils";

import Component from "./Component.vue";
import { count } from "./module";

vt.describe("useSignalState", () => {
	vt.it("should work", async () => {
		mount(Component);

		const getButton = (count: unknown) =>
			expectGetElementToBeInTheDocument((page) => page.getByText(`click : ${count}`));

		let button = await getButton("0");

		count.set(1);

		button = await getButton("1");

		(button.element() as HTMLButtonElement).click();

		button = await getButton("2");
	});
});
