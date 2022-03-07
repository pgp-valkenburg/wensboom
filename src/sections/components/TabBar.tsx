import { className } from "../../utils/className";
import styles from "./TabBar.module.css";

export const TabBar: React.VFC<{
  tabs: string[];
  activeTab: string;
  onTabChange: (selected: string) => void;
}> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={className({
            [styles.tab]: true,
            [styles.tabSelected]: tab === activeTab,
          })}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
