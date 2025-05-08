import * as vt from "vitest";

import { expectGetElementToBeInTheDocument } from "@private/tests/browser";
import "@private/tests/styles";

import { mount } from "~/test/utils";

import { global, fnEffect, fnEffectCleanup } from "./module";
import Component from "./Component.vue";

vt.describe("useSignalEffect", () => {
	vt.it("should work", async () => {
		const clean = mount(Component);

		const button = await expectGetElementToBeInTheDocument((page) => page.getByText("click"));

		await vt.vi.waitFor(() => {
			vt.expect(fnEffect).toHaveBeenCalledOnce();
			vt.expect(fnEffectCleanup).not.toHaveBeenCalled();
		});

		global.set(1);

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
