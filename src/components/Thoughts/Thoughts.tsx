import { useEffect, useState } from "react";
import { useThoughts } from "../../persistence/thoughts";
import { easeInQuad, easeOutQuad } from "../../utils/easings";
import { grow } from "../Tree/grow";
import { ThoughtBalloon } from "./ThoughtBalloon";

export const Thoughts: React.FC<{ growth: number }> = ({ growth }) => {
  const g = grow(growth, easeOutQuad);
  const g2 = grow(growth, easeInQuad);
  const x = g2(50);
  const y = g(200);
  const animationTexts = useThoughts();

  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setPosition((p) => (p + 1) % animationTexts.length),
      10_000
    );
    return () => clearInterval(interval);
  }, [animationTexts.length]);

  return (
    <>
      {animationTexts.length > 0 && (
        <ThoughtBalloon
          key={position}
          text={animationTexts[position]}
          position={position % 2 === 0 ? "left" : "right"}
          xOffset={x}
          yOffset={y}
        />
      )}
    </>
  );
};
