import * as vt from "vitest";

import { name } from "../package.json";

import { signal, computed, effect } from "xignal";

vt.describe(name, () => {
	vt.it("should work", () => {
		const log = vt.vi.fn();

		const s1 = signal(0);
		const c1 = computed(() => s1.get() * 2);
		const e1 = effect(() => {
			log(s1.get());
		});

		vt.expect(s1.get()).toBe(0);
		vt.expect(c1.get()).toBe(0);
		vt.expect(log).toBeCalled();

		s1.set(1);

		vt.expect(s1.get()).toBe(1);
		vt.expect(c1.get()).toBe(2);
		vt.expect(log).toBeCalledTimes(2);

		s1.set(2);

		vt.expect(s1.get()).toBe(2);
		vt.expect(c1.get()).toBe(4);
		vt.expect(log).toBeCalledTimes(3);

		e1();
		s1.set(3);

		vt.expect(s1.get()).toBe(3);
		vt.expect(c1.get()).toBe(6);
		vt.expect(log).toBeCalledTimes(3);
	});
});
