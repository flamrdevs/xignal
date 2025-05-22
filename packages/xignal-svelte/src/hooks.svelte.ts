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

export function useSignalState<T>(
	signal: xignal.Signal.State<T>,
): [ReadValue<T>, (action: xignal.UpdateAction<T>) => T] {
	return [useSignalValue<T>(signal), (action) => xignal.update(signal, action)];
}

export function useSignalEffect(effectFn: xignal.EffectFn): void {
	$effect(() => xignal.effect(effectFn));
}
