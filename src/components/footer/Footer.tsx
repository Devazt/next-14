import styles from "./footer.module.css";

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Devazt</div>
      <div className={styles.text}>Devazt © 2024. All rights reserved.</div>
    </div>
  );
}
