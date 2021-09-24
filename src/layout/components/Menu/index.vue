<template>
  <NMenu
    :options="menus"
    :mode="mode"
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="20"
    :indent="24"
    :expanded-keys="openKeys"
    :value="getSelectedKeys"
    @update:value="clickMenuItem"
    @update:expanded-keys="menuExpanded"
  />
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  watch,
  toRefs,
  unref,
  onMounted,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAsyncRouteStore } from "@/store/modules/asyncRoute";
import { useProjectSettingStore } from "@/store/modules/projectSetting";
import { generatorMenu } from "@/utils";
export default defineComponent({
  props: {
    mode: {
      // 菜单模式
      type: String,
      default: "vertical",
    },
    collapsed: {
      // 侧边栏菜单是否收起
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const currentRoute = useRoute();
    const router = useRouter();
    const asyncRouteStore = useAsyncRouteStore();
    const menus = ref<any[]>([]);
    const selectedKeys = ref<string>(currentRoute.name as string);
    const matched = currentRoute.matched;
    const getOpenKeys =
      matched && matched.length ? matched.map((item) => item.name) : [];

    const state = reactive({
      openKeys: getOpenKeys,
    });
    const getSelectedKeys = computed(() => {
      return unref(selectedKeys.value);
    });
    // 监听菜单收缩状态
    watch(
      () => props.collapsed,
      (newVal) => {
        state.openKeys = newVal ? [] : getOpenKeys;
        selectedKeys.value = currentRoute.name as string;
      }
    );
    // 点击菜单
    function clickMenuItem(key: string) {
      if (/http(s)?:/.test(key)) {
        window.open(key);
      } else {
        router.push({ name: key });
      }
    }
    function updateMenu() {
      menus.value = generatorMenu(asyncRouteStore.getMenus);
    }
    watch(
      () => currentRoute.fullPath,
      () => {
        updateMenu();
        const matched = currentRoute.matched;
        state.openKeys = matched.map((item) => item.name);
        const activeMenu: string =
          (currentRoute.meta?.activeMenu as string) || "";
        selectedKeys.value = activeMenu
          ? (activeMenu as string)
          : (currentRoute.name as string);
      }
    );
    //展开菜单
    function menuExpanded(openKeys: string[]) {
      if (!openKeys) return;
      const latestOpenKey = openKeys.find(
        (key) => state.openKeys.indexOf(key) === -1
      );
      const isExistChildren = findChildrenLen(latestOpenKey as string);
      state.openKeys = isExistChildren
        ? latestOpenKey
          ? [latestOpenKey]
          : []
        : openKeys;
    }

    //查找是否存在子路由
    function findChildrenLen(key: string) {
      if (!key) return false;
      const subRouteChildren: string[] = [];
      for (const { children, key } of unref(menus)) {
        if (children && children.length) {
          subRouteChildren.push(key as string);
        }
      }
      return subRouteChildren.includes(key);
    }
    onMounted(() => {
      updateMenu();
      console.log(menus.value);
    });
    return {
      ...toRefs(state),
      menus,
      selectedKeys,
      getSelectedKeys,
      clickMenuItem,
      menuExpanded,
    };
  },
});
</script>
