import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const memberNameState = atom<string>({
  key: `memberNameState`,
  default: "",
  effects_UNSTABLE: [persistAtom],
});
