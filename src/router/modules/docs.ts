import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { DocumentTextOutline } from '@vicons/ionicons5';
import { renderIcon } from '@/utils/index';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/external',
    name: 'https://vui.rubikstack.com/en-US/os-theme',
    component: Layout,
    meta: {
      title: '组件库文档',
      icon: renderIcon(DocumentTextOutline),
      sort: 2,
    },
  },
];

export default routes;
