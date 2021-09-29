import http from "@/utils/http/axios";
export interface BasicResponseModel<T> {
  state: number;
  results: T;
}

/**
 * @description: 根据用户id获取用户菜单
 */
export function adminMenus() {
  return http.request({
    url: "/menus",
    method: "GET",
  });
}

/**
 * 获取tree菜单列表
 * @param params
 */

export function getMenuList<T>(params?: any) {
  return http.request<BasicResponseModel<T>>(
    {
      url: `/ms-wit-operate/power-data/getUserPower`,
      method: "GET",
      params: params,
    },
    {
      joinTime: false,
    }
  );
}
