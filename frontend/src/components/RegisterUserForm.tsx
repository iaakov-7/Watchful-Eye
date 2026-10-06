import { useState, type FormEvent } from "react";
import { api } from "../api";
import type { AxiosError } from "axios";
import type { Response } from "../types/response.type";
import type { User } from "../types/user.type";

const RegisterUserForm = ({
  setIsRegisterForm,
  setMsg,
  users,
  setUsers,
}: {
  setIsRegisterForm: (bool: boolean) => void;
  setMsg: (msg: string) => void;
  users: User[];
  setUsers: (users: User[]) => void;
}) => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("arena_user");
  const [assignedArena, setAassignedArena] = useState<string>("Center");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post<Response>("/api/auth/register", {
        username,
        password,
        email,
        role,
        assignedArena,
      });
      if (res.data.success) {
        const allUsers = [res.data.data, ...users];
        setUsers(allUsers);
        setMsg("משתמש נוצר בהצלחה");
      } else {
        setMsg("תקלה פנימית");
      }
    } catch (err) {
      const error = err as AxiosError<Response>;
      const serverMsg = error.response?.data.message || "תקלה פנימית";
      setMsg(serverMsg);
    } finally {
      setIsRegisterForm(false);
    }
  };
  return (
    <>
      {" "}
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
        <label>
          מייל
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          תפקיד
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="arena_user">arena user</option>
            <option value="general_user">general user</option>
            <option value="admin">admin</option>
          </select>
        </label>
        <label>
          זירה משויכת
          <select
            value={assignedArena}
            onChange={(e) => setAassignedArena(e.target.value)}
          >
            <option value="North">North</option>
            <option value="Center">Center</option>
            <option value="South">South</option>
            <option value="All">All</option>
          </select>
        </label>

        <button type="submit">יצירה</button>
      </form>
    </>
  );
};

export default RegisterUserForm;
