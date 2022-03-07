import { useEffect, useState } from "react";
import { AccessState } from "../persistence/authentication";
import { useWishCount } from "../persistence/wishes";
import {
  GROWTH_START,
  MOVIE_GROWTH,
  MOVIE_MODE,
  MOVIE_VOTES,
  MOVIE_VOTE_DELAY,
  UNAPPROVED_WISH_GROWTH,
  WISH_GROWTH,
} from "../settings";

const growthPerMovieVote = (MOVIE_GROWTH - GROWTH_START) / MOVIE_VOTES;

export const useCounters = (access: AccessState) => {
  const [submitCounter, confirmedCounter] = useWishCount(access);
  const [movieVotes, setMovieVotes] = useState(0);

  useEffect(() => {
    if (MOVIE_MODE) {
      const interval = setInterval(() => {
        setMovieVotes((s) => (s < MOVIE_VOTES ? s + 1 : s));
      }, MOVIE_VOTE_DELAY);
      return () => clearInterval(interval);
    }
  }, []);

  const growth = Math.min(
    1,
    MOVIE_MODE
      ? GROWTH_START + movieVotes * growthPerMovieVote
      : GROWTH_START +
          (confirmedCounter * WISH_GROWTH +
            submitCounter * UNAPPROVED_WISH_GROWTH) *
            (1 - GROWTH_START)
  );

  if (MOVIE_MODE) {
    return [movieVotes, growth];
  }

  return [submitCounter + confirmedCounter, growth];
};
