import * as alien from "alien-signals";

export type SignalSetActionFn<T> = (previousValue: T) => T;
export type SignalSet<T> = (action: T | SignalSetActionFn<T>) => T;
export type SignalGet<T> = () => T;

export type ReadonlySignal<T> = {
	get: SignalGet<T>;
};

export type Signal<T = any> = ReadonlySignal<T> & {
	set: SignalSet<T>;
};

export type Computed<T = any> = ReadonlySignal<T>;

export function signal<T>(): Signal<T | undefined>;
export function signal<T>(initialValue: T): Signal<T>;
export function signal<T>(initialValue?: T): Signal<T | undefined> {
	const _signal = alien.signal<T | undefined>(initialValue);
	return {
		get: () => _signal(),
		set: (action) => {
			const nextValue =
				typeof action === "function" ? (action as (previousValue: T | undefined) => T)(_signal()) : action;
			_signal(nextValue);
			return nextValue;
		},
	};
}

export function computed<T>(getter: () => T): Computed<T> {
	const _computed = alien.computed(getter);
	return {
		get: () => _computed(),
	};
}

export function effect(fn: () => void): () => void {
	return alien.effect(fn);
}
