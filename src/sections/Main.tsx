import { useCallback } from "react";
import { Field } from "../components/Field";
import { Footer } from "../components/Footer";
import { Intro } from "../components/Intro";
import { Logo } from "../components/Logo";
import { Note } from "../components/Note";
import { Sign } from "../components/Sign";
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
    <main>
      <Logo />
      <Sky growth={growth}>
        <Field>
          <Tree growth={growth} />
          {access === "access" && <Thoughts growth={growth} />}
          {access === "access" && (
            <Sign counter={submitCounter + confirmedCounter} />
          )}
        </Field>
      </Sky>
      <Intro>
        <p>
          Leuk dat je onze wensboom komt bekijken! Deze boom groeit door het
          doen van een wens. Doe een wens! Als deze aansluit bij onze
          kernwaarden “Sociaal, Groen en Duurzaam”, dan zullen we proberen hem
          uit te laten komen!
        </p>
      </Intro>

      {MAX_WISHES > ownWishCounter ? (
        <Note onSubmit={onSubmit}>
          <h3>Mijn wens voor Valkenburg aan de Geul:</h3>
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
      <Footer>
        <p>
          &copy; 2022 Progressieve Groene Partij Valkenburg aan de Geul. Voor
          meer informatie zie{" "}
          <a href="https://pgpvalkenburg.nl">onze website</a>. De wensboom van
          PGP Valkenburg aan de Geul is gebouwd door vrijwilligers, met behulp
          van openbare software.{" "}
          <a href="https://github.com/pgp-valkenburg/wensboom/">
            De broncode is openbaar.
          </a>
        </p>
      </Footer>
    </main>
  );
};

export default Main;
