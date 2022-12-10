export interface EditMangoProps {
  title: string;
  mangoBody: string;
  bgImage: string;
  luckMangoId: number;
  reveal: boolean;
}

export interface EditModalProps {
  setModal: (flag: boolean) => void;
  greeting: string;
  title: string;
  bgUrl: string;
  reveal: boolean;
  editMode?: boolean;
  luckId?: number;
}
