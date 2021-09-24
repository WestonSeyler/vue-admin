<template>
  <n-breadcrumb>
    <n-breadcrumb-item>北京总行北京</n-breadcrumb-item>
    <n-breadcrumb-item>天津分行天津分行</n-breadcrumb-item>
  </n-breadcrumb>
  <basicModal>
    <div style="height:200px"></div>
  </basicModal>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { basicModal } from "@/components/Modal";
export default defineComponent({
  components: {
    basicModal,
  },
  setup() {},
});
</script>
