import React from "react";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full">
      <div className="relative flex items-center justify-center">
        <Image
          width={130}
          height={142}
          src="/images/char/char-banner.svg"
          alt="loading"
        />
        <Image
          className="absolute top-[40px] left-0"
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
