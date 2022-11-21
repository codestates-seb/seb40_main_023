import React from "react";
import Image from "next/image";

const BokPreview = ({ greeting }: any) => {
  return (
    <div className="w-[400px] bg-center relative justify-center mg-border-2 h-[600px] mg-flex bg-[url(/images/content/pt-dots.png)]">
      <div className="mg-width-size w-[101%] h-[60px] rounded-t-[10px] bg-mono-borderLight absolute top-[-2px] left-[-2px]"></div>
      <div className="items-center mg-flex">
        <div className="bg-white w-4/6 p-[0.8em] break-all text-sm border-dashed mg-border-2 border-mono-borderNormal">
          {greeting
            ? greeting
            : "얘들아! 2023년에도 잘 부탁해~ 정말 고생 많았고, 우리 오래오래 보자!"}
        </div>
        <button className="w-8/12 my-20 font-bold mg-white-button">
          이미지 등록하기
        </button>
        <Image
          src="/images/content/img-basket-guide.svg"
          alt="basket guide"
          width={350}
          height={150}
        />
      </div>
    </div>
  );
};

export default BokPreview;
