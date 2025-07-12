import * as vt from "vitest";

import { act, useState } from "react";

import { expectGetElementToBeInTheDocument } from "@private/tests/browser";
import "@private/tests/styles";

import * as xignal from "xignal";
import { useSignalComputed } from "@xignal/react";

import { render } from "~/test/utils";

const count = xignal.state(0);

const fnGetter = vt.vi.fn();

const Component = () => {
	const [local, setLocal] = useState(0);

	const computed = useSignalComputed(() => {
		fnGetter();
		return count.get() + local;
	}, [local]);

	return (
		<button
			type="button"
			onClick={() => {
				setLocal((n) => n + 1);
			}}
		>
			click : {`${local}-${computed}`}
		</button>
	);
};

vt.describe("useSignalComputed", () => {
	vt.it("should work", async () => {
		render(<Component />);

		const getButton = (text: unknown) => expectGetElementToBeInTheDocument((page) => page.getByText(`click : ${text}`));

		await vt.vi.waitFor(() => {
			vt.expect(fnGetter).toHaveBeenCalledOnce();
		});

		let button = await getButton("0-0");

		act(() => {
			count.set(1);
		});

		await vt.vi.waitFor(() => {
			vt.expect(fnGetter).toHaveBeenCalledTimes(2);
		});

		button = await getButton("0-1");

		act(() => {
			(button.element() as HTMLButtonElement).click();
		});

		await vt.vi.waitFor(() => {
			vt.expect(fnGetter).toHaveBeenCalledTimes(4);
		});

		button = await getButton("1-2");
	});
});
