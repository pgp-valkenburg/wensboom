import { signInWithEmailAndPassword } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../components/Button";
import { auth } from "../persistence/firebase";
import {
  approveWishes,
  disapproveWishes,
  useNewWishes,
} from "../persistence/wishes";
import { LoginPanel } from "./components/LoginPanel";
import { TableList } from "./components/TableList";

const Admin = () => {
  const [loginState, setLoginState] = useState<
    "authenticated" | "denied" | "progress"
  >("denied");
  const wishes = useNewWishes(loginState === "authenticated");
  const [selectedWishes, setSelectedWishes] = useState<string[]>([]);
  const [notificationState, setNotificationState] = useState<string>(
    "Notification" in window ? Notification.permission : "denied"
  );
  useEffect(() => {
    if (document.visibilityState !== "hidden") return;
    const text = "Nieuwe wensen!";
    Notification.requestPermission().then((result) => {
      if (result === "granted") {
        new Notification("PGP Wensboom", {
          body: text,
          lang: "nl",
          tag: "pgpWensboom",
        });
      }
    });
  }, [loginState, wishes]);

  const onLogin = useCallback((userName: string, password: string) => {
    setLoginState("progress");
    signInWithEmailAndPassword(auth, userName, password)
      .then((credentials) => {
        if (credentials.user.email?.startsWith("admin")) {
          setLoginState("authenticated");
        } else {
          setLoginState("denied");
        }
      })
      .catch(() => {
        setLoginState("denied");
      });
  }, []);

  return (
    <div>
      <h1>Admin</h1>

      {loginState === "denied" && <LoginPanel onLogin={onLogin} />}
      {loginState === "authenticated" && wishes && (
        <div>
          {notificationState === "default" && (
            <Button
              onClick={() => {
                Notification.requestPermission().then((result) => {
                  setNotificationState(result);
                });
              }}
            >
              Enable notifications
            </Button>
          )}
          <TableList
            itemsState={[selectedWishes, setSelectedWishes]}
            items={wishes}
          />

          <p>{selectedWishes.length} Items geselecteerd.</p>
          <button
            onClick={() => {
              approveWishes(selectedWishes);
              setSelectedWishes([]);
            }}
          >
            Approve
          </button>
          <button
            onClick={() => {
              disapproveWishes(selectedWishes);
              setSelectedWishes([]);
            }}
          >
            Disapprove
          </button>
        </div>
      )}
    </div>
  );
};
export default Admin;
