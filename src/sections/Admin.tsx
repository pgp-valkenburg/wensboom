import { signInWithEmailAndPassword } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { ThoughtBalloon } from "../components/Thoughts/ThoughtBalloon";
import { auth } from "../persistence/firebase";
import {
  approveWishes,
  disapproveWishes,
  useNewWishes,
  useFilteredWishes,
} from "../persistence/manageWishes";
import { LoginPanel } from "./components/LoginPanel";
import { TabBar } from "./components/TabBar";
import { TableList } from "./components/TableList";

const tabs = ["Goedkeuren", "Goedgekeurd", "Afgekeurd"];

const ManageWishes: React.VFC<{ wishes: { key: string; body: string }[] }> = ({
  wishes,
}) => {
  const [selectedWishes, setSelectedWishes] = useState<string[]>([]);
  return (
    <>
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
    </>
  );
};

const ShowWishes: React.VFC<{ approved: boolean }> = ({ approved }) => {
  const wishes = useFilteredWishes(approved);

  return (
    <>
      {wishes.map((wish, index) => (
        <ThoughtBalloon
          truncate={false}
          animate={false}
          text={wish.body}
          key={index}
          position={index % 2 === 0 ? "left" : "right"}
        />
      ))}
    </>
  );
};

const Admin = () => {
  const [loginState, setLoginState] = useState<
    "authenticated" | "denied" | "progress"
  >("denied");
  const wishes = useNewWishes(loginState === "authenticated");
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

  const [activeTab, setActiveTab] = useState(tabs[0]);

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
          <TabBar
            tabs={tabs}
            onTabChange={(item) => setActiveTab(item)}
            activeTab={activeTab}
          />
          {activeTab === tabs[0] && <ManageWishes wishes={wishes} />}
          {activeTab === tabs[1] && <ShowWishes approved={true} />}
          {activeTab === tabs[2] && <ShowWishes approved={false} />}
          <Footer>
            <hr />
            <p>Wensboom management</p>
          </Footer>
        </div>
      )}
    </div>
  );
};
export default Admin;
