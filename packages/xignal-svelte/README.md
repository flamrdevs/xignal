[![version](https://badgen.net/npm/v/@xignal/svelte)](https://www.npmjs.com/package/@xignal/svelte)

Svelte x xignal

## Install

`npm i xignal @xignal/svelte`

## Usage

### Basic

```ts

import * as xignal from "xignal";

export const count = xignal.state(0);
export const doubled = xignal.computed(() => count.get() * 2);

```

```html

<script lang="ts">
import { useSignalValue } from "@xignal/svelte";

import { count, doubled } from "./signal";

const countValue = useSignalValue(count);
const doubledValue = useSignalValue(doubled);
</script>
    
<div>
  <div>count { countValue.get }</div>
  <div>doubled { doubledValue.get }</div>
</div>

```

## License

MIT