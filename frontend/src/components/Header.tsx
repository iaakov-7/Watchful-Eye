import { NavLink } from "react-router";

const Header = () => {
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
      </nav>
      <div className="logo">עין צופיה</div>
    </header>
  );
};

export default Header;
