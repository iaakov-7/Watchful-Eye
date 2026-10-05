import type { Alert } from "./alerts.types";

export interface AlertsStore {
  alerts: Alert[] ;
  setAlerts: (alerts: Alert[]) => void;
}
