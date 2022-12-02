import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

// const { persistAtom } = recoilPersist();

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist();

export const userState = atom({
  key: `userState`,
  default: {
    login: false,
  },
  effects_UNSTABLE: [persistAtom],
});
