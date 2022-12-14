import { Dispatch, SetStateAction } from "react";

export interface DeleteMgModalProps {
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
  luckMangoId: number;
}

export interface UserModifyProps {
  handle: () => void;
  userName: string;
  modal: boolean;
  setBgUrl: React.Dispatch<React.SetStateAction<string>>;
  bgUrl: string;
  userImg: FileList;
  setUserImg: React.Dispatch<any>;
}
