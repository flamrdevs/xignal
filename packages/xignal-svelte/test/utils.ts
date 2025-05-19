import { mount as _mount, unmount } from "svelte";

import { createRemovableContainer } from "@private/tests/dom";
import { cleanup } from "@private/tests/globals";

export const mount = (component: any) => {
	const container = createRemovableContainer();

	const mounted = _mount(component, { target: container.element });

	return cleanup(() => {
		container.remove(() => {
			unmount(mounted, { outro: true });
		});
	});
};
