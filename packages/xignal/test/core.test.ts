import * as vt from "vitest";

import { signal, computed, effect } from "xignal";

vt.describe("core", () => {
	vt.it("should work", async () => {
		const _signal = signal();

		const computedFn = vt.vi.fn(() => _signal.get());

		const _computed = computed(computedFn);

		const effectFn = vt.vi.fn(() => {
			_computed.get();
		});

		const _stopEffect = effect(effectFn);

		const expectValues = (cb: (assertion: vt.Assertion) => unknown) => {
			cb(vt.expect(_signal.get()));
			cb(vt.expect(_computed.get()));
		};
		const expectCalledTimes = (computedTimes: number, effectTimes: number) => {
			vt.expect(computedFn).toHaveBeenCalledTimes(computedTimes);
			vt.expect(effectFn).toHaveBeenCalledTimes(effectTimes);
		};

		expectValues((t) => t.toBeUndefined());
		expectCalledTimes(1, 1);

		_signal.set(0);

		expectValues((t) => t.toBe(0));
		expectCalledTimes(2, 2);

		_signal.set("1");

		expectValues((t) => t.toBe("1"));
		expectCalledTimes(3, 3);

		_signal.set(true);

		expectValues((t) => t.toBe(true));
		expectCalledTimes(4, 4);

		_signal.set({});

		expectValues((t) => t.toEqual({}));
		expectCalledTimes(5, 5);

		_signal.set([]);

		expectValues((t) => t.toEqual([]));
		expectCalledTimes(6, 6);

		_signal.set(new Error());

		expectValues((t) => t.instanceOf(Error));
		expectCalledTimes(7, 7);

		_signal.set(null);

		expectValues((t) => t.toBe(null));
		expectCalledTimes(8, 8);

		_signal.set(undefined);

		expectValues((t) => t.toBe(undefined));
		expectCalledTimes(9, 9);

		_stopEffect();

		_signal.set(0);

		expectValues((t) => t.toBe(0));
		expectCalledTimes(10, 9);

		_signal.set(1);

		expectValues((t) => t.toBe(1));
		expectCalledTimes(11, 9);
	});
});
