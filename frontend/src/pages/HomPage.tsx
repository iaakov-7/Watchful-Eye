import { useEffect, useState } from "react";
import AlertsMap from "../components/AlertsMap";
import { useAlertsStore } from "../store/useAlertsStore";
import { useFetch } from "../hooks/useFetch";
import AlertsTable from "../components/AlertsTable";
import SearchByName from "../components/SearchByName";

const HomPage = () => {
  const { alerts, setAlerts } = useAlertsStore();
  const [alertsForDisplay, setAlertsForDisplay] = useState(alerts);
  const { executingRequest, isLoading, error } = useFetch();
  useEffect(() => {
    executingRequest("get", "/api/alerts").then((data) => {
      (setAlerts(data), setAlertsForDisplay(data));
    });
  }, []);
  if (isLoading) return <p>טוען נתונים...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      {alerts.length > 0 ? (
        <>
          <AlertsMap alerts={alertsForDisplay} height={500} />
          <SearchByName alerts={alerts} set={setAlertsForDisplay} />
          <h2>טבלת התראות</h2>
          <h3>לפרטי התראה לחץ על ההתראה</h3>
          <AlertsTable alerts={alertsForDisplay} />
        </>
      ) : (
        <p>אין התראות</p>
      )}
    </>
  );
};

export default HomPage;
