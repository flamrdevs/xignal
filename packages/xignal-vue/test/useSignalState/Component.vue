<script setup lang="ts">
import { useSignalState } from "@xignal/vue";

import { global } from "./module";

const [globalValue, globalUpdate] = useSignalState(global);

const onClick = () => {
	globalUpdate((n) => n + 1);
};
</script>

<template>
  <button
		type="button"
		@click="onClick"
	>
		click : {{ globalValue }}
	</button>
</template>