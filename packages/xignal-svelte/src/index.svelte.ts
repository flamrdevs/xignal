import { onDestroy } from "svelte";

import * as xignal from "xignal";

export function useSignalValue<T>(signal: xignal.ReadonlySignal<T>): Readonly<{
	value: T;
}> {
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

export function useSignalEffect(effectFn: xignal.EffectFn): void {
	$effect(() => xignal.effect(effectFn));
}
