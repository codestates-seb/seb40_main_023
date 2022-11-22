import React from "react";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="fixed z-50 flex items-center justify-center w-full h-full">
      <div className="relative items-center justify-center rounded-[20px] shadow-context flex bg-white w-[200px] h-[200px]">
        <Image
          width={130}
          height={142}
          src="/images/char/char-banner.svg"
          alt="loading"
        />
        <Image
          className="absolute top-[60px] left-[30px]"
          width={140}
          height={140}
          src="/images/spinner.svg"
          alt="loading"
        />
      </div>
    </div>
  );
};

export default Loading;
