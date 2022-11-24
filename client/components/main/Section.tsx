import React from "react";
import { SectionProps } from "../../types/main";

const Section = ({ children, color }: SectionProps) => {
  return (
    <div
      data-aos="fade-up"
      className={`mg-main-section ${color && "bg-mono-bgSection"}`}
    >
      <div>{children}</div>
    </div>
  );
};

export default Section;
