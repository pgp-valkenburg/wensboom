import { useEffect, useState } from "react";
import { className } from "../../utils/className";
import { easeInOutCubic, easeInQuad, easeOutQuad } from "../../utils/easings";
import { Branch } from "./Branch";
import { grow } from "./grow";
import { Leaves } from "./Leaves";
import styles from "./Tree.module.css";

export const Tree: React.VFC<{ growth: number }> = ({ growth }) => {
  const g3 = grow(growth, easeInOutCubic);
  const g2 = grow(growth, easeInQuad);
  const g = grow(growth, easeOutQuad);
  const [startGrowth, setStartGrowth] = useState(growth);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartGrowth(growth);
    }, 3000);
    return () => clearTimeout(timer);
  }, [growth]);

  return (
    <div className={styles.position}>
      <div
        className={className({
          [styles.tree]: true,
          [styles.shake]: startGrowth !== growth,
        })}
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
          >
            <Branch
              growth={growth}
              angle={-25}
              width={20 * 1.3}
              bottom={110}
              height={130}
            >
              <Leaves
                growth={growth}
                angle={-25}
                width={130}
                bottom={110}
                height={130}
                startAt={0.05}
              />
              <Leaves
                growth={growth}
                angle={45}
                width={230}
                bottom={80}
                height={210}
                opacity={0.9}
              />
            </Branch>
            <Branch
              growth={growth}
              angle={25}
              width={22 * 1.3}
              bottom={110}
              height={130}
              align="right"
            >
              <Leaves
                growth={growth}
                angle={-15}
                width={230}
                bottom={110}
                height={230}
              />
            </Branch>
          </Branch>
          <Branch
            growth={growth}
            angle={40}
            width={40 * 1.3}
            bottom={110}
            height={120}
            align="right"
            startAt={0.1}
          >
            <Branch
              growth={growth}
              angle={-50}
              width={20 * 1.3}
              bottom={30}
              height={100}
              startAt={0.15}
            >
              <Leaves
                growth={growth}
                angle={16}
                width={220}
                bottom={90}
                height={200}
                startAt={0.4}
                opacity={0.95}
              />
            </Branch>
            <Branch
              growth={growth}
              angle={-30}
              width={20 * 1.3}
              bottom={100}
              height={130}
              startAt={0.25}
            >
              <Leaves
                growth={growth}
                angle={5}
                width={220}
                bottom={90}
                height={200}
                startAt={0.35}
              />
            </Branch>
            <Branch
              growth={growth}
              angle={25}
              width={22 * 1.3}
              bottom={100}
              height={130}
              align="right"
              startAt={0.35}
            />
            <Leaves
              growth={growth}
              angle={-15}
              width={180}
              bottom={105}
              height={180}
              startAt={0.45}
              opacity={0.8}
            />
          </Branch>
        </Branch>
        <Branch
          growth={growth}
          angle={35}
          width={80 * 1.3}
          bottom={170}
          height={130}
          align={"right"}
        >
          <Branch
            growth={growth}
            angle={-60}
            width={20 * 1.3}
            bottom={30}
            height={70}
            startAt={0.55}
          >
            <Leaves
              growth={growth}
              angle={5}
              width={80}
              bottom={65}
              height={140}
              startAt={0.75}
              opacity={0.98}
            />
          </Branch>
          <Branch
            growth={growth}
            angle={-40}
            width={60 * 1.3}
            bottom={110}
            height={170}
          >
            <Branch
              growth={growth}
              angle={-25}
              width={40 * 1.3}
              bottom={130}
              height={150}
            >
              <Leaves
                growth={growth}
                angle={5}
                width={220}
                bottom={100}
                height={200}
                startAt={0}
              />
              <Leaves
                growth={growth}
                angle={-45}
                width={120}
                bottom={70}
                height={150}
                startAt={0.15}
                opacity={0.95}
              />
            </Branch>
            <Branch
              growth={growth}
              angle={25}
              width={28 * 1.3}
              bottom={140}
              height={130}
              align="right"
            >
              <Leaves
                growth={growth}
                angle={-10}
                width={180}
                bottom={120}
                height={200}
                startAt={0.05}
                opacity={0.95}
              />
            </Branch>
            <Branch
              growth={growth}
              angle={50}
              width={22}
              bottom={60}
              height={130}
              startAt={0.25}
              align="right"
            >
              <Leaves
                growth={growth}
                angle={-25}
                width={250}
                bottom={90}
                height={250}
                startAt={0.15}
                opacity={0.9}
              />
              <Leaves
                growth={growth}
                angle={25}
                width={180}
                bottom={90}
                height={200}
                startAt={0.05}
                opacity={0.95}
              />
            </Branch>
          </Branch>
          <Branch
            growth={growth}
            angle={50}
            width={40 * 1.3}
            bottom={110}
            height={120}
            align="right"
          >
            <Branch
              growth={growth}
              angle={-50}
              width={20 * 1.3}
              bottom={30}
              height={100}
              startAt={0.2}
            />
            <Branch
              growth={growth}
              angle={-30}
              width={20 * 1.3}
              bottom={110}
              height={130}
            >
              <Leaves
                growth={growth}
                angle={-10}
                width={220}
                bottom={120}
                height={250}
                startAt={0.05}
                opacity={0.95}
              />
            </Branch>
            <Branch
              growth={growth}
              angle={25}
              width={22 * 1.3}
              bottom={110}
              height={130}
              align="right"
              startAt={0.1}
            >
              <Leaves
                growth={growth}
                angle={-15}
                width={150}
                bottom={100}
                height={150}
                startAt={0.15}
                opacity={0.9}
              />
            </Branch>
          </Branch>
        </Branch>
      </div>
      <div
        className={styles.shade}
        style={{
          width: `${g3(500)}px`,
          left: `-${g3(250)}px`,
          height: `${g3(80)}px`,
          bottom: `-${g3(40)}px`,
        }}
      ></div>
    </div>
  );
};
