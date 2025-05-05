import { useEffect, useState } from "preact/hooks";

import { effect } from "xignal";
import type { ReadonlySignal } from "xignal";

export function useSignalValue<T>(signal: ReadonlySignal<T>): T {
	const [value, setValue] = useState<T>(() => signal.get());

	useEffect(
		() =>
			effect(() => {
				setValue(signal.get());
			}),
		[signal],
	);

	return value;
}
