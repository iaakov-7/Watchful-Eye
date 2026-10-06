import { useState } from "react";
import type { Alert } from "../types/alerts.types";

const FilterByArena = ({
  alerts,
  set,
}: {
  alerts: Alert[];
  set: (alerts: Alert[]) => void;
}) => {
  const [arena, setArena] = useState<string>("Center");
  const handleClick = () => {
    const filterdAlerts = alerts.filter((alert) => alert.arena === arena);
    set(filterdAlerts);
  };
  return (
    <div>
      <p>סינון התראות לפי פיקוד</p>
      <section>
        <select value={arena} onChange={(e) => setArena(e.target.value)}>
          <option value="North">North</option>
          <option value="Center">Center</option>
          <option value="South">South</option>
        </select>
        <button onClick={handleClick}>סנן</button>
      </section>
    </div>
  );
};

export default FilterByArena;
