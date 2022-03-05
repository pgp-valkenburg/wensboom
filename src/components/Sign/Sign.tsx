import { useEffect, useState } from "react";
import { className } from "../../utils/className";
import styles from "./Sign.module.css";

const Digit: React.FC<{ char: string }> = ({ char }) => {
  const [prevChar, setChar] = useState(" ");
  const [flipping, setFlipping] = useState("done");

  useEffect(() => {
    setFlipping("start");
    const timer = setTimeout(() => {
      setChar(char);
      setFlipping("end");
    }, 2100);
    return () => clearTimeout(timer);
  }, [char]);

  useEffect(() => {
    if (flipping === "end") {
      setFlipping("done");
    }
  }, [flipping]);

  return (
    <span
      className={className({
        [styles.digit]: true,
        [styles.flip]: flipping === "start",
        [styles.endFlip]: flipping === "done",
      })}
      data-prevchar={prevChar}
    >
      {char}
    </span>
  );
};

const Number: React.FC<{ number: number }> = ({ number }) => {
  const chars = `${number}`.split("");
  return (
    <>
      {chars.map((c, i) => (
        <Digit key={chars.length - i} char={c} />
      ))}
    </>
  );
};

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
      <p>
        <Number number={counter} />
      </p>
    </div>
  );
};
