import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { api } from "../api";
import type { Response } from "../types/response.type";
import type { AxiosError } from "axios";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [msg, setMsg] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post<Response>("/api/auth/login", {
        username,
        password,
      });
      if (res.data.success) {
        navigate("/");
      } else {
        setMsg("תקלה פנימית");
      }
    } catch (err) {
      const error = err as AxiosError<Response>;
      const serverMsg = error.response?.data.message || "תקלה פנימית";
      setMsg(serverMsg);
    }
  };
  return (
    <>
      <h2>התחברות למערכת</h2>
      <h3>הכנס פרטים</h3>
      <form onSubmit={(e) => handleSubmit(e)} onChange={() => setMsg("")}>
        <label>
          שם משתמש
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          סיסמא
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">התחברות</button>
      </form>
      {msg && <p>{msg}</p>}
    </>
  );
};
