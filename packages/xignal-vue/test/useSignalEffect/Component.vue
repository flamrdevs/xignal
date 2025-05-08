<script setup lang="ts">
import { ref } from "vue";

import { useSignalEffect } from "@xignal/vue";

import { global, fnEffect, fnEffectCleanup } from "./module";

const local = ref(0);

useSignalEffect(() => {
	fnEffect(global.get(), local.value);
	return fnEffectCleanup;
});

const onClick = () => {
	local.value++;
};
</script>

<template>
  <button
		type="button"
		@click="onClick"
	>
		click
	</button>
</template>