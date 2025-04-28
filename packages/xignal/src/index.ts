import * as alien from "alien-signals";

export type SignalGet<T> = Readonly<{
	get: () => T;
}>;
export type SignalSet<T> = Readonly<{
	set: (value: T) => void;
}>;

export type ReadonlySignal<T> = SignalGet<T>;

export type Signal<T = any> = SignalGet<T> & SignalSet<T>;

export type Computed<T = any> = ReadonlySignal<T>;

export function signal<T>(): Signal<T | undefined>;
export function signal<T>(initialValue: T): Signal<T>;
export function signal<T>(initialValue?: T): Signal<T | undefined> {
	const _signal = alien.signal<T | undefined>(initialValue);
	return { get: _signal, set: _signal };
}

export function computed<T>(getter: () => T): Computed<T> {
	const _computed = alien.computed(getter);
	return { get: _computed };
}

export function effect(fn: () => void): () => void {
	return alien.effect(fn);
}
