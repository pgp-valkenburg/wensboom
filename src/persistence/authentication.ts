import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase";

export type AccessState = "pending" | "denied" | "access";

export const useAccess = (): AccessState => {
  const [accessState, setAccessState] = useState<AccessState>("pending");
  useEffect(() => {
    const user = process.env.REACT_APP_PUBLIC_USER;
    const pass = process.env.REACT_APP_PUBLIC_PASSWORD;
    if (user && pass) {
      signInWithEmailAndPassword(auth, user, pass)
        .then(() => {
          setAccessState("access");
        })
        .catch(() => {
          setAccessState("denied");
        });
    } else {
      setAccessState("denied");
    }
  }, []);
  return accessState;
};
