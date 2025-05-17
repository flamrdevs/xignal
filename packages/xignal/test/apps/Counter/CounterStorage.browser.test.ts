import * as vt from "vitest";

import { delay } from "es-toolkit/promise";

import { expectGetElementsToBeInTheDocument } from "@private/tests/browser";
import "@private/tests/styles";

import * as xignal from "xignal";
import * as xignalStorage from "xignal/storage";

import { render } from "~/test/utils";

import { createCounterElement } from "./elements";

render.beforeEachCleanup(() => {
	localStorage.clear();
	sessionStorage.clear();
});

vt.describe("CounterStorage", () => {
	vt.it.for([
		xignalStorage.createStorageDriver(localStorage),
		xignalStorage.createStorageDriver(sessionStorage),
		xignalStorage.createMemoryDriver(),
	] satisfies xignalStorage.Driver[])("should work", async (driver) => {
		const log = vt.vi.fn();

		const counter = createCounterElement();

		render(counter.root);

		const count = xignalStorage.state("count", 0, driver);
		const doubled = xignal.computed(() => count.get() * 2);
		const stopEffect = xignal.effect(() => {
			const countValue = count.get();
			const doubledValue = doubled.get();
			log(countValue, doubledValue);
			counter.render(countValue, doubledValue);
		});

		vt.expect(driver.get("count")).toBeUndefined();

		vt.expect(count.get()).toBe(0);
		vt.expect(doubled.get()).toBe(0);
		vt.expect(log).toBeCalled();
		await expectGetElementsToBeInTheDocument((page) => [page.getByText("count 0"), page.getByText("doubled 0")]);

		__VITEST_BROWSER_HEADLESS_DISABLED_AND_UI_ENABLED__ && (await delay(1000));

		count.set(1);

		vt.expect(driver.get("count")).toBe(1);

		vt.expect(count.get()).toBe(1);
		vt.expect(doubled.get()).toBe(2);
		vt.expect(log).toBeCalledTimes(2);
		await expectGetElementsToBeInTheDocument((page) => [page.getByText("count 1"), page.getByText("doubled 2")]);

		__VITEST_BROWSER_HEADLESS_DISABLED_AND_UI_ENABLED__ && (await delay(1000));

		count.set(2);

		vt.expect(driver.get("count")).toBe(2);

		vt.expect(count.get()).toBe(2);
		vt.expect(doubled.get()).toBe(4);
		vt.expect(log).toBeCalledTimes(3);
		await expectGetElementsToBeInTheDocument((page) => [page.getByText("count 2"), page.getByText("doubled 4")]);

		__VITEST_BROWSER_HEADLESS_DISABLED_AND_UI_ENABLED__ && (await delay(1000));

		stopEffect();
		count.set(3);

		vt.expect(driver.get("count")).toBe(3);

		vt.expect(count.get()).toBe(3);
		vt.expect(doubled.get()).toBe(6);
		vt.expect(log).toBeCalledTimes(3);
		await expectGetElementsToBeInTheDocument((page) => [page.getByText("count 2"), page.getByText("doubled 4")]);
	});
});
