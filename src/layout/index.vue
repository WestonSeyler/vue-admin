<template>
  <n-layout class="layout" has-sider position="absolute">
    <n-layout-sider
      show-trigger
      position="absolute"
      :collapsed-width="64"
      class="layout-sider"
      bordered
      collapse-mode="width"
      :native-scrollbar="false"
      :width="leftMenuWidth"
      :collapsed="collapsed"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <Logo :collapsed="collapsed" />
      <AsideMenu
        v-model:collapsed="collapsed"
        v-model:location="getMenuLocation"
      />
    </n-layout-sider>

    <n-layout>
      <n-layout-header bordered>
        <PageHeader v-model:collapsed="collapsed"></PageHeader>
      </n-layout-header>
      <n-layout-content class="layout-content">
        <router-view></router-view>
      </n-layout-content>
      <n-back-top :right="100" />
    </n-layout>
  </n-layout>
</template>
<script lang="ts" setup>
import { h, ref, defineComponent, computed, onMounted, unref } from "vue";
import { useProjectSetting } from "@/hooks/setting/useProjectSetting";
import { useLoadingBar } from "wowjoy-vui";
import { useProjectSettingStore } from "@/store/modules/projectSetting";
import { Logo } from "./components/Logo";
import { PageHeader } from "./components/Header";
import { AsideMenu } from "./components/Menu";
const { getMenuSetting } = useProjectSetting();
const settingStore = useProjectSettingStore();
const collapsed = ref<boolean>(false);
const leftMenuWidth = computed(() => {
  const { minMenuWidth, menuWidth } = unref(getMenuSetting) as any;
  return collapsed.value ? minMenuWidth : menuWidth;
});
const watchWidth = () => {
  const Width = document.body.clientWidth;
  if (Width <= 950) {
    collapsed.value = true;
  } else collapsed.value = false;
};
const getMenuLocation = computed(() => {
  return "left";
});
onMounted(() => {
  window.addEventListener("resize", watchWidth);
  //挂载在 window 方便与在js中使用
  //@ts-ignore
  window["$loading"] = useLoadingBar();
  //@ts-ignore
  window["$loading"].start();
  setTimeout(() => {
    //@ts-ignore
    window["$loading"].finish();
  }, 100);
});
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: row;
  flex: auto;
  &-default-background {
    background: #f5f7f9;
  }
  .layout-sider {
    min-height: 100vh;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    position: relative;
    z-index: 13;
    transition: all 0.2s ease-in-out;
  }
  .layout-sider-fix {
    position: fixed;
    top: 0;
    left: 0;
  }
  .ant-layout {
    overflow: hidden;
  }
  .layout-right-fix {
    overflow-x: hidden;
    padding-left: 200px;
    min-height: 100vh;
    transition: all 0.2s ease-in-out;
  }
  .layout-content {
    flex: auto;
    min-height: 90vh;
  }
  .n-layout-header.n-layout-header--absolute-positioned {
    z-index: 11;
  }
  .n-layout-footer {
    background: none;
  }
}
.layout-content-main {
  margin: 0 10px 10px;
  position: relative;
  padding-top: 64px;
}
.layout-content-main-fix {
  padding-top: 64px;
}

.fluid-header {
  padding-top: 0px;
}
.main-view-fix {
  padding-top: 44px;
}
.noMultiTabs {
  padding-top: 0;
}
</style>
