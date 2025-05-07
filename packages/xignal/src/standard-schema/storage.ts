import type { StandardSchemaV1 } from "@standard-schema/spec";

import * as core from "../core";
import * as storage from "../storage";

import { createParse } from "./utils";
import type { Out } from "./utils";

export function signal<S extends StandardSchemaV1>(
	key: string,
	schema: S,
	initialValue: Out<NoInfer<S>>,
	driver: storage.Driver<Out<NoInfer<S>>> = storage.defaultDriver,
): core.Signal<Out<S>> {
	const parse = createParse<S>(schema);
	const _signal = core.signal<Out<S>>(parse(driver.get(key, initialValue)));
	return {
		get: _signal.get,
		set: (value: Out<S>) => {
			const parsed = parse(value);
			_signal.set(parsed);
			driver.set(key, parsed);
		},
	};
}
