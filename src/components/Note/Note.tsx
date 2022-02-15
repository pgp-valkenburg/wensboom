import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { className } from "../../utils/className";
import styles from "./Note.module.css";

type Props = {
  onSubmit: (contents: string) => void;
};

type NoteState = "enter-note" | "submitting" | "sharing" | "resetting";

export const Note: React.FC<Props> = ({ onSubmit }) => {
  const [contents, setContents] = useState("");
  const [state, setState] = useState<NoteState>("enter-note");

  const onChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  }, []);

  const onNoteSubmit = useCallback(() => {
    setState("submitting");
  }, []);

  useEffect(() => {
    if (state === "submitting") {
      const timer = setTimeout(() => {
        console.log("submitting-note");
        onSubmit(contents);
        setState("sharing");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [state, contents, onSubmit]);

  return (
    <div className={styles.noteArea}>
      <div className={styles.card}>
        <div
          className={className({
            [styles.note]: true,
            [styles.fly]: state === "submitting",
            [styles.sharing]: state === "sharing",
          })}
        >
          <textarea
            value={contents}
            onChange={onChange}
            disabled={state !== "enter-note"}
            placeholder="Type uw wens voor Valkenburg aan de Geul hier..."
          ></textarea>

          <button disabled={contents.trim().length < 4} onClick={onNoteSubmit}>
            Make a wish
          </button>
        </div>
      </div>
    </div>
  );
};
