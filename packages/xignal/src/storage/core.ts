import * as core from "../core";

import { defaultDriver } from "./driver";
import type { Driver } from "./driver";

export function signal<T>(key: string): core.Signal<T | undefined>;
export function signal<T>(key: string, initialValue: T): core.Signal<T>;
export function signal<T>(key: string, initialValue?: T): core.Signal<T | undefined>;
export function signal<T>(key: string, initialValue: T, driver: Driver<NoInfer<T>>): core.Signal<T>;
export function signal<T>(
	key: string,
	initialValue?: T,
	driver: Driver<NoInfer<T> | undefined> = defaultDriver,
): core.Signal<T | undefined> {
	const _signal = core.signal<T | undefined>(driver.get(key, initialValue));
	return {
		get: _signal.get,
		set: (value: T | undefined) => {
			_signal.set(value);
			driver.set(key, value);
		},
	};
}
