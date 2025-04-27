import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";

export const render = (children: ReactNode) => {
	const container = document.createElement("div");
	document.body.appendChild(container);

	const root = createRoot(container);
	root.render(children);

	return () => {
		root.unmount();
		document.body.removeChild(container);
	};
};
