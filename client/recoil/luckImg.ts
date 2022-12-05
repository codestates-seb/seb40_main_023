import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "luckImgState",
  storage: sessionStorage,
});

export const luckImgState = atom<string>({
  key: `luckImgState`,
  default: "",
  effects_UNSTABLE: [persistAtom],
});
