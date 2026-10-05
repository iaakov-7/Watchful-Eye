import type { Alert } from "./alerts.types";

export interface AlertsStore {
  alerts: Alert[];
  setAlerts: (alerts: Alert[]) => void;
  updateAlert: (alert: Alert, id: string | number) => void;
  deleteAlert: (id: number | string) => void;
}
