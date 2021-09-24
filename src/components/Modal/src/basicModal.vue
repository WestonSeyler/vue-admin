<template>
  <n-button @click="showModal2 = true"> 样式2 </n-button>
  <n-space>
    <n-modal
      v-model:show="showModal2"
      preset="card"
      :style="bodyStyle"
      title="添加证书"
      headStyle="block"
    >
      <template #header>
        <div class="w-full cursor-move" id="basic-modal-bar">标题</div>
      </template>
      <template #default>
        <slot name="default"></slot>
      </template>
      <template #action v-if="!$slots.action">
        <div class="text-center">
          <n-button class="mr-2">取消</n-button>
          <n-button type="primary">确定</n-button>
        </div>
      </template>
      <template v-else #action>
        <slot name="action"></slot>
      </template>
    </n-modal>
  </n-space>
</template>
<script lang="ts" setup>
import {
  getCurrentInstance,
  ref,
  nextTick,
  unref,
  computed,
  useAttrs,
  defineEmits,
  defineProps,
} from "vue";
import { defineComponent } from "vue";
import { basicProps } from "./prop";
const props = defineProps({ ...basicProps });
const showModal = ref(false);
const showModal1 = ref(false);
const showModal2 = ref(false);
const bodyStyle = {
  width: "560px",
};
console.log(props);
</script>
