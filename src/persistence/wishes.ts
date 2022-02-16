import { increment, onValue, push, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { AccessState } from "./authentication";
import { db } from "./firebase";

type Wish = {
  body: string;
  approved?: boolean;
};

const wishListRef = ref(db, "wishes");
const wishCountRef = ref(db, "wishCount");

export const addWish = (wish: string) => {
  const wishData: Wish = {
    body: wish,
  };

  set(wishCountRef, increment(1));
  // Get a key for a new Wish.
  const newWishRef = push(wishListRef);
  return set(newWishRef, wishData);
};

export const useWishCount = (accessState: AccessState): number => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (accessState !== "access") return;
    onValue(wishCountRef, (snapshot) => {
      const data = snapshot.val();
      setCount(data);
    });
  }, [accessState]);
  return count;
};
