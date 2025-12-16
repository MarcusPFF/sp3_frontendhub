import { useNavigate } from "react-router";
import styles from "./Home.module.css"; 

export default function Error404() {
  const navigate = useNavigate();

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>404 - Error</h1>
        
        <p className={styles.text}>
          Ups - the page you're looking for does not exist.
        </p>

        <button 
          onClick={() => navigate("/")} 
          className={styles.button}
        >
          Back to homepage
        </button>
      </div>
    </section>
  );
}