import { useNavigate } from "react-router";
import type { Alert } from "../types/alerts.types";

const AlertsTable = ({ alerts }: { alerts: Alert[] }) => {
  const navigate = useNavigate();
  const handleClick = (id: string | number) => {
    navigate(`/alert/${id}`);
  };
  return (
    <>
      <h2>טבלת התראות</h2>
      <h3>לפרטי וניהול התראה לחץ על ההתראה בטבלה</h3>
      <table className="alerts-table">
        <thead>
          <tr>
            <th>שם התראה</th>
            <th>פיקוד</th>
            <th>סטטוס</th>
            <th>דחיפות</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert) => (
            <tr key={alert._id} onClick={() => handleClick(alert._id)}>
              <td>{alert.displayName}</td>
              <td>{alert.arena}</td>
              <td>{alert.status}</td>
              <td className={alert.priority.toLowerCase()}>{alert.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AlertsTable;
