import { type } from "os";
import React, { useCallback } from "react";
import { Field } from "../components/Field";
import { Intro } from "../components/Intro";
import { Note } from "../components/Note";
import { Sky } from "../components/Sky";
import { SocialMediaShare } from "../components/SocialMediaShare";
import { Thoughts } from "../components/Thoughts";
import { Tree } from "../components/Tree";
import { useAccess } from "../persistence/authentication";
import { useLocalWishCount } from "../persistence/localWishes";
import { addWish, useWishCount } from "../persistence/wishes";
import {
  GROWTH_START,
  MAX_WISHES,
  SOCIAL_MEDIA_HASHTAG,
  SOCIAL_MEDIA_SITE_TITLE,
  SOCIAL_MEDIA_URL,
  UNAPPROVED_WISH_GROWTH,
  WISH_GROWTH,
} from "../settings";
import { plural } from "../utils/plural";

const showWishes = plural(
  (counter) => <p>{counter} wensen in de boom!</p>,
  (counter) => <p>{counter} wens in de boom!</p>,
  () => <p>Nog geen wensen in de boom!</p>
);

const Main = () => {
  const access = useAccess();
  const [submitCounter, confirmedCounter] = useWishCount(access);
  const [ownWishCounter, increaseOwnWishCounter] = useLocalWishCount();
  const onSubmit = useCallback(
    (contents: string) => {
      addWish(contents);
      increaseOwnWishCounter();
    },
    [increaseOwnWishCounter]
  );

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

      {MAX_WISHES > ownWishCounter ? (
        <Note onSubmit={onSubmit}>
          <h3>Mijn wens:</h3>
        </Note>
      ) : (
        <Intro>
          <h3>Wow, je hebt al {ownWishCounter} wensen gedaan!</h3>
          <p>
            Bedankt voor je bijdrage. Meer wensen doen is voor nu uitgezet, om
            anderen ook een kans te geven op een bijdrage.
          </p>
          <p>Uiteraard kun je wel de wensboom delen met anderen!</p>
          <SocialMediaShare
            url={SOCIAL_MEDIA_URL}
            message={
              "Laat je wens voor Valkenburg aan de Geul horen via de PGP Wensboom"
            }
            hashTag={SOCIAL_MEDIA_HASHTAG}
            pageTitle={SOCIAL_MEDIA_SITE_TITLE}
          />
        </Intro>
      )}
    </div>
  );
};

export default Main;
