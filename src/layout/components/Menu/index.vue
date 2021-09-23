<template>
  <NMenu
    :options="menus"
    :inverted="inverted"
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
  onMounted,
  reactive,
  computed,
  watch,
  toRefs,
  unref,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAsyncRouteStore } from "@/store/modules/asyncRoute";
import { generatorMenu, generatorMenuMix } from "@/utils";
import { useProjectSettingStore } from "@/store/modules/projectSetting";
import { useProjectSetting } from "@/hooks/setting/useProjectSetting";

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
    const settingStore = useProjectSettingStore();
    const menus = ref<any[]>([]);
    const selectedKeys = ref<string>(currentRoute.name as string);
    const headerMenuSelectKey = ref<string>("");
    const matched = currentRoute.matched;
    const getOpenKeys =
      matched && matched.length ? matched.map((item) => item.name) : [];

    const state = reactive({
      openKeys: getOpenKeys,
    });
    const getSelectedKeys = computed(() => unref(selectedKeys));
    // 监听分割菜单
    // watch(
    //   () => settingStore.menuSetting.mixMenu,
    //   () => {
    //     updateMenu();
    //     if (props.collapsed) {
    //       emit("update:collapsed", !props.collapsed);
    //     }
    //   }
    // );
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
    return {
      ...toRefs(state),
      menus,
      selectedKeys,
      headerMenuSelectKey,
      getSelectedKeys,
      clickMenuItem,
      menuExpanded,
    };
  },
});
</script>
