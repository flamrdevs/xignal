import * as vt from "vitest";

import { type } from "arktype";
import * as v from "valibot";
import { z } from "zod";

import { signal, computed } from "xignal/standard-schema";

vt.describe("standard-schema", () => {
	vt.describe("arktype", () => {
		vt.it("should work", () => {
			const _signal = signal(
				type({
					name: "string",
				}),
				{
					name: "1",
				},
			);
			const _computed = computed(
				type({
					length: "number",
				}),
				() => ({
					length: _signal.get().name.length,
				}),
			);

			vt.expect(() => {
				signal(
					type({
						key: "string",
					}),
					[] as any,
				);
			}).toThrow();

			vt.expect(_signal.get()).toEqual({ name: "1" });
			vt.expect(_computed.get()).toEqual({ length: 1 });

			_signal.set({ name: "12" });

			vt.expect(_signal.get()).toEqual({ name: "12" });
			vt.expect(_computed.get()).toEqual({ length: 2 });

			vt.expect(() => {
				_signal.set([] as any);
			}).toThrow();
		});
	});

	vt.describe("valibot", () => {
		vt.it("should work", () => {
			const _signal = signal(
				v.object({
					name: v.string(),
				}),
				{
					name: "1",
				},
			);
			const _computed = computed(
				v.object({
					length: v.number(),
				}),
				() => ({
					length: _signal.get().name.length,
				}),
			);

			vt.expect(() => {
				signal(
					v.object({
						key: v.string(),
					}),
					[] as any,
				);
			}).toThrow();

			vt.expect(_signal.get()).toEqual({ name: "1" });
			vt.expect(_computed.get()).toEqual({ length: 1 });

			_signal.set({ name: "12" });

			vt.expect(_signal.get()).toEqual({ name: "12" });
			vt.expect(_computed.get()).toEqual({ length: 2 });

			vt.expect(() => {
				_signal.set([] as any);
			}).toThrow();
		});
	});

	vt.describe("zod", () => {
		vt.it("should work", () => {
			const _signal = signal(
				z.object({
					name: z.string(),
				}),
				{
					name: "1",
				},
			);
			const _computed = computed(
				z.object({
					length: z.number(),
				}),
				() => ({
					length: _signal.get().name.length,
				}),
			);

			vt.expect(() => {
				signal(
					z.object({
						key: z.string(),
					}),
					[] as any,
				);
			}).toThrow();

			vt.expect(_signal.get()).toEqual({ name: "1" });
			vt.expect(_computed.get()).toEqual({ length: 1 });

			_signal.set({ name: "12" });

			vt.expect(_signal.get()).toEqual({ name: "12" });
			vt.expect(_computed.get()).toEqual({ length: 2 });

			vt.expect(() => {
				_signal.set([] as any);
			}).toThrow();
		});
	});
});
