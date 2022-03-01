import styles from "./Intro.module.css";

export const Intro: React.FC = ({ children }) => (
  <div className={styles.intro}>{children}</div>
);
