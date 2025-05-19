import { createApp } from "vue";

import { createRemovableContainer } from "@private/tests/dom";
import { cleanup } from "@private/tests/globals";

export const mount = (component: any) => {
	const container = createRemovableContainer();

	const app = createApp(component);
	app.mount(container.element);

	return cleanup(() => {
		container.remove(() => {
			app.unmount();
		});
	});
};
