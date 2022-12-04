import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "memberName",
  storage: sessionStorage,
});

export const memberNameState = atom<string>({
  key: `memberNameState`,
  default: "",
  effects_UNSTABLE: [persistAtom],
});
