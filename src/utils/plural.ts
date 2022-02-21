import { ReactChild } from "react";

type NumString = (amount: number) => ReactChild;

export const plural =
  (oneOrMore: NumString, one: NumString, zero?: NumString): NumString =>
  (amount) => {
    if (amount === 1) return one(amount);
    if (amount === 0) return zero ? zero(amount) : oneOrMore(amount);
    return oneOrMore(amount);
  };
