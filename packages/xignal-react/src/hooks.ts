import { useEffect, useSyncExternalStore } from "react";
import type { DependencyList } from "react";

import * as xignal from "xignal";

export function useSignalValue<T>(signal: xignal.ReadonlySignal<T>): T {
	const value = useSyncExternalStore<T>(
		(onStoreChange) =>
			xignal.effect(() => {
				signal.get();
				onStoreChange();
			}),
		() => signal.get(),
		() => signal.get(),
	);

	return value;
}

export function useSignalEffect(effectFn: xignal.EffectFn, deps: DependencyList | null = null): void {
	// biome-ignore lint/correctness/useExhaustiveDependencies: arg deps
	useEffect(() => xignal.effect(effectFn), deps === null ? [] : deps);
}
