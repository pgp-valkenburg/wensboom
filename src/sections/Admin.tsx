import { signInWithEmailAndPassword } from "firebase/auth";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
import { auth } from "../persistence/firebase";
import {
  approveWishes,
  disapproveWishes,
  useNewWishes,
} from "../persistence/wishes";
import styles from "./Admin.module.css";

const Admin = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginState, setLoginState] = useState<
    "authenticated" | "denied" | "progress"
  >("denied");
  const wishes = useNewWishes(loginState === "authenticated");
  const [selectedWishes, setSelectedWishes] = useState<string[]>([]);
  const [notificationState, setNotificationState] = useState<string>(
    Notification.permission
  );
  useEffect(() => {
    // var img = '/to-do-notifications/img/icon-128.png';
    const text = "Nieuwe wensen!";
    if (document.visibilityState === "hidden") {
      new Notification("PGP Wensboom", {
        body: text,
        lang: "nl",
        tag: "pgpWensboom",
      });
    }
  }, [wishes]);

  const onUsernameInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setUserName(event.target.value);
    },
    []
  );

  const onPasswordInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    []
  );
  const onLogin = useCallback(() => {
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
  }, [userName, password]);

  const mainCheckBoxRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (mainCheckBoxRef.current === null) return;
    mainCheckBoxRef.current.indeterminate =
      selectedWishes.length < wishes.length && selectedWishes.length > 0;
  }, [mainCheckBoxRef, selectedWishes, wishes.length]);

  return (
    <div>
      <h1>Admin</h1>

      {loginState === "denied" && (
        <div>
          <p>Please login:</p>
          <input
            type="text"
            placeholder="username"
            onChange={onUsernameInput}
          />
          <input
            type="password"
            placeholder="password"
            onChange={onPasswordInput}
          />
          <button onClick={onLogin}>Login</button>
        </div>
      )}

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
          <table className={styles.table}>
            <thead>
              <tr>
                <th>
                  <input
                    ref={mainCheckBoxRef}
                    type={"checkbox"}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedWishes(() => wishes.map((e) => e.key));
                      } else {
                        setSelectedWishes(() => []);
                      }
                    }}
                    checked={selectedWishes.length === wishes.length}
                  />
                </th>
                <th>Wish</th>
              </tr>
            </thead>
            <tbody>
              {wishes.map((entry) => (
                <tr key={entry.key}>
                  <td>
                    <input
                      type={"checkbox"}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedWishes((s) => s.concat(entry.key));
                        } else {
                          setSelectedWishes((s) =>
                            s.filter((e) => e !== entry.key)
                          );
                        }
                      }}
                      checked={selectedWishes.includes(entry.key)}
                    />
                  </td>
                  <td>{entry.body}</td>
                </tr>
              ))}
            </tbody>
          </table>

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
