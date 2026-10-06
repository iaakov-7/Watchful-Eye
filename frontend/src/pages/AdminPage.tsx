import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import UsersTable from "../components/UsersTable";
import type { User } from "../types/user.type";
import RegisterUserForm from "../components/RegisterUserForm";

const AdminPage = () => {
  const { executingRequest, error, isLoading } = useFetch();
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  const [users, setUsers] = useState<User[] | any>();
  const [msg, setMsg] = useState<string>("");
  useEffect(() => {
    executingRequest("get", "/api/auth").then((data) => setUsers(data));
  }, []);
  if (isLoading) return <p>טוען נתונים...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <UsersTable users={users} setUsers={setUsers} />
      <button onClick={() => setIsRegisterForm(true)}>ליצירת משתמש חדש</button>
      {isRegisterForm && (
        <RegisterUserForm
          setIsRegisterForm={setIsRegisterForm}
          setMsg={setMsg}
          users={users}
          setUsers={setUsers}
        />
      )}
      {msg && <p style={{ marginTop: "2rem", fontWeight: "bold" }}>{msg}</p>}
    </div>
  );
};

export default AdminPage;
