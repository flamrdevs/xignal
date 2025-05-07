import type { StandardSchemaV1 } from "@standard-schema/spec";

import * as core from "../core";

import { createParse } from "./utils";
import type { Out } from "./utils";

export function signal<S extends StandardSchemaV1>(schema: S, initialValue: Out<NoInfer<S>>): core.Signal<Out<S>> {
	const parse = createParse<S>(schema);
	const _signal = core.signal<Out<S>>(parse(initialValue));
	return {
		get: _signal.get,
		set: (value: Out<S>) => {
			_signal.set(parse(value));
		},
	};
}

export function computed<S extends StandardSchemaV1>(schema: S, getter: () => Out<NoInfer<S>>): core.Computed<Out<S>> {
	const parse = createParse<S>(schema);
	return core.computed(() => parse(getter()));
}
