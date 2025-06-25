import * as vt from "vitest";

import { act } from "react";

import { expectGetElementToBeInTheDocument } from "@private/tests/browser";
import "@private/tests/styles";

import * as xignal from "xignal";
import { useSignalState } from "@xignal/react";

import { render } from "~/test/utils";

const count = xignal.state(0);

const Component = () => {
	const [countValue, countUpdate] = useSignalState(count);

	return (
		<button
			type="button"
			onClick={() => {
				countUpdate((n) => n + 1);
			}}
		>
			click : {countValue}
		</button>
	);
};

vt.describe("useSignalState", () => {
	vt.it("should work", async () => {
		render(<Component />);

		const getButton = (count: unknown) =>
			expectGetElementToBeInTheDocument((page) => page.getByText(`click : ${count}`));

		let button = await getButton("0");

		act(() => {
			count.set(1);
		});

		button = await getButton("1");

		act(() => {
			(button.element() as HTMLButtonElement).click();
		});

		button = await getButton("2");
	});
});
