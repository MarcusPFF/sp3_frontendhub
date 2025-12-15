import logo from "../assets/logo.png";
import styles from "./Login.module.css";

export default function Login() {
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
            <form className={styles.form}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className={styles.input}
                  placeholder="Enter your username"
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
                />
              </div>

              <button type="button" className={styles.button}>
                Login / Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

