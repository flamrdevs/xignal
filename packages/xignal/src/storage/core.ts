import * as core from "../core";
import type { Driver } from "./driver";
import { defaultDriver } from "./driver";

export function state<T>(key: string): core.Signal.State<T | undefined>;
export function state<T>(key: string, initialValue: T): core.Signal.State<T>;
export function state<T>(key: string, initialValue?: T): core.Signal.State<T | undefined>;
export function state<T>(key: string, initialValue: T, driver: Driver<NoInfer<T>>): core.Signal.State<T>;
export function state<T>(
	key: string,
	initialValue?: T,
	driver: Driver<NoInfer<T> | undefined> = defaultDriver,
): core.Signal.State<T | undefined> {
	const state = core.state<T | undefined>(driver.get(key, initialValue));
	return {
		get: state.get,
		set: (value: T | undefined) => {
			state.set(value);
			driver.set(key, value);
		},
	};
}
