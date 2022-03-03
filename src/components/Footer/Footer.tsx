import styles from "./Footer.module.css";

export const Footer: React.FC = ({ children }) => (
  <footer className={styles.footer}>{children}</footer>
);
