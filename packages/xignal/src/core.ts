import * as alien from "alien-signals";

type SignalGet<T> = {
	readonly get: () => T;
};
type SignalSet<T> = {
	readonly set: (value: T) => void;
};

export type WritableSignal<T> = SignalGet<T> & SignalSet<T>;
export type ReadonlySignal<T> = SignalGet<T>;

export namespace Signal {
	// biome-ignore lint/suspicious/noExplicitAny: should unknown
	export type State<T = any> = WritableSignal<T>;
	// biome-ignore lint/suspicious/noExplicitAny: should unknown
	export type Computed<T = any> = ReadonlySignal<T>;
}

export function state<T>(): Signal.State<T | undefined>;
export function state<T>(initialValue: T): Signal.State<T>;
export function state<T>(initialValue?: T): Signal.State<T | undefined> {
	const signal = alien.signal<T | undefined>(initialValue);
	return { get: signal, set: signal };
}

export type ComputedGetterFn<T> = (previousValue?: T | undefined) => T;

export function computed<T>(getter: ComputedGetterFn<T>): Signal.Computed<T> {
	const computed = alien.computed(getter);
	return { get: computed };
}

// biome-ignore lint/suspicious/noConfusingVoidType: better void
export type EffectFn = () => void | (() => void);

export type StopEffect = () => void;

export function effect(fn: EffectFn): StopEffect {
	// biome-ignore lint/suspicious/noConfusingVoidType: better void
	let cleanup: void | (() => void);
	const maybeCleanup = () => {
		try {
			cleanup?.();
		} catch {}
	};

	const stop = alien.effect(() => {
		maybeCleanup();
		cleanup = fn();
	});

	return () => {
		stop();
		maybeCleanup();
	};
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
	const currentSub = alien.setCurrentSub(undefined);
	try {
		return fn();
	} finally {
		alien.setCurrentSub(currentSub);
	}
}

export type UpdateFn<T> = (previousValue: T) => T;

export function update<T>(state: WritableSignal<T>, fn: NoInfer<UpdateFn<T>>): T {
	const nextValue = fn(untrack(() => state.get()));
	state.set(nextValue);
	return nextValue;
}
