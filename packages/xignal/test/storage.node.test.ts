import * as vt from "vitest";

import * as xignalStorage from "xignal/storage";

vt.describe("storage", () => {
	vt.it("should work", () => {
		const store = {};

		const key1 = xignalStorage.state("key1", "", xignalStorage.createMemoryDriver(store));
		const key2 = xignalStorage.state("key2", 0, xignalStorage.createMemoryDriver(store));
		const key3 = xignalStorage.state("key3", false, xignalStorage.createMemoryDriver(store));

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
