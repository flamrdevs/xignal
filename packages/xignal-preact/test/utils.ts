import * as vt from "vitest";

import { render as _render } from "preact";
import type { ComponentChild } from "preact";

import { cleanupable } from "@private/tests/utils";

const cleanup = cleanupable();

export const render = (vnode: ComponentChild) => {
	const container = document.createElement("div");
	document.body.appendChild(container);

	_render(vnode, container);

	let removed = false;
	const clean = () => {
		if (!removed) {
			removed = true;
			_render(null, container);
			document.body.removeChild(container);
		}
	};
	cleanup(clean);
	return clean;
};

render.beforeEachCleanup = (fn?: () => void) => {
	vt.beforeEach(() => {
		cleanup();
		fn?.();
	});
};

render.addCleanup = (fn: () => void) => cleanup(fn);
