<script lang="ts">
import { useSignalState } from "@xignal/svelte";

import { count } from "./module";

const [countValue, countUpdate] = useSignalState(count);

const onClick = () => {
	countUpdate((n) => n + 1);
};
</script>

<button
	type="button"
	onclick={onClick}
>
	click : { countValue.get }
</button>