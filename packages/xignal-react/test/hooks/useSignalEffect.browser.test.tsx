import * as vt from "vitest";

import { act, useState } from "react";

import { expectGetElementToBeInTheDocument } from "@private/tests/browser";
import "@private/tests/styles";

import { useSignalEffect } from "@xignal/react";
import * as xignal from "xignal";

import { render } from "~/test/utils";

const count = xignal.state(0);

const fnEffect = vt.vi.fn();
const fnEffectCleanup = vt.vi.fn();

const Component = () => {
	const [local, setLocal] = useState(0);

	useSignalEffect(() => {
		fnEffect(count.get(), local);
		return fnEffectCleanup;
	}, [local]);

	return (
		<button
			type="button"
			onClick={() => {
				setLocal((n) => n + 1);
			}}
		>
			click
		</button>
	);
};

vt.describe("useSignalEffect", () => {
	vt.it("should work", async () => {
		const clean = render(<Component />);

		const button = await expectGetElementToBeInTheDocument((page) => page.getByText("click"));

		await vt.vi.waitFor(() => {
			vt.expect(fnEffect).toHaveBeenCalledOnce();
			vt.expect(fnEffectCleanup).not.toHaveBeenCalled();
		});

		act(() => {
			count.set(1);
		});

		await vt.vi.waitFor(() => {
			vt.expect(fnEffect).toHaveBeenCalledTimes(2);
			vt.expect(fnEffectCleanup).toHaveBeenCalledOnce();
		});

		act(() => {
			(button.element() as HTMLButtonElement).click();
		});

		await vt.vi.waitFor(() => {
			vt.expect(fnEffect).toHaveBeenCalledTimes(3);
			vt.expect(fnEffectCleanup).toHaveBeenCalledTimes(2);
		});

		clean();

		await vt.vi.waitFor(() => {
			vt.expect(fnEffect).toHaveBeenCalledTimes(3);
			vt.expect(fnEffectCleanup).toHaveBeenCalledTimes(3);
		});
	});
});
