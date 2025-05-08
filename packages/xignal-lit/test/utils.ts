import * as vt from "vitest";

import { cleanupable } from "@private/tests/utils";

const cleanup = cleanupable();

export const render = (element: HTMLElement) => {
	document.body.appendChild(element);

	let removed = false;
	return () => {
		if (!removed) {
			removed = true;
			document.body.removeChild(element);
		}
	};
};

render.beforeEachCleanup = (fn?: () => void) => {
	vt.beforeEach(() => {
		cleanup();
		fn?.();
	});
};

render.addCleanup = (fn: () => void) => cleanup(fn);
