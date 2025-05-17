<script lang="ts">
import { useSignalValue } from "@xignal/svelte";

import { count, doubled } from "./module";

const countValue = useSignalValue(count);
const doubledValue = useSignalValue(doubled);
</script>
    
<div class="counter-container">
  <div class="counter-count">count { countValue.get }</div>
  <div class="counter-doubled">doubled { doubledValue.get }</div>
</div>