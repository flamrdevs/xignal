import { initCSSRuntime } from "@master/css-runtime";

const createInitCSSRuntime = (components: Record<string, string>) => {
	document.body.id = "master";

	const runtime = initCSSRuntime({
		scope: "#master",
		components,
	});

	return () => {
		runtime.destroy();
	};
};

export const initCSSRuntimeCounter = () =>
	createInitCSSRuntime({
		"counter-container": "px:20 py:32 bg:white fg:black font:mono",
		"counter-count": "font:medium text:center text:24",
		"counter-doubled": "font:medium text:center text:24",
	});
