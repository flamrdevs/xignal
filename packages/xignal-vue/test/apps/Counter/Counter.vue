<script lang="ts">
import * as xignal from "xignal";

export const count = xignal.state(0);
export const doubled = xignal.computed(() => count.get() * 2);
</script>

<script setup lang="ts">
import { useSignalValue } from "@xignal/vue";

const countValue = useSignalValue(count);
const doubledValue = useSignalValue(doubled);
</script>

<template>
  <div class="counter-container">
		<div class="counter-count">count {{ countValue }}</div>
		<div class="counter-doubled">doubled {{ doubledValue }}</div>
	</div>
</template>