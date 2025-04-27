<script lang="ts">
import { useSignalValue } from "@xignal/svelte";

import { count, doubled } from "./counter.state";

const countValue = useSignalValue(count);
const doubledValue = useSignalValue(doubled);
</script>
    
<div class="counter-container">
  <div class="counter-count">count { countValue.value }</div>
  <div class="counter-doubled">doubled { doubledValue.value }</div>
</div>