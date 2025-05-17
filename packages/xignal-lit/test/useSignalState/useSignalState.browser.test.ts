import * as vt from "vitest";

import { expectGetElementToBeInTheDocument } from "@private/tests/browser";
import "@private/tests/styles";

import { render } from "~/test/utils";

import { global } from "./Component";

vt.describe("useSignalState", () => {
	vt.it("should work", async () => {
		render(document.createElement("component-main"));

		const getButton = (global: unknown) =>
			expectGetElementToBeInTheDocument((page) => page.getByText(`click : ${global}`));

		let button = await getButton("0");

		global.set(1);

		button = await getButton("1");

		(button.element() as HTMLButtonElement).click();

		button = await getButton("2");
	});
});
