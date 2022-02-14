import styles from "./Field.module.css";

export const Field: React.FC = ({ children }) => (
  <div className={styles.field}>
    <div className={styles.root}>{children}</div>
  </div>
);
