import { useEffect, useState } from "react";
import AlertsMap from "../components/AlertsMap";
import { useAlertsStore } from "../store/useAlertsStore";
import { useFetch } from "../hooks/useFetch";
import AlertsTable from "../components/AlertsTable";
import SearchByName from "../components/SearchByName";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router";
import FilterByArena from "../components/FilterByArena";
import FilterByPriority from "../components/FilterByPriority";

const HomPage = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  if (!user) {
    navigate("/login");
  }
  const { alerts, setAlerts } = useAlertsStore();
  const [alertsForDisplay, setAlertsForDisplay] = useState(alerts);
  const { executingRequest, isLoading, error } = useFetch();
  useEffect(() => {
    executingRequest(
      "get",
      `/api/alerts${user?.role === "arena_user" && user.assignedArena !== "All" ? `?arena=${user.assignedArena}` : `/`}`,
    ).then((data) => setAlerts(data));
  }, []);
  useEffect(() => {
    setAlertsForDisplay(alerts);
  }, [alerts]);
  if (isLoading) return <p>טוען נתונים...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      <h1>אפליקציית - עין צופיה</h1>
      <div className="filter-and-search">
        <SearchByName alerts={alerts} set={setAlertsForDisplay} />
        <FilterByArena alerts={alerts} set={setAlertsForDisplay} />
        <FilterByPriority alerts={alerts} set={setAlertsForDisplay} />
        <button className="display-all-btn" onClick={() => setAlertsForDisplay(alerts)}>
          להצגת כל ההתראות
        </button>
      </div>
      {alertsForDisplay.length > 0 ? (
        <>
          <AlertsTable alerts={alertsForDisplay} />
          <h2>מפת התראות</h2>
        </>
      ) : (
        <h3>אין התראות להצגה</h3>
      )}
      <AlertsMap alerts={alertsForDisplay} height={500} />
    </>
  );
};

export default HomPage;
