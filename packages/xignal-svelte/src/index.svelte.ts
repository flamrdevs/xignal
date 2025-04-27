import { onMount } from "svelte";

import { effect } from "xignal";
import type { ReadonlySignal } from "xignal";

export function useSignalValue<T>(signal: ReadonlySignal<T>): Readonly<{
	value: T;
}> {
	let state = $state<T>(signal.get());

	onMount(() =>
		effect(() => {
			state = signal.get();
		}),
	);

	return {
		get value() {
			return state;
		},
	};
}
