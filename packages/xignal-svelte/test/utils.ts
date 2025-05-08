import * as vt from "vitest";

import { mount as _mount, unmount } from "svelte";
import type { ComponentType, SvelteComponent } from "svelte";

import { cleanupable } from "@private/tests/utils";

const cleanup = cleanupable();

export const mount = (component: ComponentType<SvelteComponent<any>>) => {
	const container = document.createElement("div");
	document.body.appendChild(container);

	const mounted = _mount(component, { target: container });

	let removed = false;
	const clean = () => {
		if (!removed) {
			removed = true;
			unmount(mounted, { outro: true });
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
