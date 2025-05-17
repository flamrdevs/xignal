[![version](https://badgen.net/npm/v/@xignal/vue)](https://www.npmjs.com/package/@xignal/vue)

## Install

`npm i xignal @xignal/vue`

## Usage

### Basic

```ts

import * as xignal from "xignal";

export const count = xignal.state(0);
export const doubled = xignal.computed(() => count.get() * 2);

```

```html

<script setup lang="ts">
import { useSignalValue } from "@xignal/vue";

import { count, doubled } from "./signal";

const countValue = useSignalValue(count);
const doubledValue = useSignalValue(doubled);
</script>

<template>
  <div>
		<div>count {{ countValue }}</div>
		<div>doubled {{ doubledValue }}</div>
	</div>
</template>

```

## License

MIT