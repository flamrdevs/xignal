import type { StandardSchemaV1 } from "@standard-schema/spec";

import * as core from "../core";
import * as storage from "../storage";

import { createParse } from "./utils";
import type { Out } from "./utils";

export function state<S extends StandardSchemaV1>(
	key: string,
	schema: S,
	initialValue: Out<NoInfer<S>>,
	driver: storage.Driver<Out<NoInfer<S>>> = storage.defaultDriver,
): core.Signal.State<Out<S>> {
	const parse = createParse<S>(schema);
	const state = core.state<Out<S>>(parse(driver.get(key, initialValue)));
	return {
		get: state.get,
		set: (value: Out<S>) => {
			const parsed = parse(value);
			state.set(parsed);
			driver.set(key, parsed);
		},
	};
}
