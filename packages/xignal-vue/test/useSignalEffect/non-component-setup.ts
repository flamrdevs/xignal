import { effectScope } from "vue";

import { useSignalEffect } from "@xignal/vue";

import { count, fnEffect, fnEffectCleanup } from "./non-component";

export default () => {
	const scope = effectScope();

	scope.run(() => {
		useSignalEffect(() => {
			fnEffect(count.get());
			return fnEffectCleanup;
		});
	});

	return () => {
		scope.stop();
	};
};
