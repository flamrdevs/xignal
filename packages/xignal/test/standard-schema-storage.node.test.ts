import * as vt from "vitest";

import { z } from "zod";

import { createMemoryDriver } from "xignal/storage";

import { signal } from "xignal/standard-schema/storage";

vt.describe("storage", () => {
	vt.it("should work", () => {
		const store = {};

		const _key1 = signal("key1", z.string(), "", createMemoryDriver(store));
		const _key2 = signal("key2", z.number(), 0, createMemoryDriver(store));
		const _key3 = signal("key3", z.boolean(), false, createMemoryDriver(store));

		vt.expect(store).toEqual({});

		_key1.set("1");

		vt.expect(store).toEqual({ key1: "1" });

		_key1.set("12");
		_key2.set(1);

		vt.expect(store).toEqual({ key1: "12", key2: 1 });

		_key1.set("123");
		_key2.set(2);
		_key3.set(true);

		vt.expect(store).toEqual({ key1: "123", key2: 2, key3: true });
	});
});
