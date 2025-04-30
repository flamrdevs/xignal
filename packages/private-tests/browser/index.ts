import { expect } from "vitest";
import type { ExpectPollOptions } from "vitest";
import { page } from "@vitest/browser/context";
import type { BrowserPage, Locator } from "@vitest/browser/context";

export const expectElementToBeInTheDocument = async (locator: Locator, options?: ExpectPollOptions) => {
	await expect.element(locator, options).toBeInTheDocument();
	return locator;
};

export const expectGetElementToBeInTheDocument = (get: (page: BrowserPage) => Locator, options?: ExpectPollOptions) =>
	expectElementToBeInTheDocument(get(page), options);

export const expectElementsToBeInTheDocument = async (locators: Locator[], options?: ExpectPollOptions) => {
	for await (const locator of locators) await expectElementToBeInTheDocument(locator, options);
	return locators;
};

export const expectGetElementsToBeInTheDocument = (
	get: (page: BrowserPage) => Locator[],
	options?: ExpectPollOptions,
) => expectElementsToBeInTheDocument(get(page), options);
