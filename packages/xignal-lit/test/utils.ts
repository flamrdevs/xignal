import { createRemovableElement } from "@private/tests/dom";
import { cleanup } from "@private/tests/globals";

export const render = (elementOrTagName: HTMLElement | string) => {
	const element: HTMLElement =
		typeof elementOrTagName === "string" ? document.createElement(elementOrTagName) : elementOrTagName;

	const remove = createRemovableElement(element);

	return cleanup(() => {
		remove();
	});
};
