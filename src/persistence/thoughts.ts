import { db } from "./firebase";
import { useEffect, useState } from "react";
import {
  equalTo,
  limitToLast,
  onValue,
  orderByChild,
  query,
  ref,
} from "firebase/database";

const wishListRef = ref(db, "wishes");

export const useThoughts = () => {
  const [thoughts, setThoughts] = useState<string[]>([]);

  useEffect(() => {
    const newWishes = query(
      wishListRef,
      orderByChild("approvedAt"),
      limitToLast(10)
    );
    onValue(newWishes, (snapshot) => {
      const wishes: string[] = [];
      snapshot.forEach((e) => {
        wishes.push(e.val().body);
      });
      setThoughts(wishes);
    });
  }, []);
  return thoughts;
};
