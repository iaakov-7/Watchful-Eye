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
      <SearchByName alerts={alerts} set={setAlertsForDisplay} />
      {alertsForDisplay.length > 0 ? (
        <>
          <AlertsTable alerts={alertsForDisplay} />
          <h2>מפת התראות</h2>
          <AlertsMap alerts={alertsForDisplay} height={500} />
        </>
      ) : (
        <h3>אין התראות</h3>
      )}
    </>
  );
};

export default HomPage;
