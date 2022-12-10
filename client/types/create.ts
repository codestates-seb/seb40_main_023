import { Dispatch, SetStateAction } from "react";

export interface CreateMangoProps {
  memberId: number;
  title: string;
  mangoBody: string;
  bgImage: string;
  reveal: boolean;
}

export interface UploadImgProps {
  images: FileList;
}

export interface previewProps {
  greeting: string;
  edit: boolean;
  setBgUrl?: Dispatch<SetStateAction<string>>;
  bgUrl: string;
}

export interface formDataType {
  images: FileList;
}

export interface shareBtnProps {
  shareQr: any;
  shareKakao: React.MouseEventHandler<HTMLButtonElement>;
  shareUrl: React.MouseEventHandler<HTMLButtonElement>;
}
