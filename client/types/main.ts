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
