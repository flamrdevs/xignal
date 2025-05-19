import { render as _render } from "preact";
import type { ComponentChild } from "preact";

import { createRemovableContainer } from "@private/tests/dom";
import { cleanup } from "@private/tests/globals";

export const render = (vnode: ComponentChild) => {
	const container = createRemovableContainer();

	_render(vnode, container.element);

	return cleanup(() => {
		container.remove(() => {
			_render(null, container.element);
		});
	});
};
