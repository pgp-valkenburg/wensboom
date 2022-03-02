import { useCallback, useState } from "react";

export const useLocalWishCount = (): [number, () => void] => {
  const [wishesDone, setWishesDone] = useState(
    parseInt(window.localStorage.getItem("wishCount") || "0", 10)
  );

  const setWishCount = useCallback(() => {
    window.localStorage.setItem("wishCount", `${wishesDone + 1}`);
    setWishesDone((e) => e + 1);
  }, [wishesDone]);

  return [wishesDone, setWishCount];
};
