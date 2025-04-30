export const render = (element: HTMLElement) => {
	document.body.appendChild(element);

	let removed = false;
	return () => {
		if (!removed) {
			removed = true;
			document.body.removeChild(element);
		}
	};
};
