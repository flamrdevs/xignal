import { act } from "react";
import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";

import { createRemovableContainer } from "@private/tests/dom";
import { cleanup } from "@private/tests/globals";

let init = false;

export const render = (children: ReactNode) => {
	if (!init) {
		init = true;
		(window as any).IS_REACT_ACT_ENVIRONMENT = true;
	}

	const container = createRemovableContainer();

	const root = createRoot(container.element);
	act(() => {
		root.render(children);
	});

	return cleanup(() => {
		container.remove(() => {
			act(() => {
				root.unmount();
			});
		});
	});
};
