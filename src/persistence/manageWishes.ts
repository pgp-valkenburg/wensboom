import {
  increment,
  limitToFirst,
  onValue,
  query,
  ref,
  set,
  equalTo,
  orderByChild,
  update,
} from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "./firebase";

const wishListRef = ref(db, "wishes");
const approvedCountRef = ref(db, "approvedCount");

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

export const useFilteredWishes = (approved: boolean) => {
  const [approvedWishes, setApprovedWishes] = useState<
    { key: string; body: string }[]
  >([]);

  useEffect(() => {
    const newWishes = query(
      wishListRef,
      orderByChild("approved"),
      equalTo(approved)
    );
    onValue(newWishes, (snapshot) => {
      const update: { key: string; body: string }[] = [];
      snapshot.forEach((e) => {
        if (e.key) {
          update.push({ key: e.key, body: e.val().body });
        }
      });
      setApprovedWishes(update);
    });
  }, []);
  return approvedWishes;
};

export const approveWishes = (wishList: string[]) => {
  const updates: Record<string, boolean | number> = {};
  wishList.forEach((key) => {
    updates["/wishes/" + key + "/approved"] = true;
    updates["/wishes/" + key + "/approvedAt"] = new Date().getTime();
  });

  return Promise.all([
    update(ref(db), updates),
    set(approvedCountRef, increment(1)),
  ]);
};

export const disapproveWishes = (wishList: string[]) => {
  const updates: Record<string, boolean> = {};
  wishList.forEach((key) => {
    updates["/wishes/" + key + "/approved"] = false;
  });

  return update(ref(db), updates);
};
