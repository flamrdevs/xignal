[![version](https://badgen.net/npm/v/@xignal/svelte)](https://www.npmjs.com/package/@xignal/svelte)

## Install

`npm i xignal @xignal/svelte`

## Usage

```ts

import { signal, computed } from "xignal";

export const count = signal(0);
export const doubled = computed(() => count.get() * 2);

```

```html

<script lang="ts">
import { useSignalValue } from "@xignal/svelte";

import { count, doubled } from "./signal";

const countValue = useSignalValue(count);
const doubledValue = useSignalValue(doubled);
</script>
    
<div>
  <div>count { countValue.value }</div>
  <div>doubled { doubledValue.value }</div>
</div>

```

## License

MIT