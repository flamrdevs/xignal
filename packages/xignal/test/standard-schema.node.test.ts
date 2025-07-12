import * as vt from "vitest";

import * as xignalStandardSchema from "xignal/standard-schema";

import { type } from "arktype";
import * as v from "valibot";
import { z } from "zod";

vt.describe("standard-schema", () => {
	vt.describe("arktype", () => {
		vt.it("should work", () => {
			const state = xignalStandardSchema.state(type({ name: "string" }), { name: "1" });
			const computed = xignalStandardSchema.computed(type({ length: "number" }), () => ({
				length: state.get().name.length,
			}));

			vt.expect(state.get()).toEqual({ name: "1" });
			vt.expect(computed.get()).toEqual({ length: 1 });

			state.set({ name: "12" });

			vt.expect(state.get()).toEqual({ name: "12" });
			vt.expect(computed.get()).toEqual({ length: 2 });
		});

		vt.it("should error", () => {
			const state = xignalStandardSchema.state(type({ name: "string" }), { name: "1" });
			const computed = xignalStandardSchema.computed(type({ is: "boolean" }), () => [] as unknown as { is: boolean });

			vt.expect(() => {
				xignalStandardSchema.state(type({ key: "string" }), [] as unknown as { key: string });
			}).toThrow();

			vt.expect(() => {
				state.set([] as unknown as { name: string });
			}).toThrow();

			vt.expect(() => {
				computed.get();
			}).toThrow();
		});
	});

	vt.describe("valibot", () => {
		vt.it("should work", () => {
			const state = xignalStandardSchema.state(v.object({ name: v.string() }), { name: "1" });
			const computed = xignalStandardSchema.computed(v.object({ length: v.number() }), () => ({
				length: state.get().name.length,
			}));

			vt.expect(state.get()).toEqual({ name: "1" });
			vt.expect(computed.get()).toEqual({ length: 1 });

			state.set({ name: "12" });

			vt.expect(state.get()).toEqual({ name: "12" });
			vt.expect(computed.get()).toEqual({ length: 2 });

			vt.expect(() => {
				state.set([] as unknown as { name: string });
			}).toThrow();
		});

		vt.it("should error", () => {
			const state = xignalStandardSchema.state(v.object({ name: v.string() }), { name: "1" });
			const computed = xignalStandardSchema.computed(
				v.object({ is: v.boolean() }),
				() => [] as unknown as { is: boolean },
			);

			vt.expect(() => {
				xignalStandardSchema.state(v.object({ key: v.string() }), [] as unknown as { key: string });
			}).toThrow();

			vt.expect(() => {
				state.set([] as unknown as { name: string });
			}).toThrow();

			vt.expect(() => {
				computed.get();
			}).toThrow();
		});
	});

	vt.describe("zod", () => {
		vt.it("should work", () => {
			const state = xignalStandardSchema.state(z.object({ name: z.string() }), { name: "1" });
			const computed = xignalStandardSchema.computed(z.object({ length: z.number() }), () => ({
				length: state.get().name.length,
			}));

			vt.expect(state.get()).toEqual({ name: "1" });
			vt.expect(computed.get()).toEqual({ length: 1 });

			state.set({ name: "12" });

			vt.expect(state.get()).toEqual({ name: "12" });
			vt.expect(computed.get()).toEqual({ length: 2 });
		});

		vt.it("should error", () => {
			const state = xignalStandardSchema.state(z.object({ name: z.string() }), { name: "1" });
			const computed = xignalStandardSchema.computed(
				z.object({ is: z.boolean() }),
				() => [] as unknown as { is: boolean },
			);

			vt.expect(() => {
				xignalStandardSchema.state(z.object({ key: z.string() }), [] as unknown as { key: string });
			}).toThrow();

			vt.expect(() => {
				state.set([] as unknown as { name: string });
			}).toThrow();

			vt.expect(() => {
				computed.get();
			}).toThrow();
		});
	});
});
