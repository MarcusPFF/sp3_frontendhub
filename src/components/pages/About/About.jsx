import styles from "../../css-modules/SimplePage.module.css";

export default function About() {
  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>About us</h1>
        <p className={styles.text}>
          Cook & Recipe is a simple place to collect recipes and ingredients.
        </p>
      </div>
    </section>
  );
}

