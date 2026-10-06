import { useEffect, useState, type FormEvent } from "react";
import type { Alert } from "../types/alerts.types";
import { useFetch } from "../hooks/useFetch";
import { useAlertsStore } from "../store/useAlertsStore";

const UpdateForm = ({
  alert,
  setISupdateForm,
  setMsg,
}: {
  alert: Alert | any;
  setISupdateForm: (bool: boolean) => void;
  setMsg: (msg: string) => void;
}) => {
  const [displayName, setDisplayName] = useState<string>(alert.displayName);
  const [description, setDescription] = useState<string>(alert.description);
  const [priority, setPriority] = useState<string>(alert.priority);
  const [arena, setArena] = useState<string>(alert.arena);
  const [status, setStatus] = useState<string>(alert.status);
  const [lon, setLon] = useState<number>(alert.lon);
  const [lat, setLat] = useState<number>(alert.lat);

  const { executingRequest, error } = useFetch();
  const { updateAlert } = useAlertsStore();
  useEffect(() => {
    setMsg("");
  }, []);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = await executingRequest("put", `/api/alerts/${alert._id}`, {
      displayName,
      description,
      priority,
      arena,
      status,
      lon,
      lat,
    });
    if (data._id) {
      setMsg("העדכון הצליח");

      setISupdateForm(false);
      updateAlert(
        {
          _id: alert._id,
          displayName,
          description,
          arena,
          status,
          priority,
          lon,
          lat,
        },
        alert._id,
      );
    }
    if (error) setMsg(error);
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
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
        <button type="submit">עדכן</button>
      </form>
    </>
  );
};

export default UpdateForm;
