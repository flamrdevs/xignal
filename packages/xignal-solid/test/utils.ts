import type { JSX } from "solid-js";
import { render as _render } from "solid-js/web";

import { createRemovableContainer } from "@private/tests/dom";
import { cleanup } from "@private/tests/globals";

export const render = (code: () => JSX.Element) => {
	const container = createRemovableContainer();

	const dispose = _render(code, container.element);

	return cleanup(() => {
		container.remove(() => {
			dispose();
		});
	});
};
