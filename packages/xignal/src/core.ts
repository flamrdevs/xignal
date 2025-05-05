import * as alien from "alien-signals";

export type SignalGet<T> = {
	readonly get: () => T;
};
export type SignalSet<T> = {
	readonly set: (value: T) => void;
};

export type ReadonlySignal<T> = SignalGet<T>;

export type Signal<T = any> = SignalGet<T> & SignalSet<T>;

export type Computed<T = any> = ReadonlySignal<T>;

export type StopEffect = () => void;

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

export function effect(fn: () => void): StopEffect {
	return alien.effect(fn);
}

export type UpdateActionFn<T> = (previousValue: T) => T;
export type UpdateAction<T> = T | UpdateActionFn<T>;

export function update<T>(signal: Signal<T>, action: UpdateAction<T>): T {
	const nextValue = typeof action === "function" ? (action as UpdateActionFn<T>)(signal.get()) : action;
	signal.set(nextValue);
	return nextValue;
}

export function batch(fn: () => void): void {
	alien.startBatch();
	try {
		fn();
	} finally {
		alien.endBatch();
	}
}

export function untrack<T>(fn: () => T): T {
	alien.pauseTracking();
	try {
		return fn();
	} finally {
		alien.resumeTracking();
	}
}
