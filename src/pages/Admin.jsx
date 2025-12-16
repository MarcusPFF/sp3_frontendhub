import styles from "./Admin.module.css";

export default function Admin() {
  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Admin</h1>
        <p className={styles.text}>Admin page</p>
      </div>
    </section>
  );
}
