import { createRemovableElement } from "@private/tests/dom";
import { cleanup } from "@private/tests/globals";

export const render = (element: HTMLElement) => {
	const remove = createRemovableElement(element);

	return cleanup(() => {
		remove();
	});
};
