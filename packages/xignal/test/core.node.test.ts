import * as vt from "vitest";

import { signal, computed, effect, update, batch, untrack } from "xignal";

vt.describe("core", () => {
	vt.it("should work", () => {
		const _signal = signal();

		const computedGetter = vt.vi.fn(() => _signal.get());

		const _computed = computed(computedGetter);

		const effectFn = vt.vi.fn(() => {
			_computed.get();
		});

		const _stopEffect = effect(effectFn);

		const expectValues = (cb: (assertion: vt.Assertion) => unknown) => {
			cb(vt.expect(_signal.get()));
			cb(vt.expect(_computed.get()));
		};
		const expectCalledTimes = (computedTimes: number, effectTimes: number) => {
			vt.expect(computedGetter).toHaveBeenCalledTimes(computedTimes);
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

	vt.describe("effect cleanup", () => {
		vt.beforeEach(() => {
			vt.vi.useFakeTimers();
		});

		vt.afterEach(() => {
			vt.vi.restoreAllMocks();
		});

		vt.it("should work", () => {
			const ms = signal(1000);

			const timeoutFn = vt.vi.fn();

			const effectFn = vt.vi.fn(() => {
				const timeout = setTimeout(timeoutFn, ms.get());
				return () => {
					clearTimeout(timeout);
				};
			});

			const _stopEffect = effect(effectFn);

			vt.expect(timeoutFn).not.toHaveBeenCalled();
			vt.expect(effectFn).toHaveBeenCalledOnce();

			vt.vi.advanceTimersToNextTimer();

			vt.expect(timeoutFn).toHaveBeenCalledOnce();
			vt.expect(effectFn).toHaveBeenCalledOnce();

			ms.set(2000);

			vt.expect(timeoutFn).toHaveBeenCalledOnce();
			vt.expect(effectFn).toHaveBeenCalledTimes(2);

			vt.vi.advanceTimersToNextTimer();

			vt.expect(timeoutFn).toHaveBeenCalledTimes(2);
			vt.expect(effectFn).toHaveBeenCalledTimes(2);

			ms.set(3000);

			vt.expect(timeoutFn).toHaveBeenCalledTimes(2);
			vt.expect(effectFn).toHaveBeenCalledTimes(3);

			_stopEffect();

			vt.vi.advanceTimersToNextTimer();

			vt.expect(timeoutFn).toHaveBeenCalledTimes(2);
			vt.expect(effectFn).toHaveBeenCalledTimes(3);
		});
	});

	vt.describe("update()", () => {
		vt.it("should work", () => {
			const n = signal(0);

			vt.expect(n.get()).toBe(0);

			let next = update(n, 1);

			vt.expect(n.get()).toBe(1);
			vt.expect(next).toBe(1);

			next = update(n, (n) => n + 1);

			vt.expect(n.get()).toBe(2);
			vt.expect(next).toBe(2);
		});
	});

	vt.describe("batch()", () => {
		vt.it("should work", () => {
			const n1 = signal(0);
			const n2 = signal(0);

			const computedGetter = vt.vi.fn(() => n1.get() + n2.get());

			const c = computed(computedGetter);

			const effectFn = vt.vi.fn(() => {
				n1.get();
				n2.get();
			});

			effect(effectFn);

			vt.expect(c.get()).toBe(0);
			vt.expect(computedGetter).toHaveBeenCalledOnce();
			vt.expect(effectFn).toHaveBeenCalledOnce();

			batch(() => {
				n1.set(1);
				n2.set(-1);
			});

			vt.expect(c.get()).toBe(0);
			vt.expect(computedGetter).toHaveBeenCalledTimes(2);
			vt.expect(effectFn).toHaveBeenCalledTimes(2);

			batch(() => {
				n1.set(10);
				n2.set(10);
			});

			vt.expect(c.get()).toBe(20);
			vt.expect(computedGetter).toHaveBeenCalledTimes(3);
			vt.expect(effectFn).toHaveBeenCalledTimes(3);
		});
	});

	vt.describe("untrack()", () => {
		vt.it("should work", () => {
			const n1 = signal(0);
			const n2 = signal(0);

			const computedGetter = vt.vi.fn(() => untrack(() => n1.get() + n2.get()));

			const c = computed(computedGetter);

			const effectFn = vt.vi.fn(() => {
				untrack(() => {
					n1.get();
					n2.get();
				});
			});

			effect(effectFn);

			vt.expect(c.get()).toBe(0);
			vt.expect(computedGetter).toHaveBeenCalledOnce();
			vt.expect(effectFn).toHaveBeenCalledOnce();

			n1.set(1);
			n2.set(-1);

			vt.expect(c.get()).toBe(0);
			vt.expect(computedGetter).toHaveBeenCalledOnce();
			vt.expect(effectFn).toHaveBeenCalledOnce();

			n1.set(10);
			n2.set(10);

			vt.expect(c.get()).toBe(0);
			vt.expect(computedGetter).toHaveBeenCalledOnce();
			vt.expect(effectFn).toHaveBeenCalledOnce();
		});
	});
});
