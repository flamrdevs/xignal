import { render as _render } from "solid-js/web";
import type { JSX } from "solid-js";

export const render = (code: () => JSX.Element) => {
	const container = document.createElement("div");
	document.body.appendChild(container);

	const dispose = _render(code, container);

	return () => {
		dispose();
		document.body.removeChild(container);
	};
};
