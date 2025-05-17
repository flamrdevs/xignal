<script lang="ts">
import { useSignalValue } from "@xignal/svelte";

import { count } from "./counter";

const state = useSignalValue(count);
</script>
  
<div>{state.get}</div>