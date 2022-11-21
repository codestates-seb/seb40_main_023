import type { ReactElement } from "react";
export interface Mango {
  title: string;
}
export interface NotifyProps {
  message: string;
  icon?: any;
}
export interface SectionProps {
  children: ReactElement[] | ReactElement;
  color?: boolean;
}
export interface TitleProps {
  title: string;
}
