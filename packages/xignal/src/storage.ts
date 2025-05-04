import * as core from "./core";

export const NOT_FOUND: symbol = Symbol("NOT_FOUND");

export type Driver<T = any> = {
	get: (key: string) => T | typeof NOT_FOUND;
	set: (key: string, value: T) => void;
};

export const createMemoryDriver = (store: Record<string, any> = {}): Driver => {
	return {
		get: (key) => {
			return key in store ? store[key] : NOT_FOUND;
		},
		set: (key, value) => {
			store[key] = value;
		},
	};
};

export const createStorageDriver = (
	storage: Storage,
	{ parse, stringify }: { parse: (value: string) => any; stringify: (value: any) => string } = {
		parse: JSON.parse,
		stringify: JSON.stringify,
	},
): Driver => {
	return {
		get: (key) => {
			try {
				const item = storage.getItem(key);
				if (typeof item === "string") return parse(item);
				return NOT_FOUND;
			} catch (error) {
				return NOT_FOUND;
			}
		},
		set: (key, value) => {
			try {
				storage.setItem(key, stringify(value));
			} catch (error) {}
		},
	};
};

export const localStorageDriver: Driver = createStorageDriver(localStorage);

export function signal<T>(key: string): core.Signal<T | undefined>;
export function signal<T>(key: string, initialValue: T): core.Signal<T>;
export function signal<T>(key: string, initialValue?: T): core.Signal<T | undefined>;
export function signal<T>(key: string, initialValue: T, driver: Driver<T>): core.Signal<T>;
export function signal<T>(
	key: string,
	initialValue?: T,
	driver: Driver<T | undefined> = localStorageDriver,
): core.Signal<T | undefined> {
	const driverInitialValue = driver.get(key);
	const _signal = core.signal<T | undefined>(
		driverInitialValue === NOT_FOUND ? initialValue : (driverInitialValue as T | undefined),
	);
	return {
		get: _signal.get,
		set: (value: T | undefined) => {
			_signal.set(value);
			driver.set(key, value);
		},
	};
}
