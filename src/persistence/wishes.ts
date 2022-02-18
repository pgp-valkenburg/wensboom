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

export const useNewWishes = (authenticated: boolean) => {
  const [unhandledWishes, setUnhandledWishes] = useState<
    { key: string; body: string }[]
  >([]);

  useEffect(() => {
    if (!authenticated) return;
    const newWishes = query(
      wishListRef,
      orderByChild("approved"),
      equalTo(null),
      limitToFirst(50)
    );
    onValue(newWishes, (snapshot) => {
      const update: { key: string; body: string }[] = [];
      snapshot.forEach((e) => {
        if (e.key) {
          update.push({ key: e.key, body: e.val().body });
        }
      });
      setUnhandledWishes(update);
    });
  }, [authenticated]);
  return unhandledWishes;
};

export const approveWishes = (wishList: string[]) => {
  const updates: Record<string, boolean | number> = {};
  wishList.forEach((key) => {
    updates["/wishes/" + key + "/approved"] = true;
    updates["/wishes/" + key + "/approvedAt"] = new Date().getTime();
  });

  return update(ref(db), updates);
};

export const disapproveWishes = (wishList: string[]) => {
  const updates: Record<string, boolean> = {};
  wishList.forEach((key) => {
    updates["/wishes/" + key + "/approved"] = false;
  });

  return update(ref(db), updates);
};
