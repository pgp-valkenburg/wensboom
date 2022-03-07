import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import styles from "./TableList.module.css";

type UseState<T> = [T, Dispatch<SetStateAction<T>>];

export const TableList: React.VFC<{
  itemsState: UseState<string[]>;
  items: { key: string; body: string }[];
}> = ({ itemsState, items }) => {
  const [selectedItems, setSelectedItems] = itemsState;
  const mainCheckBoxRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (mainCheckBoxRef.current === null) return;
    mainCheckBoxRef.current.indeterminate =
      selectedItems.length < items.length && selectedItems.length > 0;
  }, [mainCheckBoxRef, selectedItems, items.length]);

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>
            <input
              ref={mainCheckBoxRef}
              type={"checkbox"}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedItems(() => items.map((e) => e.key));
                } else {
                  setSelectedItems(() => []);
                }
              }}
              checked={selectedItems.length === items.length}
            />
          </th>
          <th>Wish</th>
        </tr>
      </thead>
      <tbody>
        {items.map((entry) => (
          <tr key={entry.key}>
            <td>
              <input
                type={"checkbox"}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedItems((s) => s.concat(entry.key));
                  } else {
                    setSelectedItems((s) => s.filter((e) => e !== entry.key));
                  }
                }}
                checked={selectedItems.includes(entry.key)}
              />
            </td>
            <td>{entry.body}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
