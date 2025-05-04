export const createCounterElement = () => {
	const elementContainer = document.createElement("div");
	const elementCount = document.createElement("div");
	const elementDoubled = document.createElement("div");
	elementContainer.appendChild(elementCount);
	elementContainer.appendChild(elementDoubled);
	if (__VITEST_BROWSER_HEADLESS_DISABLED_AND_UI_ENABLED__) {
		elementContainer.classList.add("counter-container");
		elementCount.classList.add("counter-count");
		elementDoubled.classList.add("counter-doubled");
	}

	return {
		root: elementContainer,
		render: (count: number, doubled: number) => {
			elementCount.innerText = `count ${count}`;
			elementDoubled.innerText = `doubled ${doubled}`;
		},
	};
};
