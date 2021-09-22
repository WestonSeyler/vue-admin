<template>
  <div></div>
</template>
<script lang="ts" setup>
import { defineComponent, onMounted } from "vue";
import { getConsoleInfo } from "@/api/dashboard";
onMounted(() => {
  getConsoleInfo();
});
</script>
