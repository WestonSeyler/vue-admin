import http from "@/utils/http/axios";

export interface LoginResponseModel<T = any> {
  access_token: string;
  duid: string;
  iuid: string;
  mdid: string;
  refresh_token: string;
  scope: "openid";
  tenantIds: any[];
  userName: string;
}
export interface BasicResponseModel<T = any> {
  state: number;
  msg: string;
  results: T;
}

export interface BasicPageParams {
  pageNumber: number;
  pageSize: number;
  total: number;
}

/**
 * @description: 获取用户信息
 */
export function getUserInfo() {
  return http.request({
    url: "/admin_info",
    method: "get",
  });
}

/**
 * @description: 用户登录
 */
export function login(params: any) {
  return http.request<LoginResponseModel>(
    // {
    //   url: "/login",
    //   method: "POST",
    //   params,
    // },
    {
      url: "/ms-posr-dc/api/auth/v1/login/token",
      method: "POST",
      params,
    },
    {
      isTransformResponse: false,
      joinParamsToUrl: true,
    }
  );
}

/**
 * @description: 用户修改密码
 */
export function changePassword(params, uid) {
  return http.request(
    {
      url: `/user/u${uid}/changepw`,
      method: "POST",
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}

/**
 * @description: 用户登出
 */
export function logout(params: any) {
  return http.request({
    url: "/login/logout",
    method: "POST",
    params,
  });
}
