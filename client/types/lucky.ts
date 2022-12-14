import { Dispatch, SetStateAction } from "react";

export interface CreateLuckyProps {
  luckMangoId: number;
  luckBagBody: string;
  writer: string;
  bagStyle: number;
  bagColor: number;
  nyMoney: number;
}

export interface UserInfoType {
  createdAt: string;
  email: string;
  imgUrl: string;
  memberId: number;
  memberStatus: string;
  modifiedAt: string;
  name: string;
  tot_Money: number;
}

export interface luckMgType {
  luckMangoId: number;
  title: string;
  mangoBody: string;
  bgVideo: string;
  bgImage: string;
  tot_Money: number;
  likeCount: number;
  reveal: boolean;
  member: {
    memberId: number;
    name: string;
    email: string;
    imgUrl: string;
  };
  newLuckBag: number;
  createdAt: string;
  modifiedAt: string;
}

export interface PatchbagProps {
  viewed: boolean;
  bagColor: number;
  bagStyle: number;
}

export interface LongModalProps {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  completeModal: boolean;
  setCompleteModal: Dispatch<SetStateAction<boolean>>;
  luckMgId: number;
  luckMg?: luckMgType;
}

export interface LetterModalProps {
  letterModal: boolean;
  setLetterModal: Dispatch<SetStateAction<boolean>>;
  bag: any;
  setBag: Dispatch<SetStateAction<never[]>>;
  bagList: any;
  luckyBagId: number;
}

export interface LuckData {
  luckContent: string;
  writer: string;
  money: number;
  bagType: number;
}

export interface CheckModalProps {
  confirmModal?: boolean;
  setConfirmModal?: Dispatch<SetStateAction<boolean>>;
  Nobutton?: string;
  Yesbutton?: string;
  firstP?: string;
  secondP?: string;
  confirm?: string;
  create?: boolean;
  data?: LuckData;
  setModal?: Dispatch<SetStateAction<boolean>>;
  completeModal?: boolean;
  setCompleteModal: Dispatch<SetStateAction<boolean>>;
  luckMgId?: number;
}

export interface LuckBagProps {
  luckMangoId?: number;
  currPage: number;
  letterModal?: boolean;
  setCurrPage: Dispatch<SetStateAction<number>>;
  setLetterModal: Dispatch<React.SetStateAction<boolean>>;
  setLuckyBagId: Dispatch<React.SetStateAction<number>>;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  pageInfo: any;
  luckyBagList: any;
  handleLetterModal: (
    id: number,
    style: number,
    color: number,
  ) => Promise<void>;
}
