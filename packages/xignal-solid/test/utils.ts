import * as vt from "vitest";

import { render as _render } from "solid-js/web";
import type { JSX } from "solid-js";

import { cleanupable } from "@private/tests/utils";

const cleanup = cleanupable();

export const render = (code: () => JSX.Element) => {
	const container = document.createElement("div");
	document.body.appendChild(container);

	const dispose = _render(code, container);

	let removed = false;
	return () => {
		if (!removed) {
			removed = true;
			dispose();
			document.body.removeChild(container);
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
