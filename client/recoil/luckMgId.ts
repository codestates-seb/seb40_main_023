import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const luckMgIdState = atom<number>({
  key: `luckMgIdState`,
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
