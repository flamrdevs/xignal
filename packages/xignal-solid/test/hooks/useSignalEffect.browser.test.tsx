import * as vt from "vitest";

import { createRoot, createSignal } from "solid-js";

import { expectGetElementToBeInTheDocument } from "@private/tests/browser";
import "@private/tests/styles";

import * as xignal from "xignal";
import { useSignalEffect } from "@xignal/solid";

import { render } from "~/test/utils";

const count = xignal.state(0);

const fnEffect = vt.vi.fn();
const fnEffectCleanup = vt.vi.fn();

const Component = () => {
	const [local, setLocal] = createSignal(0);

	useSignalEffect(() => {
		fnEffect(count.get(), local());
		return fnEffectCleanup;
	});

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
		const clean = render(() => <Component />);

		const button = await expectGetElementToBeInTheDocument((page) => page.getByText("click"));

		await vt.vi.waitFor(() => {
			vt.expect(fnEffect).toHaveBeenCalledOnce();
			vt.expect(fnEffectCleanup).not.toHaveBeenCalled();
		});

		count.set(1);

		await vt.vi.waitFor(() => {
			vt.expect(fnEffect).toHaveBeenCalledTimes(2);
			vt.expect(fnEffectCleanup).toHaveBeenCalledOnce();
		});

		(button.element() as HTMLButtonElement).click();

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

	vt.describe("non-component", () => {
		vt.it("should work", async () => {
			const count = xignal.state(0);

			const fnEffect = vt.vi.fn();
			const fnEffectCleanup = vt.vi.fn();

			const dispose = createRoot((dispose) => {
				useSignalEffect(() => {
					fnEffect(count.get());
					return fnEffectCleanup;
				});

				return dispose;
			});

			await vt.vi.waitFor(() => {
				vt.expect(fnEffect).toHaveBeenCalledOnce();
				vt.expect(fnEffectCleanup).not.toHaveBeenCalled();
			});

			count.set(1);

			await vt.vi.waitFor(() => {
				vt.expect(fnEffect).toHaveBeenCalledTimes(2);
				vt.expect(fnEffectCleanup).toHaveBeenCalledOnce();
			});

			dispose();

			await vt.vi.waitFor(() => {
				vt.expect(fnEffect).toHaveBeenCalledTimes(2);
				vt.expect(fnEffectCleanup).toHaveBeenCalledTimes(2);
			});
		});
	});
});
