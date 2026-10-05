import { create } from "zustand";
import type { AlertsStore } from "../types/alertsStore.types";

export const useAlertsStore = create<AlertsStore>((set) => ({
  alerts: [],
  setAlerts: (alerts) => set({ alerts: alerts }),
  updateAlert: (toUpdate, id) =>
    set((state) => ({
      alerts: state.alerts.map((a) => (a._id === id ? toUpdate : a)),
    })),
  deleteAlert: (id) =>
    set((state) => ({ alerts: state.alerts.filter((a) => a._id !== id) })),
  addAlert: (newAlert) =>
    set((state) => ({ alerts: [...state.alerts, newAlert] })),
}));
