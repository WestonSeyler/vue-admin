<template>
  <!-- <div>console</div> -->
  <basicModal @register="modalRegister">
  </basicModal>
  <n-button @click="handleClick">click</n-button>
  <!-- <BasicTable></BasicTable> -->
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { basicModal, useModal } from "@/components/Modal";
import { BasicTable } from "@/components/Table";
export default defineComponent({
  components: {
    basicModal,
    // BasicTable,
  },
  
  setup() {
    const [modalRegister, { openModal, closeModal, setSubLoading, setProps }] =
      useModal({
        title: "新增预约",
        width: 500,
      });
    const handleClick = () => {
      setProps({ width: "600px", bodyWidth: "500px" });
      openModal();
    };

    return {
      handleClick,
      modalRegister,
    };
  },
});
</script>
