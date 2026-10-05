import type { Alert } from "../types/alerts.types";

const AlertsTable = ({ alerts }: { alerts: Alert[] }) => {
  return (
    <table className="alerts-table">
      <thead>
        <tr>
          <th>שם התראה</th>
          <th>סטטוס</th>
          <th>דחיפות</th>
        </tr>
      </thead>
      <tbody>
        {alerts.map((alert) => (
          <tr key={alert._id}>
            <th>{alert.displayName}</th>
            <th>{alert.status}</th>
            <th className={alert.priority.toLowerCase()}>{alert.priority}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AlertsTable;
