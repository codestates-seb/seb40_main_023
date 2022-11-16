import React from "react";

type TitleProps = {
  title: string;
};

const SectionTitle = ({ title }: TitleProps) => {
  return (
    <div className="flex justify-center px-10 my-6">
      <div className="max-w-[400px] font-medium text-center break-words text-3xl whitespace-pre-line">
        {title}
      </div>
    </div>
  );
};

export default SectionTitle;
