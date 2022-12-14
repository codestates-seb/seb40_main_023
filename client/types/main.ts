import type { ReactElement } from "react";

export interface SectionProps {
  children: ReactElement[] | ReactElement;
  color?: boolean;
}

export interface TitleProps {
  title: string;
}

export interface ReviewDataProps {
  reviewId?: number;
  reviewBody: string;
  memberId: number;
  createdAt?: string;
  modifiedAt?: string;
}

export interface UserInfoProps {
  memberId: number;
  name: string;
  email: string;
  password: string;
  imgUrl: null;
  nyMoney: number;
  memberStatus: string;
  createdAt: string;
  modifiedAt: string;
}

export interface GalleryDataProps {
  luckMangoId: number;
  title: string;
  mangoBody: null;
  bgVideo: string;
  bgImage: string;
  likeCount: number;
  reveal: null;
  member: {
    memberId: number;
    name: string;
    email: string;
    imgUrl: null;
  };
  createdAt: string;
  modifiedAt: string;
}

export interface NewMessageType {
  mgId: number;
  mgTitle: string;
  mgCount: number;
}
