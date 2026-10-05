import { create } from "zustand";
import type { AlertsStore } from "../types/alertsStore.types";

export const useAlertsStore = create<AlertsStore>((set) => ({
  alerts: [],
  setAlerts: (alerts) => set({ alerts: alerts }),
}));
