import styles from "./SimplePage.module.css";

export default function Recipes() {
  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Recipes</h1>
        <p className={styles.text}>
          Browse and save your favorite recipes here.
        </p>
      </div>
    </section>
  );
}


