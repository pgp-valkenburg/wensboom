import { className } from "../../utils/className";
import styles from "./ThoughtBalloon.module.css";

export const ThoughtBalloon: React.FC<{
  yOffset?: number;
  xOffset?: number;
  truncate?: boolean;
  animate?: boolean;
  position: "left" | "right";
  text: string;
}> = ({
  text,
  position,
  xOffset = 0,
  yOffset = 0,
  truncate = true,
  animate = true,
}) => {
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
          [styles.balloonAnimate]: animate,
          [styles.balloonStatic]: !animate,
          [styles.balloonTruncate]: truncate,
          [styles.balloonLeft]: position === "left",
          [styles.balloonRight]: position === "right",
        })}
      >
        <p>{text}</p>
      </div>
    </div>
  );
};
