<template>
  <n-layout-header bordered position="absolute">
    <PageHeader v-model:collapsed="collapsed"></PageHeader>
  </n-layout-header>
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
      <!-- <Logo :collapsed="collapsed" /> -->
      <AsideMenu
        v-model:collapsed="collapsed"
        v-model:location="getMenuLocation"
        :menuList="menuList"
      />
    </n-layout-sider>
    <n-layout>
      <n-layout-header bordered position="absolute" v-if="CrumbsShow">
        <div class="breadcrumb">
          <n-breadcrumb>
            <template v-for="routeItem in breadcrumbList" :key="routeItem.name">
              <n-breadcrumb-item>
                {{ routeItem.meta.title }}
              </n-breadcrumb-item>
            </template>
          </n-breadcrumb>
        </div>
      </n-layout-header>

      <div class="mx-4 my-4">
        <n-card
          title=""
          :style="
            CrumbsShow
              ? `position: absoute; top: 30px; bottom: 30px;minHeight:${activeHeight}px`
              : ''
          "
        >
          <router-view></router-view>
        </n-card>
      </div>
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
import { useRoute, useRouter } from "vue-router";
import { getMenuList } from "@/api/system/menu";
const { getMenuSetting, getCrumbsSetting } = useProjectSetting();
const settingStore = useProjectSettingStore();
const router = useRouter();
const route = useRoute();
const collapsed = ref<boolean>(false);
const menuList = ref([]);
const activeHeight = ref("");
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
const watchHeight = () => {
  // console.log(document.documentElement.clientHeight)
  activeHeight.value = document.documentElement.clientHeight - 130;
  console.log(activeHeight.value);
};
watchHeight();
const generator: any = (routerMap: any) => {
  return routerMap.map((item: any) => {
    const currentMenu = {
      ...item,
      label: item.meta.title,
      key: item.name,
      disabled: item.path === "/",
    };
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentMenu.children = generator(item.children, currentMenu);
    }
    return currentMenu;
  });
};
//面包屑
const breadcrumbList = computed(() => {
  return generator(route.matched);
});
const CrumbsShow = computed(() => getCrumbsSetting.value.show);

const getMenuLocation = computed(() => {
  return "left";
});
function formatMenu(root: any[]) {
  // console.log(root);
  return root.map((item) => {
    // const isRoot = isRootRouter(item);
    // const info = isRoot ? item.children[0] : item;
    const currentMenu = {
      label: item.node.powerName,
      key: item.node.powerName,
      icon: item.powerIcon,
      path: item.node.powerUrl,
    };
    // 是否有子菜单，并递归处理
    if (
      item.children &&
      item.children.length > 0 &&
      item.children[0].node.resourceType == "MENU"
    ) {
      // Recursion
      currentMenu.children = formatMenu(item.children);
    }
    return currentMenu;
  });
}
onMounted(() => {
  window.addEventListener("resize", watchWidth);
  window.addEventListener("resize", watchHeight);
  getMenuList<{ children: any[] }>({
    tenantId: "89503794970d881845eb7f8382bc8390",
    userId: "4a526f9abddf1c158eafc12cb5f0f1c4",
    pacsavle: "web",
  }).then((res) => {
    const results = formatMenu(res.results.children);
    // console.log(results);
    //@ts-ignore
    menuList.value.push(...results);
  });
  //挂载在 window 方便与在js中使用
  //@ts-ignore
  // window["$loading"] = useLoadingBar();
  //@ts-ignore
  // window["$loading"].finish();
  // setTimeout(() => {
  //   //@ts-ignore
  //   window["$loading"].finish();
  // }, 100);
});
</script>
<style>
.n-layout-scroll-container {
  background: #dbdbdb;
}
</style>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: row;
  flex: auto;
  top: 65px;
  &-default-background {
    background: #f5f7f9;
  }
  .layout-sider {
    min-height: 90vh;
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
    // flex: auto;
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
.breadcrumb {
  background: #ffffff;
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
}
</style>
