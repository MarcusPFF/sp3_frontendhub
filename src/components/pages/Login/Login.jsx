import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../security/Auth";
import facade from "../../../apiFacade";
import { logError, logInfo } from "../../../utils/logger";
import { showErrorNotification, showSuccessNotification } from "../../../utils/notification";
import logo from "../../../assets/logo.png";
import styles from "./css-modules/Login.module.css";

export default function Login() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [error, setError] = useState(null);
  const formRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const performLogin = async (evt) => {
    evt.preventDefault();
    setError(null);
    try {
      const username = usernameRef.current.value;
      const password = passwordRef.current.value;
      
      await login(username, password);
      const loggedBackInMsg = "Login successful! Welcome back, " + username + "!";

      logInfo("User logged in successfully", { username });
      showSuccessNotification(loggedBackInMsg);

      if (facade.hasUserAccess("admin", true)) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      const username = usernameRef.current?.value || "";
      logError("Login error", error, { username });
      const errorMsg = error.message || "Login mislykkedes. Tjek brugernavn og kodeord.";
      setError(errorMsg);
      showErrorNotification(errorMsg);
    }
  };

  const performRegister = async (evt) => {
    evt.preventDefault();
    setError(null);
    try {
      const username = usernameRef.current.value;
      const password = passwordRef.current.value;
      
      await register(username, password);
      const registeredMsg = "Registration successful! Welcome, " + username + "!";
      
      logInfo("User registered successfully", { username });
      showSuccessNotification(registeredMsg);

      if (facade.hasUserAccess("admin", true)) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      const username = usernameRef.current?.value || "";
      logError("Register error", error, { username });
      const errorMsg = error.message || "Registrering mislykkedes. Brugernavnet eksisterer måske allerede.";
      setError(errorMsg);
      showErrorNotification(errorMsg);
    }
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setError(null);
  };

  return (
    <section className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.card}>
          <div className={styles.brandPanel}>
            <img src={logo} alt="Cook & Recipe logo" className={styles.logo} />
            <h1 className={styles.title}>
              {isRegisterMode ? 
                              ("Create account") 
                              : 
                              ("Welcome back")
              }
            </h1>
            <p className={styles.subtitle}>
              {isRegisterMode ? 
                              ("Sign up to start saving recipes and tracking ingredients.")
                              : 
                              ("Save recipes, track ingredients, and plan your next meal.")
              }
            </p>
          </div>

          <div className={styles.formPanel}>
            <form ref={formRef} className={styles.form} onSubmit=
            {isRegisterMode ? 
                            (performRegister) 
                            : 
                            (performLogin)
            }>
              {error && 
                (<div className={styles.errorMessage}>
                  {error}
                </div>)
              }
              
              <div className={styles.field}>
                <label className={styles.label} htmlFor="username">
                  Username
                </label>
                <input
                  ref={usernameRef}
                  id="username"
                  type="text"
                  className={styles.input}
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="password">
                  Password
                </label>
                <input
                  ref={passwordRef}
                  id="password"
                  type="password"
                  className={styles.input}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button type="submit" className={styles.button}>
                {isRegisterMode ? 
                                ("Register") 
                                : 
                                ("Login")
                }
              </button>

              <button
                type="button"
                onClick={toggleMode}
                className={styles.toggleButton}
              >
                {isRegisterMode ? 
                                ("Already have an account? Login")
                                : 
                                ("Don't have an account? Register")
                }
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

