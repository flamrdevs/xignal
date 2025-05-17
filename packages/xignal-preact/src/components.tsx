import type { ComponentChildren } from "preact";

import type * as xignal from "xignal";

import { useSignalValue } from "./hooks";

export function Show(props: {
	when: xignal.ReadonlySignal<unknown>;
	children?: ComponentChildren;
	fallback?: ComponentChildren;
}): ComponentChildren {
	return useSignalValue(props.when) ? props.children : props.fallback;
}
