import { DialogOptions } from "wowjoy-vui";
/**
 *  @description: 弹窗对外暴露的方法
 */
export interface ModalMethods {
  setProps: (props: any) => void;
  openModal: () => void;
  closeModal: () => void;
  setSubLoading: (status: any) => void;
}
export interface ModalProps extends DialogOptions {}

export type RegisterFn = (ModalInstance: ModalMethods) => void;

export type UseModalReturnType = [RegisterFn, ModalMethods];
