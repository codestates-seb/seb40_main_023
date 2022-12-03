import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const luckImgState = atom<string>({
  key: `luckImgState`,
  default: "",
  effects_UNSTABLE: [persistAtom],
});
