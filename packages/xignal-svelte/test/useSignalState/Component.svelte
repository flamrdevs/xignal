<script lang="ts">
import { useSignalState } from "@xignal/svelte";

import { global } from "./module";

const [globalValue, globalUpdate] = useSignalState(global);

const onClick = () => {
	globalUpdate((n) => n + 1);
};
</script>

<button
	type="button"
	onclick={onClick}
>
	click : { globalValue.value }
</button>