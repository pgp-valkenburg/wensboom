export const GROWTH_START = 0.04;
export const WISH_GROWTH = 1 / 250; // wishes till tree is fully grown
export const UNAPPROVED_WISH_GROWTH = WISH_GROWTH / 2;

export const MAX_WISHES = 5;
export const MAX_WISH_LENGTH = 200;
export const WARN_WHEN_CHARACTERS_LEFT = 20;

export const SOCIAL_MEDIA_SITE_TITLE = "PGP Wensboom";
export const SOCIAL_MEDIA_URL = "https://wensboom.pgpvalkenburg.nl/";
export const SOCIAL_MEDIA_HASHTAG = "#pgpvalkenburg";

export const socialMediaShareMessage = (message: string) =>
  `Mijn wens: “${message}” heeft er voor gezorgd dat de boom weer een beetje is gegroeid. Help je mee?`;

const stats = { approved: 250, wishCount: 250 };
export const MOVIE_MODE = false;
export const MOVIE_VOTES = stats.wishCount;
export const MOVIE_GROWTH =
  GROWTH_START +
  (WISH_GROWTH * stats.approved +
    UNAPPROVED_WISH_GROWTH * (stats.wishCount - stats.approved));
export const MOVIE_VOTE_DELAY = 200;
