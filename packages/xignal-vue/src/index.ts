import { onUnmounted, shallowReadonly, shallowRef, watchEffect } from "vue";
import type { ShallowRef } from "vue";

import * as xignal from "xignal";

export function useSignalValue<T>(signal: xignal.ReadonlySignal<T>): Readonly<ShallowRef<T>> {
	const value: ShallowRef<T> = shallowRef<T>(signal.get());

	onUnmounted(
		xignal.effect(() => {
			value.value = signal.get();
		}),
	);

	return shallowReadonly(value);
}

export function useSignalEffect(effectFn: xignal.EffectFn): void {
	watchEffect((onCleanup) => {
		onCleanup(xignal.effect(effectFn));
	});
}
