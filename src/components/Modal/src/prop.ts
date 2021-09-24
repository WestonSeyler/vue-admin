import { NModal } from "wowjoy-vui";
// ..NModal.props
export const basicProps = {
  ...NModal.props,
  subBtuText: {
    type: String,
    default: "确认",
  },
  showIcon: {
    type: Boolean,
    default: false,
  },
  width: {
    type: Number,
    default: 446,
  },
  title: {
    type: String,
    default: "",
  },
  maskClosable: {
    type: Boolean,
    default: false,
  },
  preset: {
    type: String,
    default: "dialog",
  },
};
