import React, { useCallback } from "react";
import { Field } from "../components/Field";
import { Note } from "../components/Note";
import { Sky } from "../components/Sky";
import { Thoughts } from "../components/Thoughts";
import { Tree } from "../components/Tree";
import { useAccess } from "../persistence/authentication";
import { addWish, useWishCount } from "../persistence/wishes";

const GROWTH_START = 0.04;
const WISH_GROWTH = 0.01;

const Main = () => {
  const access = useAccess();
  const counter = useWishCount(access);
  const onSubmit = useCallback((contents: string) => {
    addWish(contents);
  }, []);

  const growth = Math.min(
    1,
    GROWTH_START + counter * WISH_GROWTH * (1 - GROWTH_START)
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
      <p>{counter} wensen in de boom!</p>

      <Note onSubmit={onSubmit} />
    </div>
  );
};

export default Main;
