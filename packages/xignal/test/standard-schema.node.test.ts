import * as vt from "vitest";

import { type } from "arktype";
import * as v from "valibot";
import { z } from "zod";

import * as xignalStandardSchema from "xignal/standard-schema";

vt.describe("standard-schema", () => {
	vt.describe("arktype", () => {
		vt.it("should work", () => {
			const state = xignalStandardSchema.state(
				type({
					name: "string",
				}),
				{
					name: "1",
				},
			);
			const computed = xignalStandardSchema.computed(
				type({
					length: "number",
				}),
				() => ({
					length: state.get().name.length,
				}),
			);

			vt.expect(() => {
				xignalStandardSchema.state(
					type({
						key: "string",
					}),
					[] as any,
				);
			}).toThrow();

			vt.expect(state.get()).toEqual({ name: "1" });
			vt.expect(computed.get()).toEqual({ length: 1 });

			state.set({ name: "12" });

			vt.expect(state.get()).toEqual({ name: "12" });
			vt.expect(computed.get()).toEqual({ length: 2 });

			vt.expect(() => {
				state.set([] as any);
			}).toThrow();
		});
	});

	vt.describe("valibot", () => {
		vt.it("should work", () => {
			const state = xignalStandardSchema.state(
				v.object({
					name: v.string(),
				}),
				{
					name: "1",
				},
			);
			const computed = xignalStandardSchema.computed(
				v.object({
					length: v.number(),
				}),
				() => ({
					length: state.get().name.length,
				}),
			);

			vt.expect(() => {
				xignalStandardSchema.state(
					v.object({
						key: v.string(),
					}),
					[] as any,
				);
			}).toThrow();

			vt.expect(state.get()).toEqual({ name: "1" });
			vt.expect(computed.get()).toEqual({ length: 1 });

			state.set({ name: "12" });

			vt.expect(state.get()).toEqual({ name: "12" });
			vt.expect(computed.get()).toEqual({ length: 2 });

			vt.expect(() => {
				state.set([] as any);
			}).toThrow();
		});
	});

	vt.describe("zod", () => {
		vt.it("should work", () => {
			const state = xignalStandardSchema.state(
				z.object({
					name: z.string(),
				}),
				{
					name: "1",
				},
			);
			const computed = xignalStandardSchema.computed(
				z.object({
					length: z.number(),
				}),
				() => ({
					length: state.get().name.length,
				}),
			);

			vt.expect(() => {
				xignalStandardSchema.state(
					z.object({
						key: z.string(),
					}),
					[] as any,
				);
			}).toThrow();

			vt.expect(state.get()).toEqual({ name: "1" });
			vt.expect(computed.get()).toEqual({ length: 1 });

			state.set({ name: "12" });

			vt.expect(state.get()).toEqual({ name: "12" });
			vt.expect(computed.get()).toEqual({ length: 2 });

			vt.expect(() => {
				state.set([] as any);
			}).toThrow();
		});
	});
});
