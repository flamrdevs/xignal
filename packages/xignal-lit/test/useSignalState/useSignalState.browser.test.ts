import * as vt from "vitest";

import { expectGetElementToBeInTheDocument } from "@private/tests/browser";
import "@private/tests/styles";

import { render } from "~/test/utils";

import { count, tagName } from "./Component";

vt.describe("UseSignalState", () => {
	vt.it("should work", async () => {
		render(tagName);

		const getButton = (count: unknown) =>
			expectGetElementToBeInTheDocument((page) => page.getByText(`click : ${count}`));

		let button = await getButton("0");

		count.set(1);

		button = await getButton("1");

		(button.element() as HTMLButtonElement).click();

		button = await getButton("2");
	});
});
