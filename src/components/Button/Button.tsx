import styles from "./Button.module.css";

export const Button: React.FC<{ onClick: () => void; disabled?: boolean }> = ({
  onClick,
  children,
  disabled,
}) => (
  <button className={styles.button} onClick={onClick} disabled={disabled}>
    {children}
  </button>
);
