import styles from "./SimplePage.module.css";

export default function Ingredients() {
  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Ingredients</h1>
        <p className={styles.text}>
          Keep track of what you have in your kitchen.
        </p>
      </div>
    </section>
  );
}


