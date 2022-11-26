import React from "react";
import Image from "next/image";

const FetchError = () => {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 z-50 w-full h-full">
      <div className="flex flex-col items-center justify-center">
        <Image
          width={140}
          height={140}
          src="/images/char/char-404.svg"
          alt="Something's wrong"
        />
        <div className="py-4 text-sm text-center underline text-mono-textDisabled">
          뭔가 잘못된 것 같아요. <br />
          다시 시도해 주세요.
        </div>
      </div>
    </div>
  );
};

export default FetchError;
