import type { ShallowRef } from "vue";
import { onUnmounted, shallowReadonly, shallowRef, watchEffect } from "vue";

import * as xignal from "xignal";

export type ReadValue<T> = Readonly<ShallowRef<T>>;

export function useSignalValue<T>(signal: xignal.ReadonlySignal<T>): ReadValue<T> {
	const ref: ShallowRef<T> = shallowRef<T>(signal.get());

	onUnmounted(
		xignal.effect(() => {
			ref.value = signal.get();
		}),
	);

	return shallowReadonly(ref);
}

export function useSignalState<T>(signal: xignal.Signal.State<T>): [ReadValue<T>, (fn: xignal.UpdateFn<T>) => T] {
	return [useSignalValue<T>(signal), (fn) => xignal.update(signal, fn)];
}

export function useSignalEffect(effectFn: xignal.EffectFn): void {
	watchEffect((onCleanup) => {
		onCleanup(xignal.effect(effectFn));
	});
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
