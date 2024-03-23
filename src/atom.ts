import { atom } from "recoil";

export const counterState = atom({
  key: "counter",
  default: {
    value: 25 * 60,
    running: false,
  },
});
