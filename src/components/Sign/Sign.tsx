import styles from "./Sign.module.css";

export const Sign: React.FC<{ counter: number }> = ({ counter }) => (
  <div className={styles.sign}>
    <h3>Wensen:</h3>
    <p>{counter}</p>
  </div>
);
