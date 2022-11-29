import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { v1 } from "uuid";

const { persistAtom } = recoilPersist();

export const memberIdState = atom<number>({
  key: `memberIdState`,
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
