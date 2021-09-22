<template></template>
<script lang="ts" set>
import { useDialog } from "wowjoy-vui";
import { defineComponent } from "vue";
export default defineComponent({
  name: "DialogContent",
  setup() {
    //挂载在 window 方便与在js中使用
    //@ts-ignore
    window["$dialog"] = useDialog();
  },
});
</script>
