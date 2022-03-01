import { ReactChild } from "react";

type NumToReactChild = (amount: number) => ReactChild;

export const plural =
  (
    oneOrMore: NumToReactChild,
    one: NumToReactChild,
    zero?: NumToReactChild
  ): NumToReactChild =>
  (amount) => {
    if (amount === 1) return one(amount);
    if (amount === 0) return zero ? zero(amount) : oneOrMore(amount);
    return oneOrMore(amount);
  };
