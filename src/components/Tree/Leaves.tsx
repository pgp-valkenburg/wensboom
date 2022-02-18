import { easeInOutCubic, easeOutQuad } from "../../utils/easings";
import { grow } from "./grow";
import { GrowProps } from "./types";
import styles from "./Leaves.module.css";

export const Leaves: React.FC<
  GrowProps & { opacity?: number; startAt?: number }
> = ({
  growth,
  angle,
  width,
  bottom,
  height,
  opacity = 1,
  children,
  align = "left",
  startAt = 0.15,
}) => {
  const g2 = grow(growth, easeInOutCubic);
  const g = grow(growth, easeOutQuad);
  return (
    <div
      className={styles.leaves}
      style={{
        transform: [
          `rotate(${g(angle)}deg)`,
          `translateY(${g(height * 0.25, startAt)}px)`,
          `translateX(-${g2(width * 0.25, startAt)}px)`,
        ].join(" "),
        opacity: opacity,
        height: `${g(height, startAt)}px`,
        width: `${g2(width, startAt)}px`,
        bottom: `${g(bottom)}px`,
        ...(align === "right" ? { right: 0 } : {}),
      }}
    >
      {children}
    </div>
  );
};
