import { useEffect, useState } from "react";
import { className } from "../../utils/className";
import styles from "./Sign.module.css";

export const Sign: React.FC<{ counter: number }> = ({ counter }) => {
  const [shake, setShake] = useState(false);
  useEffect(() => {
    setShake(true);
    const timer = setTimeout(() => {
      setShake(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [counter]);

  return (
    <div className={className({ [styles.sign]: true, [styles.shake]: shake })}>
      <h3>Wensen:</h3>
      <p>{counter}</p>
    </div>
  );
};
