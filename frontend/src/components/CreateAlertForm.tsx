import { useState, type FormEvent } from "react";
import { useFetch } from "../hooks/useFetch";
import { useAlertsStore } from "../store/useAlertsStore";

const CreateAlertForm = () => {
  const [displayName, setDisplayName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [priority, setPriority] = useState<string>("Low");
  const [arena, setArena] = useState<string>("Center");
  const [status, setStatus] = useState<string>("Handled");
  const [lon, setLon] = useState<number>();
  const [lat, setLat] = useState<number>();
  const [msg, setMsg] = useState<string>();
  const { executingRequest, error } = useFetch();
  const { addAlert } = useAlertsStore();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = await executingRequest("post", `/api/alerts`, {
      displayName,
      description,
      priority,
      arena,
      status,
      lon,
      lat,
    });
    if (data._id) {
      setMsg("התראה נוספה בהצלחה");
      addAlert(data);
    }
  };
  if (error) setMsg(error);
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} onChange={() => setMsg("")}>
        <label>
          שם התראה
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <label>
          תיאור
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          דחיפות
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>
        <label>
          פיקוד
          <select value={arena} onChange={(e) => setArena(e.target.value)}>
            <option value="Center">Center</option>
            <option value="South">South</option>
            <option value="North">North</option>
          </select>
        </label>
        <label>
          סטטוס
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Handled">Handled</option>
            <option value="Active">Active</option>
          </select>
        </label>
        <label>
          נקודת אורך
          <input
            type="number"
            value={lon}
            onChange={(e) => setLon(Number(e.target.value))}
          />
        </label>
        <label>
          נקודת רוחב
          <input
            type="number"
            value={lat}
            onChange={(e) => setLat(Number(e.target.value))}
          />
        </label>
        <button type="submit">צור</button>
      </form>
      {msg && <p>{msg}</p>}
    </>
  );
};

export default CreateAlertForm;
