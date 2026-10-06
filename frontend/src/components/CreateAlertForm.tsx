import { useState, type FormEvent } from "react";
import { useAlertsStore } from "../store/useAlertsStore";
import { useUserStore } from "../store/useUserStore";
import { api } from "../api";
import type { AxiosError } from "axios";
import type { Response } from "../types/response.type";

const CreateAlertForm = () => {
  const { user } = useUserStore();
  const [displayName, setDisplayName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [priority, setPriority] = useState<string>("Low");
  const [arena, setArena] = useState<string>(
    user?.role === "arena_user" && user?.assignedArena !== "All"
      ? `${user?.assignedArena}`
      : "Center",
  );
  const [status, setStatus] = useState<string>("Handled");
  const [lon, setLon] = useState<number>();
  const [lat, setLat] = useState<number>();
  const [msg, setMsg] = useState<string>();

  const { addAlert } = useAlertsStore();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post(`/api/alerts`, {
        displayName,
        description,
        priority,
        arena,
        status,
        lon,
        lat,
      });
      if (res.data.success) {
        addAlert(res.data.data);
        setMsg("התראה נוספה בהצלחה");
      }
    } catch (err) {
      const error = err as AxiosError<Response>;
      const serverMsg = error.response?.data.message || "תקלה פנימית";
      setMsg(serverMsg);
    }
  };

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
          {user?.role === "arena_user" && user?.assignedArena !== "All" ? (
            <select>
              <option value={user.assignedArena}>{user.assignedArena}</option>
              <option>אתה יכול רק בזירה שלך</option>
            </select>
          ) : (
            <select value={arena} onChange={(e) => setArena(e.target.value)}>
              <option value="Center">Center</option>
              <option value="South">South</option>
              <option value="North">North</option>
            </select>
          )}
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
