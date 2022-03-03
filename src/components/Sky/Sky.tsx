import styles from "./Sky.module.css";

const MIN_HEIGHT = 125;

export const Sky: React.FC<{ growth: number }> = ({ growth, children }) => (
  <div
    className={styles.sky}
    style={{
      maxHeight: `${Math.round(growth * (500 - MIN_HEIGHT)) + MIN_HEIGHT}px`,
    }}
  >
    {children}
  </div>
);
