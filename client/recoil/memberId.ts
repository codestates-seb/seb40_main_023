import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const memberIdState = atom({
  key: `memberIdState`,
  default: {
    memberId: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
