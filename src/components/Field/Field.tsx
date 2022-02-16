import { className } from "../../utils/className";
import styles from "./Field.module.css";

export const Field: React.FC = ({ children }) => (
  <>
    <div className={styles.grass}></div>
    <div className={styles.field}>
      <div className={styles.root}>{children}</div>
    </div>
    <div
      className={className({
        [styles.grass]: true,
        [styles.grassBottom]: true,
      })}
    ></div>
  </>
);
