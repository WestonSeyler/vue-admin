import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/router/constant";
import { DocumentTextOutline } from "@vicons/ionicons5";
import { renderIcon } from "@/utils/index";
const IFrame = () => import("@/pages/iframe/index.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/external",
    name: "https://vui.rubikstack.com/en-US/os-theme",
    component: Layout,
    children: [
      {
        path: "/naive",
        name: "frame-naive",
        meta: {
          title: "组件库文档",
          frameSrc: "https://vui.rubikstack.com/zh-CN/os-theme",
        },
        component: IFrame,
      },
    ],
    meta: {
      title: "组件库文档",
      icon: renderIcon(DocumentTextOutline),
      sort: 2,
    },
  },
];

export default routes;
