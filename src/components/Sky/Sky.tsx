import styles from "./Sky.module.css";

export const Sky: React.FC = ({ children }) => (
  <div className={styles.sky}>{children}</div>
);
