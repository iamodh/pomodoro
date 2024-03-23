import { atom } from "recoil";

export const counterState = atom({
  key: "counter",
  default: {
    value: 5,
    running: false,
  },
});

export const statsState = atom({
  key: "stats",
  default: {
    round: 1,
    goal: 0,
  },
});
