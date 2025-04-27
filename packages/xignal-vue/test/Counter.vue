<script setup lang="ts">
import { useSignalValue } from "@xignal/vue";

import { count, doubled } from "./counter.state";

const countValue = useSignalValue(count);
const doubledValue = useSignalValue(doubled);
</script>

<template>
  <div class="counter-container">
		<div class="counter-count">count {{ countValue }}</div>
		<div class="counter-doubled">doubled {{ doubledValue }}</div>
	</div>
</template>