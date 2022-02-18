import { className } from "../../utils/className";
import styles from "./ThoughtBalloon.module.css";

export const ThoughtBalloon: React.FC<{
  yOffset?: number;
  xOffset?: number;
  position: "left" | "right";
  text: string;
}> = ({ text, position, xOffset = 0, yOffset = 0 }) => {
  return (
    <div
      style={{
        transform: `translate(${
          xOffset * (position === "left" ? -1 : 1)
        }px, ${-yOffset}px)`,
      }}
    >
      <div
        className={className({
          [styles.balloon]: true,
          [styles.balloonLeft]: position === "left",
          [styles.balloonRight]: position === "right",
        })}
      >
        {text}
      </div>
    </div>
  );
};
