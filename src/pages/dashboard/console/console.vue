<template>
  <!-- <div>console</div> -->
  <basicModal @register="modalRegister">
    <div>1111</div>
  </basicModal>
  <n-button @click="handleClick">click</n-button>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { basicModal, useModal } from "@/components/Modal";
export default defineComponent({
  components: {
    basicModal,
  },
  setup() {
    const [modalRegister, { openModal, closeModal, setSubLoading, setProps }] =
      useModal({
        title: "新增预约",
        width: 500,
      });
    const handleClick = () => {
      setProps({width:'600px',bodyWidth:'500px'})
      openModal();
    };

    return {
      handleClick,
      modalRegister,
    };
  },
});
</script>
