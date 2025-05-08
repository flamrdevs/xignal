<script lang="ts">
import { useSignalEffect } from "@xignal/svelte";

import { global, fnEffect, fnEffectCleanup } from "./module";

let local = $state(0);

useSignalEffect(() => {
	fnEffect(global.get(), local);
	return fnEffectCleanup;
});

const onClick = () => {
	local++;
};
</script>

<button
	type="button"
	onclick={onClick}
>
	click
</button>