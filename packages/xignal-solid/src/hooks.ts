import type { Accessor } from "solid-js";
import { createEffect, createMemo, createSignal, onCleanup } from "solid-js";

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

export function useSignalState<T>(signal: xignal.Signal.State<T>): [Accessor<T>, (fn: xignal.UpdateFn<T>) => T] {
	return [useSignalValue<T>(signal), (fn) => xignal.update(signal, fn)];
}

export function useSignalComputed<T>(getter: xignal.ComputedGetterFn<T>): Accessor<T> {
	const computed = createMemo(() => {
		const result = xignal.computed(getter);
		result.get();
		return result;
	});

	const [value, setValue] = createSignal<T>(computed().get());

	useSignalEffect(() => {
		setValue(() => computed().get());
	});

	return value;
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
	getter: xignal.ComputedGetterFn<T>,
): [xignal.Signal.Computed<T>, () => Accessor<T>] {
	const computed = xignal.computed<T>(getter);
	return [computed, () => useSignalValue(computed)];
}
