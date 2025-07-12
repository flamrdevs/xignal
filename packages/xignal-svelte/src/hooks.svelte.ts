import { onDestroy } from "svelte";

import * as xignal from "xignal";

export type ReadValue<T> = Readonly<{
	get: T;
}>;

export function useSignalValue<T>(signal: xignal.ReadonlySignal<T>): ReadValue<T> {
	let state = $state<T>(signal.get());

	onDestroy(
		xignal.effect(() => {
			state = signal.get();
		}),
	);

	return {
		get get() {
			return state;
		},
	};
}

export function useSignalState<T>(signal: xignal.Signal.State<T>): [ReadValue<T>, (fn: xignal.UpdateFn<T>) => T] {
	return [useSignalValue<T>(signal), (fn) => xignal.update(signal, fn)];
}

export function useSignalEffect(effectFn: xignal.EffectFn): void {
	$effect(() => xignal.effect(effectFn));
}

export function createStateWithUseSignalValue<T>(): [
	xignal.Signal.State<T | undefined>,
	() => ReadValue<T | undefined>,
];
export function createStateWithUseSignalValue<T>(initialValue: T): [xignal.Signal.State<T>, () => ReadValue<T>];
export function createStateWithUseSignalValue<T>(
	initialValue?: T,
): [xignal.Signal.State<T | undefined>, () => ReadValue<T | undefined>] {
	const state = xignal.state<T | undefined>(initialValue);
	return [state, () => useSignalValue(state)];
}

export function createComputedWithUseSignalValue<T>(
	getter: xignal.ComputedGetterFn<T>,
): [xignal.Signal.Computed<T>, () => ReadValue<T>] {
	const computed = xignal.computed<T>(getter);
	return [computed, () => useSignalValue(computed)];
}
