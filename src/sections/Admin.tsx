import { signInWithEmailAndPassword } from "firebase/auth";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
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
  const [selectedWishes, setSeletedWishes] = useState<string[]>([]);

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
          <table className={styles.table}>
            <thead>
              <tr>
                <th>
                  <input
                    ref={mainCheckBoxRef}
                    type={"checkbox"}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSeletedWishes(() => wishes.map((e) => e.key));
                      } else {
                        setSeletedWishes(() => []);
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
                          setSeletedWishes((s) => s.concat(entry.key));
                        } else {
                          setSeletedWishes((s) =>
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
              setSeletedWishes([]);
            }}
          >
            Approve
          </button>
          <button
            onClick={() => {
              disapproveWishes(selectedWishes);
              setSeletedWishes([]);
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
