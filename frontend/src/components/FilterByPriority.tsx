import { useState } from "react";
import type { Alert } from "../types/alerts.types";

const FilterByPriority = ({
  alerts,
  set,
}: {
  alerts: Alert[];
  set: (alerts: Alert[]) => void;
}) => {
  const [priority, setPriority] = useState<string>("Low");
  const handleClick = () => {
    const filterdAlerts = alerts.filter((alert) => alert.priority === priority);
    set(filterdAlerts);
  };
  return (
    <div>
      <p>סינון התראות לפי דחיפות</p>
      <section>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button onClick={handleClick}>סנן</button>
      </section>
    </div>
  );
};

export default FilterByPriority;
