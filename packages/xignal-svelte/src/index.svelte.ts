import { onDestroy } from "svelte";

import * as xignal from "xignal";

export type ReadValue<T> = Readonly<{
	value: T;
}>;

export function useSignalValue<T>(signal: xignal.ReadonlySignal<T>): ReadValue<T> {
	let value = $state<T>(signal.get());

	onDestroy(
		xignal.effect(() => {
			value = signal.get();
		}),
	);

	return {
		get value() {
			return value;
		},
	};
}

export function useSignalState<T>(
	signal: xignal.Signal.State<T>,
): [ReadValue<T>, (action: xignal.UpdateAction<T>) => T] {
	return [useSignalValue<T>(signal), (action) => xignal.update(signal, action)];
}

export function useSignalEffect(effectFn: xignal.EffectFn): void {
	$effect(() => xignal.effect(effectFn));
}
