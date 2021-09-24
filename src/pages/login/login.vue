<template>
  <div>login</div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { getConsoleInfo } from "@/api/dashboard";
onMounted(() => {
  getConsoleInfo();
});
</script>
