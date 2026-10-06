import { create } from "zustand";
import type { UserStore } from "../types/userStore.types";
import { persist } from "zustand/middleware";

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user: user }),
    }),
    { name: "user" },
  ),
);
