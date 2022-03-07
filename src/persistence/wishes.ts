import {
  increment,
  limitToFirst,
  onValue,
  push,
  query,
  ref,
  set,
  equalTo,
  orderByChild,
  update,
} from "firebase/database";
import { useEffect, useState } from "react";
import { AccessState } from "./authentication";
import { db } from "./firebase";

type Wish = {
  body: string;
  approved?: boolean;
};

const wishListRef = ref(db, "wishes");
const wishCountRef = ref(db, "wishCount");
const approvedCountRef = ref(db, "approvedCount");

export const addWish = (wish: string) => {
  const wishData: Wish = {
    body: wish,
  };

  set(wishCountRef, increment(1));
  // Get a key for a new Wish.
  const newWishRef = push(wishListRef);
  return set(newWishRef, wishData);
};

export const useWishCount = (
  accessState: AccessState
): [wishCount: number, approvedCount: number] => {
  const [wishCount, setWishCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);

  useEffect(() => {
    if (accessState !== "access") return;
    onValue(wishCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setWishCount(data);
      }
    });

    onValue(approvedCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setApprovedCount(data);
      }
    });
  }, [accessState]);
  return [wishCount - approvedCount, approvedCount];
};
