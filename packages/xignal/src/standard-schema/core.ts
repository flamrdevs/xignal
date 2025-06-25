import type { StandardSchemaV1 } from "@standard-schema/spec";

import * as core from "../core";
import type { Out } from "./utils";
import { createParse } from "./utils";

export function state<S extends StandardSchemaV1>(schema: S, initialValue: Out<NoInfer<S>>): core.Signal.State<Out<S>> {
	const parse = createParse<S>(schema);
	const state = core.state<Out<S>>(parse(initialValue));
	return {
		get: state.get,
		set: (value: Out<S>) => {
			state.set(parse(value));
		},
	};
}

export function computed<S extends StandardSchemaV1>(
	schema: S,
	getter: () => Out<NoInfer<S>>,
): core.Signal.Computed<Out<S>> {
	const parse = createParse<S>(schema);
	return core.computed(() => parse(getter()));
}
