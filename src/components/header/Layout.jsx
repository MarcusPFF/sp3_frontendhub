import { NavLink, Outlet, useNavigate } from "react-router";
import { useAuth } from "../../security/Auth";
import facade from "../../apiFacade";
import logo from "../../assets/logo.png";
import styles from "./Layout.module.css";

export default function Layout() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getNavClass = ({ isActive }) =>
    isActive ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem;

  return (
    <div className={styles.appWrapper}>
      <header className={styles.header}>
        <div className={styles.logoWrapper}>
          <img src={logo} alt="Cook & Recipe logo" className={styles.logo} />
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <NavLink to="/" end className={getNavClass}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/recipes" className={getNavClass}>Recipes</NavLink>
            </li>
            <li>
              <NavLink to="/ingredients" className={getNavClass}>Ingredients</NavLink>
            </li>
            <li>
              <NavLink to="/about" className={getNavClass}>About us</NavLink>
            </li>

            {!isLoggedIn  ?
              (<li>
                <NavLink to="/login" className={getNavClass}>Login</NavLink>
              </li>) 
              : 
              (<>
                <li className={styles.loginStatus}>
                  <button onClick={handleLogout} className={styles.navItem}>
                    Logout
                  </button>
                </li>
                <li>
                  {facade.hasUserAccess("admin", isLoggedIn) ? 
                    (<NavLink to="/admin" className={getNavClass}>
                      Admin
                    </NavLink>) 
                    : 
                    (<span className={styles.navItem} style={{ cursor: "default", color: "#94a3b8" }}>
                      Hello, {user.username}
                    </span>
                    )
                  }
                </li>
              </>)
            }
          </ul>
        </nav>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

