import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../security/Auth";
import facade from "../apiFacade";
import logo from "../assets/logo.png";
import styles from "./Login.module.css";

export default function Login() {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const { login } = useAuth();
  const navigate = useNavigate();

  const performLogin = async (evt) => {
    evt.preventDefault();
    try {
      await login(loginCredentials.username, loginCredentials.password);

      if (facade.hasUserAccess("admin", true)) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login mislykkedes. Tjek brugernavn og kodeord.");
    }
  };

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <section className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.card}>
          <div className={styles.brandPanel}>
            <img src={logo} alt="Cook & Recipe logo" className={styles.logo} />
            <h1 className={styles.title}>Welcome back</h1>
            <p className={styles.subtitle}>
              Save recipes, track ingredients, and plan your next meal.
            </p>
          </div>

          <div className={styles.formPanel}>
            <form className={styles.form} onSubmit={performLogin}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className={styles.input}
                  placeholder="Enter your username"
                  onChange={onChange}
                  value={loginCredentials.username}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className={styles.input}
                  placeholder="Enter your password"
                  onChange={onChange}
                  value={loginCredentials.password}
                />
              </div>

              <button type="submit" className={styles.button}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}