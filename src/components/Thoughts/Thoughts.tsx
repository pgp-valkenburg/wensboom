import { useEffect, useState } from "react";
import { ThoughtBalloon } from "./ThoughtBalloon";

export const Thoughts: React.FC<{ growth: number }> = () => {
  const x = 0;
  const y = 0;
  const animationTexts = [
    "Jinte is lief",
    "Hiddo is lief",
    "Mama is ook heel lief",
  ];

  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setPosition((p) => (p + 1) % animationTexts.length),
      5000
    );
    return () => clearInterval(interval);
  }, [animationTexts.length]);

  return (
    <>
      <ThoughtBalloon
        key={position}
        text={animationTexts[position]}
        position={position % 2 === 0 ? "left" : "right"}
        xOffset={x}
        yOffset={y}
      />
    </>
  );
};
