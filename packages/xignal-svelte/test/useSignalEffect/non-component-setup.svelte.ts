import { useSignalEffect } from "@xignal/svelte";

import { count, fnEffect, fnEffectCleanup } from "./non-component";

export default () => {
	const destroy = $effect.root(() => {
		useSignalEffect(() => {
			fnEffect(count.get());
			return fnEffectCleanup;
		});
	});

	return () => {
		destroy();
	};
};
