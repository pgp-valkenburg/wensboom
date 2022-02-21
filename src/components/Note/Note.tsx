import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { MAX_WISH_LENGTH, WARN_WHEN_CHARACTERS_LEFT } from "../../settings";
import { className } from "../../utils/className";
import { plural } from "../../utils/plural";
import styles from "./Note.module.css";

type Props = {
  onSubmit: (contents: string) => void;
};

type NoteState = "enter-note" | "submitting" | "sharing" | "resetting";

const charsLeft = plural(
  (amount) => <p>nog {amount} karakters over</p>,
  () => <p>nog 1 karakter over</p>,
  () => <p>maximum aantal karakters bereikt</p>
);

export const Note: React.FC<Props> = ({ onSubmit }) => {
  const [contents, setContents] = useState("");
  const [state, setState] = useState<NoteState>("enter-note");

  const onChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value.slice(0, MAX_WISH_LENGTH));
  }, []);

  const onNoteSubmit = useCallback(() => {
    setState("submitting");
  }, []);

  const onNoteReset = useCallback(() => {
    setState("resetting");
  }, []);

  useEffect(() => {
    if (state === "submitting") {
      const timer = setTimeout(() => {
        onSubmit(contents);
        setContents("");
        setState("sharing");
      }, 3000);
      return () => clearTimeout(timer);
    }
    if (state === "resetting") {
      const timer = setTimeout(() => {
        setState("enter-note");
      }, 2000);
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
            [styles.frontFacing]: state === "resetting",
          })}
        >
          <textarea
            value={contents}
            onChange={onChange}
            disabled={!["enter-note", "resetting"].some((s) => s === state)}
            placeholder="Type uw wens voor Valkenburg aan de Geul hier..."
          ></textarea>
          <div className={styles.bottomBar}>
            <button
              disabled={contents.trim().length < 4}
              onClick={onNoteSubmit}
            >
              Make a wish
            </button>
            {contents.length > MAX_WISH_LENGTH - WARN_WHEN_CHARACTERS_LEFT &&
              charsLeft(MAX_WISH_LENGTH - contents.length)}
          </div>
        </div>
        <div
          className={className({
            [styles.shareWish]: true,
            [styles.backFacing]: state === "resetting",
            [styles.invisible]:
              state === "enter-note" || state === "submitting",
          })}
        >
          <h1>Delen! Duimpies!</h1>
          <button onClick={onNoteReset}>Doe nog een wens...</button>
        </div>
      </div>
    </div>
  );
};
