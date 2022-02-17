import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase";

export type AccessState = "pending" | "denied" | "access";

export const useAccess = (user?: string, pass?: string): AccessState => {
  const [accessState, setAccessState] = useState<AccessState>("pending");
  useEffect(() => {
    if (user && pass) {
      signInWithEmailAndPassword(auth, user, pass)
        .then((credentials) => {
          setAccessState("access");
        })
        .catch(() => {
          setAccessState("denied");
        });
    } else {
      setAccessState("denied");
    }
  }, [user, pass]);
  return accessState;
};
