import type { Accessor } from "solid-js";
import { createEffect, createSignal, onCleanup } from "solid-js";

import * as xignal from "xignal";

export function useSignalValue<T>(signal: xignal.ReadonlySignal<T>): Accessor<T> {
	const [value, setValue] = createSignal<T>(signal.get());

	onCleanup(
		xignal.effect(() => {
			setValue(() => signal.get());
		}),
	);

	return value;
}

export function useSignalState<T>(
	signal: xignal.Signal.State<T>,
): [Accessor<T>, (action: xignal.UpdateAction<T>) => T] {
	return [useSignalValue<T>(signal), (action) => xignal.update(signal, action)];
}

export function useSignalEffect(effectFn: xignal.EffectFn): void {
	// biome-ignore lint/suspicious/noConfusingVoidType: better void
	let cleanup: void | (() => void);

	createEffect(() => {
		cleanup?.();
		cleanup = xignal.effect(effectFn);
	});

	onCleanup(() => {
		cleanup?.();
	});
}

export function createStateWithUseSignalValue<T>(): [xignal.Signal.State<T | undefined>, () => Accessor<T | undefined>];
export function createStateWithUseSignalValue<T>(initialValue: T): [xignal.Signal.State<T>, () => Accessor<T>];
export function createStateWithUseSignalValue<T>(
	initialValue?: T,
): [xignal.Signal.State<T | undefined>, () => Accessor<T | undefined>] {
	const state = xignal.state<T | undefined>(initialValue);
	return [state, () => useSignalValue(state)];
}

export function createComputedWithUseSignalValue<T>(
	getter: (previousValue?: T | undefined) => T,
): [xignal.Signal.Computed<T>, () => Accessor<T>] {
	const computed = xignal.computed<T>(getter);
	return [computed, () => useSignalValue(computed)];
}
