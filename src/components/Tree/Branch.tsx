import { easeInQuad, easeOutQuad } from "../../utils/easings";
import { grow } from "./grow";
import { GrowProps } from "./types";
import styles from "./Branch.module.css";

export const Branch: React.FC<GrowProps> = ({
  growth,
  angle,
  width,
  bottom,
  height,
  children,
  align = "left",
  startAt = 0,
}) => {
  const g2 = grow(growth, easeInQuad);
  const g = grow(growth, easeOutQuad);
  return (
    <div
      className={styles.branch}
      style={{
        transform: `rotate(${g(angle, startAt)}deg)`,
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
