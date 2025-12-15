import { NavLink, Outlet } from "react-router";
import logo from "../assets/logo.png";
import styles from "./Layout.module.css";

export default function Layout() {
  return (
    <div className={styles.appWrapper}>
      <header className={styles.header}>
        <div className={styles.logoWrapper}>
          <img src={logo} alt="Cook & Recipe logo" className={styles.logo} />
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navItem} ${styles.navItemActive}`
                    : styles.navItem
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/recipes"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navItem} ${styles.navItemActive}`
                    : styles.navItem
                }
              >
                Recipes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ingredients"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navItem} ${styles.navItemActive}`
                    : styles.navItem
                }
              >
                Ingredients
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navItem} ${styles.navItemActive}`
                    : styles.navItem
                }
              >
                About us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navItem} ${styles.navItemActive}`
                    : styles.navItem
                }
              >
                Login
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
