import { useEffect, useState } from "preact/hooks";
import type { Inputs } from "preact/hooks";

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

export function useSignalEffect(effectFn: xignal.EffectFn, inputs: Inputs | null = null): void {
	// biome-ignore lint/correctness/useExhaustiveDependencies: arg inputs
	useEffect(() => xignal.effect(effectFn), inputs === null ? [] : inputs);
}
