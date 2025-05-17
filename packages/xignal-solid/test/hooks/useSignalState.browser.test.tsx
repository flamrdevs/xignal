import * as vt from "vitest";

import { expectGetElementToBeInTheDocument } from "@private/tests/browser";
import "@private/tests/styles";

import * as xignal from "xignal";
import { useSignalState } from "@xignal/solid";

import { render } from "~/test/utils";

const global = xignal.state(0);

const Component = () => {
	const [globalValue, globalUpdate] = useSignalState(global);

	return (
		<button
			type="button"
			onClick={() => {
				globalUpdate((n) => n + 1);
			}}
		>
			click : {globalValue()}
		</button>
	);
};

vt.describe("useSignalState", () => {
	vt.it("should work", async () => {
		render(() => <Component />);

		const getButton = (global: unknown) =>
			expectGetElementToBeInTheDocument((page) => page.getByText(`click : ${global}`));

		let button = await getButton("0");

		global.set(1);

		button = await getButton("1");

		(button.element() as HTMLButtonElement).click();

		button = await getButton("2");
	});
});
