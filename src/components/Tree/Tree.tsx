import styles from "./Tree.module.css";

const grow =
  (growth: number) =>
  (max: number, startAt = 0, min = 0): number => {
    if (growth < startAt) return min;
    const factor = (growth - startAt) / (1 - startAt);

    return max * factor + min * (1 - factor);
  };

const Branch: React.FC<{
  growth: number;
  angle: number;
  width: number;
  bottom: number;
  height: number;
  align?: "left" | "right";
}> = ({ growth, angle, width, bottom, height, children, align = "left" }) => {
  const g2 = grow(growth * growth);
  const g = grow(1 - Math.pow(1 - growth, 3));
  return (
    <div
      className={styles.branch}
      style={{
        transform: `rotate(${g(angle, 0.1)}deg)`,
        height: `${g(height)}px`,
        width: `${g2(width)}px`,
        bottom: `${g(bottom)}px`,
        ...(align === "right" ? { right: 0 } : {}),
      }}
    >
      {children}
    </div>
  );
};

export const Tree: React.VFC<{ growth: number }> = ({ growth }) => {
  const g2 = grow(growth * growth);
  const g = grow(1 - Math.pow(1 - growth, 3));
  return (
    <div className={styles.position}>
      <div
        className={styles.tree}
        style={{
          height: `${g(200)}px`,
          width: `${g2(160)}px`,
          left: `-${g2(80)}px`,
        }}
      >
        <Branch
          growth={growth}
          angle={-35}
          width={60 * 1.3}
          bottom={170}
          height={130}
        >
          <Branch
            growth={growth}
            angle={-35}
            width={30 * 1.3}
            bottom={110}
            height={130}
          />
          <Branch
            growth={growth}
            angle={40}
            width={40 * 1.3}
            bottom={110}
            height={120}
            align="right"
          />
        </Branch>
        <Branch
          growth={growth}
          angle={35}
          width={80 * 1.3}
          bottom={170}
          height={130}
          align={"right"}
        />
      </div>
      <div
        className={styles.shade}
        style={{
          width: `${g2(500)}px`,
          left: `-${g2(250)}px`,
          height: `${g2(80)}px`,
          bottom: `-${g2(40)}px`,
        }}
      ></div>
    </div>
  );
};
