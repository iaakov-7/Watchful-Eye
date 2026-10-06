import { NavLink, useNavigate } from "react-router";
import { useUserStore } from "../store/useUserStore";
import { api } from "../api";
import type { Response } from "../types/response.type";
import type { AxiosError } from "axios";

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  const handleLogout = async () => {
    try {
      await api.post<Response>("/api/auth/logout");
    } catch (err) {
      const error = err as AxiosError<Response>;
      const serverMsg = error.response?.data.message || "תקלה פנימית";
      console.log(serverMsg);
    } finally {
      navigate("/login");
      setUser(null);
    }
  };
  return (
    <header>
      <nav>
        <NavLink
          to={"/alert/new"}
          className={({ isActive }) =>
            isActive ? "active-link nav-link" : "nav-link"
          }
        >
          יצירת התראה
        </NavLink>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? "active-link nav-link" : "nav-link"
          }
        >
          עמוד הבית
        </NavLink>

        {user?.role === "admin" && (
          <NavLink
            to={"/admin"}
            className={({ isActive }) =>
              isActive ? "active-link nav-link" : "nav-link"
            }
          >
            ניהול משתמשים
          </NavLink>
        )}
      </nav>
      <div className="logo">עין צופיה</div>
      <div className="username-logout">
        <p>משתמש מחובר:</p>
        <p>{user?.username}</p>
        <button onClick={handleLogout}>התנתקות</button>
      </div>
    </header>
  );
};

export default Header;
