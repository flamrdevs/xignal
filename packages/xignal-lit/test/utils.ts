import * as vt from "vitest";

import { cleanupable } from "@private/tests/utils";

const cleanup = cleanupable();

export const render = (elementOrTagName: HTMLElement | string) => {
	const element: HTMLElement =
		typeof elementOrTagName === "string" ? document.createElement(elementOrTagName) : elementOrTagName;

	document.body.appendChild(element);

	let removed = false;
	const clean = () => {
		if (!removed) {
			removed = true;
			document.body.removeChild(element);
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
