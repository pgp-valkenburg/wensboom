import React, { useCallback } from "react";
import { Field } from "../components/Field";
import { Intro } from "../components/Intro";
import { Note } from "../components/Note";
import { Sky } from "../components/Sky";
import { Thoughts } from "../components/Thoughts";
import { Tree } from "../components/Tree";
import { useAccess } from "../persistence/authentication";
import { addWish, useWishCount } from "../persistence/wishes";
import { GROWTH_START, UNAPPROVED_WISH_GROWTH, WISH_GROWTH } from "../settings";
import { plural } from "../utils/plural";

const showWishes = plural(
  (counter) => <p>{counter} wensen in de boom!</p>,
  (counter) => <p>{counter} wens in de boom!</p>,
  () => <p>Nog geen wensen in de boom!</p>
);

const Main = () => {
  const access = useAccess();
  const [submitCounter, confirmedCounter] = useWishCount(access);
  const onSubmit = useCallback((contents: string) => {
    addWish(contents);
  }, []);

  const growth = Math.min(
    1,
    GROWTH_START +
      (confirmedCounter * WISH_GROWTH +
        submitCounter * UNAPPROVED_WISH_GROWTH) *
        (1 - GROWTH_START)
  );

  if (access === "denied") {
    return (
      <div>
        <h1>Bedankt!</h1>
        <p>Helaas, de wensboom actie is voorbij!</p>
      </div>
    );
  }

  return (
    <div>
      <Sky>
        <Field>
          <Tree growth={growth} />
          {access === "access" && <Thoughts growth={growth} />}
        </Field>
      </Sky>
      <Intro>{showWishes(submitCounter + confirmedCounter)}</Intro>

      <Note onSubmit={onSubmit} />
    </div>
  );
};

export default Main;
