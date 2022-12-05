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
  createdAt: string;
  modifiedAt: string;
}

export interface PatchbagProps {
  viewed: boolean;
  bagColor: number;
  bagStyle: number;
}
