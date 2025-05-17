<script setup lang="ts">
import { useSignalState } from "@xignal/vue";

import { count } from "./module";

const [countValue, countUpdate] = useSignalState(count);

const onClick = () => {
	countUpdate((n) => n + 1);
};
</script>

<template>
  <button
		type="button"
		@click="onClick"
	>
		click : {{ countValue }}
	</button>
</template>