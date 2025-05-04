import type { ComponentChildren } from "preact";

import type { ReadonlySignal } from "xignal";

import { useSignalValue } from "./hooks";

export function Show(props: {
	when: ReadonlySignal<unknown>;
	children?: ComponentChildren;
	fallback?: ComponentChildren;
}): ComponentChildren {
	return useSignalValue(props.when) ? props.children : props.fallback;
}
