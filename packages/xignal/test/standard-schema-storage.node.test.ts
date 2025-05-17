import * as vt from "vitest";

import { z } from "zod";

import * as xignalStorage from "xignal/storage";

import * as xignalStandardSchemaStorage from "xignal/standard-schema/storage";

vt.describe("storage", () => {
	vt.it("should work", () => {
		const store = {};

		const key1 = xignalStandardSchemaStorage.state("key1", z.string(), "", xignalStorage.createMemoryDriver(store));
		const key2 = xignalStandardSchemaStorage.state("key2", z.number(), 0, xignalStorage.createMemoryDriver(store));
		const key3 = xignalStandardSchemaStorage.state("key3", z.boolean(), false, xignalStorage.createMemoryDriver(store));

		vt.expect(store).toEqual({});

		key1.set("1");

		vt.expect(store).toEqual({ key1: "1" });

		key1.set("12");
		key2.set(1);

		vt.expect(store).toEqual({ key1: "12", key2: 1 });

		key1.set("123");
		key2.set(2);
		key3.set(true);

		vt.expect(store).toEqual({ key1: "123", key2: 2, key3: true });
	});
});
