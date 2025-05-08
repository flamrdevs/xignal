import * as vt from "vitest";

import { createApp } from "vue";
import type { Component } from "vue";

import { cleanupable } from "@private/tests/utils";

const cleanup = cleanupable();

export const mount = (component: Component) => {
	const container = document.createElement("div");
	document.body.appendChild(container);

	const app = createApp(component);
	app.mount(container);

	let removed = false;
	const clean = () => {
		if (!removed) {
			removed = true;
			app.unmount();
			document.body.removeChild(container);
		}
	};
	cleanup(clean);
	return clean;
};

mount.beforeEachCleanup = (fn?: () => void) => {
	vt.beforeEach(() => {
		cleanup();
		fn?.();
	});
};

mount.addCleanup = (fn: () => void) => cleanup(fn);
