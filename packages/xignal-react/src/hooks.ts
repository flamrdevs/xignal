import type { DependencyList } from "react";
import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";

import * as xignal from "xignal";

export function useSignalValue<T>(signal: xignal.ReadonlySignal<T>): T {
	const value = useSyncExternalStore<T>(
		useCallback(
			(onStoreChange) =>
				xignal.effect(() => {
					signal.get();
					onStoreChange();
				}),
			[signal],
		),
		() => signal.get(),
		() => signal.get(),
	);

	return value;
}

export function useSignalState<T>(signal: xignal.Signal.State<T>): [T, (fn: xignal.UpdateFn<T>) => T] {
	return [useSignalValue<T>(signal), useCallback((fn) => xignal.update(signal, fn), [signal])];
}

export function useSignalComputed<T>(getter: xignal.ComputedGetterFn<T>, deps: DependencyList | null = null): T {
	// biome-ignore lint/correctness/useExhaustiveDependencies: arg deps
	return useSignalValue<T>(useMemo(() => xignal.computed(getter), deps === null ? [] : deps));
}

export function useSignalEffect(effectFn: xignal.EffectFn, deps: DependencyList | null = null): void {
	// biome-ignore lint/correctness/useExhaustiveDependencies: arg deps
	useEffect(() => xignal.effect(effectFn), deps === null ? [] : deps);
}

export function createStateWithUseSignalValue<T>(): [xignal.Signal.State<T | undefined>, () => T | undefined];
export function createStateWithUseSignalValue<T>(initialValue: T): [xignal.Signal.State<T>, () => T];
export function createStateWithUseSignalValue<T>(
	initialValue?: T,
): [xignal.Signal.State<T | undefined>, () => T | undefined] {
	const state = xignal.state<T | undefined>(initialValue);
	return [state, () => useSignalValue(state)];
}

export function createComputedWithUseSignalValue<T>(
	getter: xignal.ComputedGetterFn<T>,
): [xignal.Signal.Computed<T>, () => T] {
	const computed = xignal.computed<T>(getter);
	return [computed, () => useSignalValue(computed)];
}
