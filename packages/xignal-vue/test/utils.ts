import { createApp } from "vue";
import type { Component } from "vue";

export const mount = (component: Component) => {
	const container = document.createElement("div");
	document.body.appendChild(container);

	const app = createApp(component);
	app.mount(container);

	return () => {
		app.unmount();
		document.body.removeChild(container);
	};
};
