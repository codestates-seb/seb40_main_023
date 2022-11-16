import type { ReactElement } from "react";
import React from "react";

type SectionProps = {
  children: ReactElement[] | ReactElement;
  color?: boolean;
};

const Section = ({ children, color }: SectionProps) => {
  return (
    <div className={`mg-main-section ${color && "bg-mono-bgSection"}`}>
      <div>{children}</div>
    </div>
  );
};

export default Section;
