export const createRemovableElement = (element: HTMLElement, append = true) => {
	if (append) document.body.appendChild(element);

	let removed = false;
	return (before?: () => void) => {
		if (!removed) {
			removed = true;
			before?.();
			document.body.removeChild(element);
			return true;
		}
	};
};

export const createRemovableContainer = (append?: boolean) => {
	const element = document.createElement("div");
	const remove = createRemovableElement(element, append);
	return { element, remove };
};
