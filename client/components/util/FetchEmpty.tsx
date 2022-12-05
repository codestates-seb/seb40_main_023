import React from "react";
import Image from "next/image";

const FetchEmpty = () => {
  return (
    <div className="z-50 w-full h-full pt-4">
      <div className="flex flex-col items-center justify-center">
        <Image
          width={140}
          height={140}
          src="/images/char/char-404.svg"
          alt="Something's wrong"
        />
        <div className="py-4 text-sm text-center underline text-mono-textDisabled">
          작성된 내용이 없네요.. <br />
          첫번째 작성자가 되어주세요! 🥲
        </div>
      </div>
    </div>
  );
};

export default FetchEmpty;
