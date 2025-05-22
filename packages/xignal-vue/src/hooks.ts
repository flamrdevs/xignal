import { onUnmounted, shallowReadonly, shallowRef, watchEffect } from "vue";
import type { ShallowRef } from "vue";

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

export function useSignalState<T>(
	signal: xignal.Signal.State<T>,
): [ReadValue<T>, (action: xignal.UpdateAction<T>) => T] {
	return [useSignalValue<T>(signal), (action) => xignal.update(signal, action)];
}

export function useSignalEffect(effectFn: xignal.EffectFn): void {
	watchEffect((onCleanup) => {
		onCleanup(xignal.effect(effectFn));
	});
}
