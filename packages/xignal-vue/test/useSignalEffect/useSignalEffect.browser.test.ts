import * as vt from "vitest";

import { expectGetElementToBeInTheDocument } from "@private/tests/browser";
import "@private/tests/styles";

import { mount } from "~/test/utils";

import Component from "./Component.vue";
import * as module from "./module";
import * as nonComponent from "./non-component";
import nonComponentSetup from "./non-component-setup";

vt.describe("useSignalEffect", () => {
	vt.it("should work", async () => {
		const clean = mount(Component);

		const button = await expectGetElementToBeInTheDocument((page) => page.getByText("click"));

		await vt.vi.waitFor(() => {
			vt.expect(module.fnEffect).toHaveBeenCalledOnce();
			vt.expect(module.fnEffectCleanup).not.toHaveBeenCalled();
		});

		module.count.set(1);

		await vt.vi.waitFor(() => {
			vt.expect(module.fnEffect).toHaveBeenCalledTimes(2);
			vt.expect(module.fnEffectCleanup).toHaveBeenCalledOnce();
		});

		(button.element() as HTMLButtonElement).click();

		await vt.vi.waitFor(() => {
			vt.expect(module.fnEffect).toHaveBeenCalledTimes(3);
			vt.expect(module.fnEffectCleanup).toHaveBeenCalledTimes(2);
		});

		clean();

		await vt.vi.waitFor(() => {
			vt.expect(module.fnEffect).toHaveBeenCalledTimes(3);
			vt.expect(module.fnEffectCleanup).toHaveBeenCalledTimes(3);
		});
	});

	vt.describe("non-component", () => {
		vt.it("should work", async () => {
			const stop = nonComponentSetup();

			await vt.vi.waitFor(() => {
				vt.expect(nonComponent.fnEffect).toHaveBeenCalledOnce();
				vt.expect(nonComponent.fnEffectCleanup).not.toHaveBeenCalled();
			});

			nonComponent.count.set(1);

			await vt.vi.waitFor(() => {
				vt.expect(nonComponent.fnEffect).toHaveBeenCalledTimes(2);
				vt.expect(nonComponent.fnEffectCleanup).toHaveBeenCalledOnce();
			});

			stop();

			await vt.vi.waitFor(() => {
				vt.expect(nonComponent.fnEffect).toHaveBeenCalledTimes(2);
				vt.expect(nonComponent.fnEffectCleanup).toHaveBeenCalledTimes(2);
			});
		});
	});
});
