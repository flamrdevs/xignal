import * as vt from "vitest";

import { useState } from "preact/hooks";

import { expectGetElementToBeInTheDocument } from "@private/tests/browser";
import { cleanupable } from "@private/tests/utils";
import "@private/tests/styles";

import { signal } from "xignal";
import { useSignalEffect } from "@xignal/preact";

import { render } from "~/test/utils";

const cleanup = cleanupable();

vt.beforeEach(() => {
	cleanup();
});

vt.describe("useSignalEffect", () => {
	vt.it("should work", async () => {
		const state = signal(0);

		const fnEffect = vt.vi.fn();
		const fnEffectCleanup = vt.vi.fn();

		const App = () => {
			const [appState, setAppState] = useState(0);

			useSignalEffect(() => {
				fnEffect(state.get(), appState);
				return fnEffectCleanup;
			}, [appState]);

			return (
				<button
					type="button"
					onClick={() => {
						setAppState((n) => n + 1);
					}}
				>
					click
				</button>
			);
		};

		const clean = render(<App />);

		cleanup(clean);

		const button = await expectGetElementToBeInTheDocument((page) => page.getByText("click"));

		await vt.vi.waitFor(() => {
			vt.expect(fnEffect).toHaveBeenCalledOnce();
			vt.expect(fnEffectCleanup).not.toHaveBeenCalled();
		});

		state.set(1);

		vt.expect(fnEffect).toHaveBeenCalledTimes(2);
		vt.expect(fnEffectCleanup).toHaveBeenCalledOnce();

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
});
