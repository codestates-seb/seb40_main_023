import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { v1 } from "uuid";

const { persistAtom } = recoilPersist();

export const userState = atom<boolean>({
  key: `userState`,
  default: false,
  effects_UNSTABLE: [persistAtom],
});
