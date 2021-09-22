import { Recordable } from "@/global";
import { Component } from "vue";
import { RouteMeta, RouteRecordRaw } from "vue-router";
//@ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, "meta"> {
  name: string;
  meta: RouteMeta;
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Recordable;
  fullPath?: string;
}
