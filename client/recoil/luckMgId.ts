import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "luckMgIdState",
  storage: sessionStorage,
});

export const luckMgIdState = atom<number>({
  key: `luckMgIdState`,
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
