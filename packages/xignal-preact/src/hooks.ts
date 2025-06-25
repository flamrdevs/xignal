import type { Inputs } from "preact/hooks";
import { useCallback, useEffect, useState } from "preact/hooks";

import * as xignal from "xignal";

export function useSignalValue<T>(signal: xignal.ReadonlySignal<T>): T {
	const [value, setValue] = useState<T>(() => signal.get());

	useEffect(
		() =>
			xignal.effect(() => {
				setValue(signal.get());
			}),
		[signal],
	);

	return value;
}

export function useSignalState<T>(signal: xignal.Signal.State<T>): [T, (fn: xignal.UpdateFn<T>) => T] {
	return [useSignalValue<T>(signal), useCallback((fn) => xignal.update(signal, fn), [signal])];
}

export function useSignalEffect(effectFn: xignal.EffectFn, inputs: Inputs | null = null): void {
	useEffect(() => xignal.effect(effectFn), inputs === null ? [] : inputs);
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
	getter: (previousValue?: T | undefined) => T,
): [xignal.Signal.Computed<T>, () => T] {
	const computed = xignal.computed<T>(getter);
	return [computed, () => useSignalValue(computed)];
}
