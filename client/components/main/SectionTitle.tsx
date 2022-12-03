import React from "react";
import { TitleProps } from "../../types/main";

const SectionTitle = ({ title }: TitleProps) => {
  return (
    <div className="flex justify-center my-6">
      <div className="max-w-[440px] font-normal text-center break-words text-3xl whitespace-pre-line">
        {title}
      </div>
    </div>
  );
};

export default SectionTitle;
