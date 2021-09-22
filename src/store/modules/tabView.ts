import { defineStore } from "pinia";
import { RouteLocationNormalized } from "vue-router";

// 不需要出现在标签页中的路由

export type RouteItem = Partial<RouteLocationNormalized> & {
  fullPath: string;
  name: string;
};

export type ITabsViewState = {
  tabsList: RouteItem[]; // 标签页
};

export const useTabsViewStore = defineStore({
  id: "app-tabs-view",
  state: (): ITabsViewState => ({
    tabsList: [],
  }),
  getters: {},
  actions: {},
});
