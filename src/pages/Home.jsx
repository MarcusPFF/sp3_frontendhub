import styles from "./Home.module.css";
import logo from "../assets/logo.png";

export default function Home() {
  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <img src={logo} alt="Cook & Recipe logo" className={styles.logo} />
        <h1 className={styles.title}>Cook & Recipe</h1>
        <p className={styles.text}>
          Find simple, tasty recipes and keep track of your ingredients.
        </p>
      </div>
    </section>
  );
}


