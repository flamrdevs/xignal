import * as vt from "vitest";

import * as xignal from "xignal";

vt.describe("core", () => {
	vt.it("should work", () => {
		const state = xignal.state();

		const computedGetter = vt.vi.fn(() => state.get());

		const computed = xignal.computed(computedGetter);

		const effectFn = vt.vi.fn(() => {
			computed.get();
		});

		const stopEffect = xignal.effect(effectFn);

		const expectValues = (cb: (assertion: vt.Assertion) => unknown) => {
			cb(vt.expect(state.get()));
			cb(vt.expect(computed.get()));
		};
		const expectCalledTimes = (computedTimes: number, effectTimes: number) => {
			vt.expect(computedGetter).toHaveBeenCalledTimes(computedTimes);
			vt.expect(effectFn).toHaveBeenCalledTimes(effectTimes);
		};

		expectValues((t) => t.toBeUndefined());
		expectCalledTimes(1, 1);

		state.set(0);

		expectValues((t) => t.toBe(0));
		expectCalledTimes(2, 2);

		state.set("1");

		expectValues((t) => t.toBe("1"));
		expectCalledTimes(3, 3);

		state.set(true);

		expectValues((t) => t.toBe(true));
		expectCalledTimes(4, 4);

		state.set({});

		expectValues((t) => t.toEqual({}));
		expectCalledTimes(5, 5);

		state.set([]);

		expectValues((t) => t.toEqual([]));
		expectCalledTimes(6, 6);

		state.set(new Error());

		expectValues((t) => t.instanceOf(Error));
		expectCalledTimes(7, 7);

		state.set(null);

		expectValues((t) => t.toBe(null));
		expectCalledTimes(8, 8);

		state.set(undefined);

		expectValues((t) => t.toBe(undefined));
		expectCalledTimes(9, 9);

		stopEffect();

		state.set(0);

		expectValues((t) => t.toBe(0));
		expectCalledTimes(10, 9);

		state.set(1);

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
			const ms = xignal.state(1000);

			const timeoutFn = vt.vi.fn();

			const effectFn = vt.vi.fn(() => {
				const timeout = setTimeout(timeoutFn, ms.get());
				return () => {
					clearTimeout(timeout);
				};
			});

			const stopEffect = xignal.effect(effectFn);

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

			stopEffect();

			vt.vi.advanceTimersToNextTimer();

			vt.expect(timeoutFn).toHaveBeenCalledTimes(2);
			vt.expect(effectFn).toHaveBeenCalledTimes(3);
		});
	});

	vt.describe("update()", () => {
		vt.it("should work", () => {
			const n = xignal.state(0);
			const fn = xignal.state((a: number, b: number) => a + b);
			let fnGet: ReturnType<typeof fn.get>;

			vt.expect(n.get()).toBe(0);
			fnGet = fn.get();
			vt.expect(fnGet).toBeTypeOf("function");
			vt.expect(fnGet(2, 1)).toBe(3);

			let next = xignal.update(n, 1);
			xignal.update(fn, () => (a, b) => a - b);

			vt.expect(n.get()).toBe(1);
			vt.expect(next).toBe(1);
			fnGet = fn.get();
			vt.expect(fnGet).toBeTypeOf("function");
			vt.expect(fnGet(2, 1)).toBe(1);

			next = xignal.update(n, (n) => n + 1);
			xignal.update(fn, (fn) => (a, b) => fn(a, b) + fn(a, b));

			vt.expect(n.get()).toBe(2);
			vt.expect(next).toBe(2);
			fnGet = fn.get();
			vt.expect(fnGet).toBeTypeOf("function");
			vt.expect(fnGet(2, 1)).toBe(2);
		});
	});

	vt.describe("batch()", () => {
		vt.it("should work", () => {
			const n1 = xignal.state(0);
			const n2 = xignal.state(0);

			const computedGetter = vt.vi.fn(() => n1.get() + n2.get());

			const c = xignal.computed(computedGetter);

			const effectFn = vt.vi.fn(() => {
				n1.get();
				n2.get();
			});

			xignal.effect(effectFn);

			vt.expect(c.get()).toBe(0);
			vt.expect(computedGetter).toHaveBeenCalledOnce();
			vt.expect(effectFn).toHaveBeenCalledOnce();

			xignal.batch(() => {
				n1.set(1);
				n2.set(-1);
			});

			vt.expect(c.get()).toBe(0);
			vt.expect(computedGetter).toHaveBeenCalledTimes(2);
			vt.expect(effectFn).toHaveBeenCalledTimes(2);

			xignal.batch(() => {
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
			const n1 = xignal.state(0);
			const n2 = xignal.state(0);

			const computedGetter = vt.vi.fn(() => xignal.untrack(() => n1.get() + n2.get()));

			const c = xignal.computed(computedGetter);

			const effectFn = vt.vi.fn(() => {
				xignal.untrack(() => {
					n1.get();
					n2.get();
				});
			});

			xignal.effect(effectFn);

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
