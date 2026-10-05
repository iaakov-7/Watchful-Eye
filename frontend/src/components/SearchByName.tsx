import { useState } from "react";
import type { Alert } from "../types/alerts.types";

const SearchByName = ({
  alerts,
  set,
}: {
  alerts: Alert[];
  set: (alerts: Alert[]) => void;
}) => {
  const [search, setSearch] = useState<string | any>();
  const handleClick = () => {
    const filterdAlerts = alerts.filter((alert) =>
      alert.displayName.includes(search),
    );
    set(filterdAlerts);
  };
  return (
    <>
      <h3>חיפוש לפי שם</h3>
      <input
        type="text"
        value={search}
        placeholder="bla bla"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleClick}>חפש</button>
    </>
  );
};

export default SearchByName;
