import { api } from "../api";
import type { Response } from "../types/response.type";
import type { User } from "../types/user.type";

const UsersTable = ({
  users,
  setUsers,
}: {
  users: User[];
  setUsers: (users: User[]) => void;
}) => {
  const handleDelete = async (id: string) => {
    try {
      const res = await api.delete<Response>(`/api/auth/${id}`);
      if (res.data.success) {
        setUsers(users.filter((u) => u._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h2>טבלת משתמשים</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>שם משתמש</th>
            <th>תפקיד</th>
            <th>פיקוד</th>
            <th>מייל</th>
            <th>מחיקת משתמש</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>{user.assignedArena}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleDelete(user._id)}>מחק</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
