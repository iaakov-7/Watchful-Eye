import { create } from "zustand";
import type { UserStore } from "../types/userStore.types";

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user: user }),
}));
