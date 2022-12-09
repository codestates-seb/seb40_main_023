import { Dispatch, SetStateAction } from "react";

export interface CreateMangoProps {
  memberId: number;
  title: string;
  mangoBody: string;
  bgImage: string;
  reveal: boolean;
}

export interface UploadImgProps {
  images: any;
}

export interface previewProps {
  greeting: string;
  edit: boolean;
  setBgUrl: Dispatch<SetStateAction<string>>;
  bgUrl: string;
}
