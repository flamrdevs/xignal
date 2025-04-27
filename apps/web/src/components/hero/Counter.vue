<script setup lang="ts">
import { useSignalValue } from "@xignal/vue";

import { count } from "./counter";

const state = useSignalValue(count);
</script>

<template>
  <div>{{state}}</div>
</template>