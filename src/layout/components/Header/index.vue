<template>
  <div class="layout-header">
    <!--顶部菜单-->
    <!--左侧菜单-->
    <div class="layout-header-left">
      <!-- 菜单收起 -->
      <div
        class="ml-1 layout-header-trigger layout-header-trigger-min"
        @click="() => $emit('update:collapsed', !collapsed)"
      >
        <!-- 菜单展开 -->
        <n-icon size="18" v-if="collapsed">
          <MenuUnfoldOutlined />
        </n-icon>
        <n-icon size="18" v-else>
          <MenuFoldOutlined />
        </n-icon>
      </div>
      <!-- 刷新 -->
      <!-- <div class="mr-1 layout-header-trigger layout-header-trigger-min">
        <n-icon size="18">
          <ReloadOutlined />
        </n-icon>
      </div> -->
      <div class="breadcrumb">
        <n-breadcrumb>
          <template v-for="routeItem in breadcrumbList" :key="routeItem.name">
            <n-breadcrumb-item>
              {{ routeItem.meta.title }}
            </n-breadcrumb-item>
          </template>
        </n-breadcrumb>
      </div>
      <!-- 面包屑 -->
    </div>

    <div class="layout-header-right">
      <!-- <div
        class="layout-header-trigger layout-header-trigger-min"
        v-for="item in iconList"
        :key="item.icon.name"
      >
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="18">
              <component :is="item.icon" v-on="item.eventObject || {}" />
            </n-icon>
          </template>
          <span>{{ item.tips }}</span>
        </n-tooltip>
      </div> -->
      <!--切换全屏-->
      <!-- <div class="layout-header-trigger layout-header-trigger-min">
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="18">
              <component :is="fullscreenIcon" @click="toggleFullScreen" />
            </n-icon>
          </template>
          <span>全屏</span>
        </n-tooltip>
      </div> -->
      <!-- 个人中心 -->
      <div class="layout-header-trigger layout-header-trigger-min">
        <!-- 个人中心 -->
        <n-dropdown
          trigger="hover"
          @select="avatarSelect"
          :options="avatarOptions"
        >
          <div class="avatar">
            <n-avatar round>
              {{ username }}
              <template #icon>
                <UserOutlined />
              </template>
            </n-avatar>
          </div>
        </n-dropdown>
      </div>
      <!--设置-->
      <!-- <div
        class="layout-header-trigger layout-header-trigger-min"
        @click="openSetting"
      >
        <n-tooltip placement="bottom-end">
          <template #trigger>
            <n-icon size="18" style="font-weight: bold">
              <SettingOutlined />
            </n-icon>
          </template>
          <span>项目配置</span>
        </n-tooltip>
      </div> -->
    </div>
  </div>
  <!--项目配置-->
  <!-- <ProjectSetting ref="drawerSetting" /> -->
</template>
<script lang="ts" >
import { defineComponent, reactive, toRefs, ref, computed, unref } from "vue";
import { useRouter, useRoute } from "vue-router";

import components from "./components";
import { NDialogProvider, useDialog, useMessage } from "wowjoy-vui";
import { TABS_ROUTES } from "@/store/mutation-types";
import { useUserStore } from "@/store/modules/user";
export default defineComponent({
  name: "PageHeader",
  components: { ...components },
  props: {
    collapsed: {
      type: Boolean,
    },
  },
  setup() {
    const userStore = useUserStore();
    const message = useMessage();
    const dialog = useDialog();
    const router = useRouter();
    const route = useRoute();

    //用户信息
    const { username } = userStore?.info || {};
    const state = reactive({
      username: username || "",
    });
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
    console.log(breadcrumbList.value);

    //个人设置
    const avatarOptions = [
      {
        label: "个人设置",
        key: 1,
      },
      {
        label: "退出登录",
        key: 2,
      },
    ];
    // 退出登录
    const doLogout = () => {
      dialog.info({
        title: "提示",
        content: "您确定要退出登录吗",
        positiveText: "确定",
        negativeText: "取消",
        onPositiveClick: () => {
          userStore.logout().then(() => {
            message.success("成功退出登录");
            // 移除标签页
            // localStorage.removeItem(TABS_ROUTES);
            router
              .replace({
                name: "Login",
                query: {
                  redirect: route.fullPath,
                },
              })
              .finally(() => location.reload());
          });
        },
        onNegativeClick: () => {},
      });
    };

    //头像下拉菜单
    const avatarSelect = (key: number) => {
      switch (key) {
        case 1:
          router.push({ name: "Setting" });
          break;
        case 2:
          doLogout();
          break;
      }
    };

    return {
      avatarOptions,
      avatarSelect,
      username,
      breadcrumbList,
    };
  },
});
</script>

<style lang="scss" scoped>
.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  height: $header-height;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  transition: all 0.2s ease-in-out;
  // width: 100%;
  z-index: 11;
  .breadcrumb {
    display: flex;
  }
  &-left {
    display: flex;
    // flex: 1;
    align-items: center;
    width: 400px;
    ::v-deep(.ant-breadcrumb span:last-child .link-text) {
      color: #515a6e;
    }

    &-menu {
      color: var(--text-color);
    }
  }

  &-right {
    display: flex;
    align-items: center;
    margin-right: 20px;
    .avatar {
      display: flex;
      align-items: center;
      height: 64px;
    }

    > * {
      cursor: pointer;
    }
  }

  &-trigger {
    display: inline-block;
    width: 64px;
    height: 64px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    .n-icon {
      display: flex;
      align-items: center;
      height: 64px;
      line-height: 64px;
    }

    &:hover {
      background: hsla(0, 0%, 100%, 0.08);
    }

    .anticon {
      font-size: 16px;
      color: #515a6e;
    }
  }

  &-trigger-min {
    width: auto;
    padding: 0 12px;
  }
}

.layout-header-light {
  background: #fff;
  color: #515a6e;

  .n-icon {
    color: #515a6e;
  }

  .layout-header-left {
    // ::v-deep(.n-breadcrumb
    //     .n-breadcrumb-item:last-child
    //     .n-breadcrumb-item__link) {
    //   color: #515a6e;
    // }
  }

  .layout-header-trigger {
    &:hover {
      background: #f8f8f9;
    }
  }
}

.layout-header-fix {
  position: fixed;
  top: 0;
  right: 0;
  left: 200px;
  z-index: 11;
}

//::v-deep(.menu-router-link) {
//  color: #515a6e;
//
//  &:hover {
//    color: #1890ff;
//  }
//}
</style>