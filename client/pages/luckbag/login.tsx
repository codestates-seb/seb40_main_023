import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";

const login = () => {
  const [bgmOn, setBgmOn] = useState(false);
  const handleBgm = () => {
    setBgmOn(!bgmOn);
  };
  return (
    <div className="mg-layout bg-center bg-[url(/images/content/pt-dots.png)]">
      <div className="mg-width-size h-[600px] mg-border-2 bg-warning-light mg-flex items-center justify-between mb-6">
        <div className="w-full">
          <div className="relative mt-5 mg-flex-center mb-7">
            <div className="break-words ml-6 w-[235px] h-[40px] bg-white rounded-full mg-flex-center justify-end pr-5 truncate font-medium">
              10,000,001 원
            </div>
            <Image
              src="/images/content/ico-mg-money.svg"
              alt="basket"
              width={57}
              height={58}
              className="absolute left-3 bottom-[0.3px]"
            />
            <button className="mx-2 h-[35px] w-[35px] ml-5 mg-icon-capture"></button>
            <button
              className={
                bgmOn
                  ? "ml-3 mg-icon-button-round mg-icon-sound-on"
                  : "ml-3 mg-icon-button-round mg-icon-sound-off"
              }
              onClick={handleBgm}
            ></button>
          </div>
          <div className="flex justify-center">
            <div className="w-4/6 p-4 text-sm border-white mg-border-2 bg-[#FFFFFFCC]">
              얘들아! 2023년에도 잘 부탁해~ 정말
              <br />
              고생 많았고, 우리 오래오래 보자!
            </div>
          </div>
        </div>
        <div className="relative flex-col w-full mg-flex-center">
          <Image
            src="/images/content/img-basket.svg"
            alt="basket"
            width={352}
            height={152}
            className="mb-[74px]"
          />
          <Image
            src="/images/content/img-bok2-4.svg"
            alt="luckbag"
            width={65}
            height={79}
            className="absolute top-[-35px] right-24"
          />
          <Image
            src="/images/content/img-bok2-3.svg"
            alt="luckbag"
            width={65}
            height={79}
            className="absolute top-[-33px] right-40"
          />
          <Image
            src="/images/content/img-bok2-5.svg"
            alt="luckbag"
            width={65}
            height={79}
            className="absolute top-[-50px] right-12"
          />
          <Image
            src="/images/content/img-bok2-2.svg"
            alt="luckbag"
            width={65}
            height={79}
            className="absolute top-[-33px] left-[105px]"
          />
          <Image
            src="/images/content/img-bok2-1.svg"
            alt="luckbag"
            width={65}
            height={79}
            className="absolute top-[-50px] left-12"
          />
          <Image
            src="/images/content/img-bok1-1.svg"
            alt="luckbag"
            width={65}
            height={79}
            className="absolute top-7 right-28"
          />
          <Image
            src="/images/content/img-bok1-2.svg"
            alt="luckbag"
            width={65}
            height={79}
            className="absolute top-3 right-14"
          />
          <Image
            src="/images/content/img-bok1-3.svg"
            alt="luckbag"
            width={65}
            height={79}
            className="absolute top-7 left-28"
          />
          <Image
            src="/images/content/img-bok1-4.svg"
            alt="luckbag"
            width={65}
            height={79}
            className="absolute top-3 left-14"
          />
          <Image
            src="/images/content/img-bok1-5.svg"
            alt="luckbag "
            width={65}
            height={79}
            className="absolute top-7 right-40"
          />
        </div>
      </div>
    </div>
  );
};

export default login;
