import * as vt from "vitest";

import * as alien from "alien-signals";

import { name } from "../package.json";

import * as x from "xignal";

vt.describe(name, () => {
	vt.describe("slowdown", () => {
		vt.bench("xignal", () => {
			const s = x.signal(0);

			const c = x.computed(() => s.get());

			x.effect(() => {
				s.get();
			});

			for (let n = 1; n < 10; n++) {
				s.set(n);
				s.get();
				c.get();
			}
		});

		vt.bench("alien-signals", () => {
			const s = alien.signal(0);

			const c = alien.computed(() => s());

			alien.effect(() => {
				s();
			});

			for (let n = 1; n < 10; n++) {
				s(n);
				s();
				c();
			}
		});
	});
});
