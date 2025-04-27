import { mount as _mount, unmount } from "svelte";
import type { ComponentType, SvelteComponent } from "svelte";

export const mount = (component: ComponentType<SvelteComponent<any>>) => {
	const container = document.createElement("div");
	document.body.appendChild(container);

	const mounted = _mount(component, { target: container });

	return () => {
		unmount(mounted, { outro: true });
		document.body.removeChild(container);
	};
};
