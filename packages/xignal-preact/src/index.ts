import { useEffect, useState } from "preact/hooks";

import { effect } from "xignal";
import type { ReadonlySignal } from "xignal";

export function useSignalValue<T>(signal: ReadonlySignal<T>): T {
	const [state, setState] = useState<T>(() => signal.get());

	useEffect(
		() =>
			effect(() => {
				setState(signal.get());
			}),
		[signal],
	);

	return state;
}
