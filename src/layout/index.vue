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
      <n-menu
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
        :render-label="renderMenuLabel"
        :render-icon="renderMenuIcon"
        :expand-icon="expandIcon"
      />
      <!-- <Logo :collapsed="collapsed" />
      <AsideMenu
        v-model:collapsed="collapsed"
        v-model:location="getMenuLocation"
      /> -->
    </n-layout-sider>
    <!-- <n-layout-header style="height: 64px; padding: 24px" bordered
      >颐和园路</n-layout-header
    > -->
    <n-layout>
      <!-- <n-layout-header :inverted="getHeaderInverted" :position="fixedHeader">
        <PageHeader v-model:collapsed="collapsed" :inverted="inverted" />
      </n-layout-header> -->

      <n-layout-content class="layout-content">
        <router-view></router-view>
      </n-layout-content>
      <n-back-top :right="100" />
    </n-layout>
  </n-layout>
</template>
<script lang="ts" setup>
import { h, ref, defineComponent, computed, onMounted, unref } from "vue";
import { NIcon } from "wowjoy-vui";
import { BookmarkOutline, CaretDownOutline } from "@vicons/ionicons5";
import { useProjectSetting } from "@/hooks/setting/useProjectSetting";
import { useLoadingBar } from "wowjoy-vui";
import { useProjectSettingStore } from "@/store/modules/projectSetting";

const menuOptions = [
  {
    label: "且听风吟",
    key: "hear-the-wind-sing",
    href: "https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F/3199",
  },
  {
    label: "1973年的弹珠玩具",
    key: "pinball-1973",
    disabled: true,
    children: [
      {
        label: "鼠",
        key: "rat",
      },
    ],
  },
  {
    label: "寻羊冒险记",
    key: "a-wild-sheep-chase",
    disabled: true,
  },
  {
    label: "舞，舞，舞",
    key: "dance-dance-dance",
    children: [
      {
        type: "group",
        label: "人物",
        key: "people",
        children: [
          {
            label: "叙事者",
            key: "narrator",
          },
          {
            label: "羊男",
            key: "sheep-man",
          },
        ],
      },
      {
        label: "饮品",
        key: "beverage",
        children: [
          {
            label: "威士忌",
            key: "whisky",
            href: "https://baike.baidu.com/item/%E5%A8%81%E5%A3%AB%E5%BF%8C%E9%85%92/2959816?fromtitle=%E5%A8%81%E5%A3%AB%E5%BF%8C&fromid=573&fr=aladdin",
          },
        ],
      },
      {
        label: "食物",
        key: "food",
        children: [
          {
            label: "三明治",
            key: "sandwich",
          },
        ],
      },
      {
        label: "过去增多，未来减少",
        key: "the-past-increases-the-future-recedes",
      },
    ],
  },
];
const { getMenuSetting } = useProjectSetting();
const settingStore = useProjectSettingStore();
const collapsed = ref<boolean>(true);
const leftMenuWidth = computed(() => {
  const { minMenuWidth, menuWidth } = unref(getMenuSetting) as any;
  return collapsed.value ? minMenuWidth : menuWidth;
});

const renderMenuLabel = (option: any) => {
  if ("href" in option) {
    return h("a", { href: option.href, target: "_blank" }, option.label);
  }
  return option.label;
};
const renderMenuIcon = (option: any) => {
  // 渲染图标占位符以保持缩进
  if (option.key === "sheep-man") return true;
  // 返回 falsy 值，不再渲染图标及占位符
  if (option.key === "food") return null;
  return h(NIcon, null, { default: () => h(BookmarkOutline) });
};
const expandIcon = () => {
  return h(NIcon, null, { default: () => h(CaretDownOutline) });
};
const watchWidth = () => {
  const Width = document.body.clientWidth;
  if (Width <= 950) {
    collapsed.value = true;
  } else collapsed.value = false;
};
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
  }, 3000);
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
    min-height: 100vh;
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
