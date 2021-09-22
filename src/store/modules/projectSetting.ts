import { defineStore } from "pinia";
import { store } from "@/store";
import projectSetting from "@/settings/projectSetting";
import type {
  IheaderSetting,
  ImenuSetting,
  ImultiTabsSetting,
  IcrumbsSetting,
} from "/#/config";

const {
  navMode, //导航模式 vertical 左侧菜单模式 horizontal 顶部菜单模式
  navTheme, //主题
  headerSetting, //头部
  showFooter, //底部
  menuSetting, //菜单
  multiTabsSetting, //多标签
  crumbsSetting, //面包屑
  permissionMode, ///菜单权限模式 FIXED 前端固定路由  BACK 动态获取
  isPageAnimate, //是否开启路由动画
  pageAnimateType, //路由动画类型
} = projectSetting;

interface ProjectSettingState {
  navMode: string; //导航模式
  navTheme: string; //导航风格
  headerSetting: IheaderSetting; //顶部设置
  showFooter: boolean; //页脚
  menuSetting: ImenuSetting; //多标签
  multiTabsSetting: ImultiTabsSetting; //多标签
  crumbsSetting: IcrumbsSetting; //面包屑
  permissionMode: string; //权限模式
  isPageAnimate: boolean; //是否开启路由动画
  pageAnimateType: string; //路由动画类型
}

export const useProjectSettingStore = defineStore({
  id: "app-project-setting",
  state: (): ProjectSettingState => ({
    navMode: navMode,
    navTheme,
    headerSetting,
    showFooter,
    menuSetting,
    multiTabsSetting,
    crumbsSetting,
    permissionMode,
    isPageAnimate,
    pageAnimateType,
  }),
  getters: {
    getNavMode(): string {
      return this.navMode;
    },
    getNavTheme(): string {
      return this.navTheme;
    },
    getHeaderSetting(): object {
      return this.headerSetting;
    },
    getShowFooter(): boolean {
      return this.showFooter;
    },
    getMenuSetting(): object {
      return this.menuSetting;
    },
    getMultiTabsSetting(): object {
      return this.multiTabsSetting;
    },
    getCrumbsSetting(): object {
      return this.multiTabsSetting;
    },
    getPermissionMode(): string {
      return this.permissionMode;
    },
    getIsPageAnimate(): boolean {
      return this.isPageAnimate;
    },
    getPageAnimateType(): string {
      return this.pageAnimateType;
    },
  },
  actions: {
    setNavTheme(value: string): void {
      this.navTheme = value;
    },
  },
});

// Need to be used outside the setup
export function useProjectSettingStoreWithOut() {
  return useProjectSettingStore(store);
}
