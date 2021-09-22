import { defineStore } from "pinia";
import { store } from "@/store";
export interface IUserState {
  token: string;
}
export const useUserStore = defineStore({
  id: "app-user",
  state: (): IUserState => ({
    token: "",
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
  },
  actions: {},
});

// Need to be used outside the setup
export function useUserStoreWidthOut() {
  return useUserStore(store);
}
