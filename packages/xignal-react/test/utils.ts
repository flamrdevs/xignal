import * as vt from "vitest";

import { act } from "react";
import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";

import { cleanupable } from "@private/tests/utils";

const cleanup = cleanupable();

let init = false;

export const render = (children: ReactNode) => {
	if (!init) {
		init = true;
		(window as any).IS_REACT_ACT_ENVIRONMENT = true;
	}

	const container = document.createElement("div");
	document.body.appendChild(container);

	const root = createRoot(container);
	act(() => {
		root.render(children);
	});

	let removed = false;
	const clean = () => {
		if (!removed) {
			removed = true;
			act(() => {
				root.unmount();
			});
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
