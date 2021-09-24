<template>
  <div class="logo">
    <img
      src="https://vui.rubikstack.com/assets/naivelogo.a7a9a3a6.svg"
      alt=""
      :class="{ 'mr-2': !collapsed }"
    />
    <h2 v-show="!collapsed" class="title">Wowjoy-Admin</h2>
  </div>
</template>

<script lang="ts">
export default {
  name: "Index",
  props: {
    collapsed: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  line-height: 64px;
  overflow: hidden;
  white-space: nowrap;

  img {
    width: auto;
    height: 32px;
  }

  .title {
    margin-bottom: 0;
  }
}
</style>
