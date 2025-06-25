import { createApp } from "vue";

import { createRemovableContainer } from "@private/tests/dom";
import { cleanup } from "@private/tests/globals";

// biome-ignore lint/suspicious/noExplicitAny: any vue component
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
