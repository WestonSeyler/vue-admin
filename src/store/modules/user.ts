import { defineStore } from "pinia";
import { store } from "@/store";

export const useUserStore = defineStore({
  id: "app-user",
  state: () => ({}),
  getters: {},
  actions: {},
});

// Need to be used outside the setup
export function useUserStoreWidthOut() {
  return useUserStore(store);
}
