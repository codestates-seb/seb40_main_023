import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";

const index = () => {
  const [bgmOn, setBgmOn] = useState(false);
  const [shareBtn, setShareBtn] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const LUCKBAG_IMAGE_LIST = [
    {
      img: "img-bok2-1",
      yPosition: "top-[-10px]",
      xPosition: "left-12",
    },
    {
      img: "img-bok2-4",
      yPosition: "top-[-30px]",
      xPosition: "left-32",
    },
    {
      img: "img-bok1-3",
      yPosition: "top-6",
      xPosition: "left-24",
    },
    {
      img: "img-bok1-2",
      yPosition: "top-[-25px]",
      xPosition: "right-28",
    },
    {
      img: "img-bok2-3",
      yPosition: "top-[16px]",
      xPosition: "right-40",
    },
    {
      img: "img-bok2-5",
      yPosition: "top-[-20px]",
      xPosition: "right-12",
    },
    {
      img: "img-bok1-1",
      yPosition: "top-5",
      xPosition: "right-20",
    },
  ];

  let money = 1000000001;

  const handleBgm = () => {
    setBgmOn(!bgmOn);
  };

  const handleShareBtn = () => {
    setShareBtn(!shareBtn);
  };

  const loginTest = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="mg-layout bg-[url(/images/content/pt-dots.png)]">
      <button onClick={loginTest}>login</button>
      <div className="mg-width-size h-[600px] mg-border-2 bg-warning-light mg-flex items-center justify-between mb-8">
        <div className="w-full">
          <div className="relative mt-5 mg-flex-center mb-7">
            <div className="ml-6 w-[235px] h-[40px] bg-white rounded-full mg-flex-center justify-end pr-5 truncate font-medium">
              {money > 999999999999999 ? "∞ " : money.toLocaleString()}원
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
            />
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
          <button className="scale-[-1] left-3 top-16 z-10 absolute mg-background bg-[url(/images/ico/ico-banner-arrow.svg)] rounded-full bg-[#0000004D] w-[34px] h-[34px]" />
          <button className="right-3 top-16 z-10 absolute mg-background bg-[url(/images/ico/ico-banner-arrow.svg)] rounded-full bg-[#0000004D] w-[34px] h-[34px]" />
          <div className="mg-flex-center justify-center top-[117px] z-10 absolute rounded-full bg-[#0000004D] px-3 h-[19px]">
            <div className="bg-[#FF9B53] mg-icon-pagination" />
            <div className="bg-[#D9D9D9] mg-icon-pagination" />
            <div className="bg-[#D9D9D9] mg-icon-pagination" />
            <div className="bg-[#D9D9D9] mg-icon-pagination" />
            <div className="bg-[#D9D9D9] mg-icon-pagination" />
          </div>
          <Image
            src="/images/content/img-basket.svg"
            alt="basket"
            width={352}
            height={152}
            className="mb-[74px]"
          />
          {LUCKBAG_IMAGE_LIST.map(el => (
            <Image
              src={`/images/content/${el.img}.svg`}
              alt="luckbag"
              width={65}
              height={79}
              className={`cursor-pointer absolute ${el.yPosition} ${el.xPosition}`}
            />
          ))}
          {isLogin ? (
            <div className="absolute w-[212px] justify-center mg-flex-center bottom-9">
              <button className="h-12 w-full mg-secondary-button rounded-[100px] relative">
                <div className="justify-center w-full pl-3 mg-flex-center">
                  공유하기
                </div>
              </button>
              <div className="absolute w-12 h-12 mg-icon-share left-2" />
            </div>
          ) : (
            <div className="absolute flex items-end bottom-4">
              <button className="h-12 mr-4 mg-primary-button-round">
                새해 덕담 남기기
              </button>

              <div className="transition-all duration-300 mg-flex">
                <button
                  className={
                    shareBtn
                      ? "mg-floating-button duration-200 bg-[url(/images/ico/ico-share-url.svg)] bg-primary-normal"
                      : ""
                  }
                ></button>
                <button
                  className={
                    shareBtn
                      ? "mg-floating-button duration-300 bg-[url(/images/ico/ico-share-qr.svg)]  bg-link"
                      : ""
                  }
                ></button>
                <button
                  className={
                    shareBtn
                      ? "mg-floating-button duration-400 bg-[length:30px_30px] bg-[url(/images/ico/ico-share-kakao.svg)] bg-social-kakaoNormal"
                      : ""
                  }
                ></button>
                <button
                  className="z-30 mg-icon-button-round mg-icon-share"
                  onClick={handleShareBtn}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {isLogin ? (
        <div className="justify-center mg-flex-center mg-width-size">
          홍다희님의 새해 복망고입니다.
          <br />
          복주머니를 클릭하면 덕담을 볼 수 있어요!
        </div>
      ) : (
        <>
          <div className="flex justify-end mr-12 mg-width-size">
            복망고 소유주라면 로그인하세요!
          </div>
          <Link href="/" className="mg-width-size">
            <div className="h-[71.98px] relative rounded-[10px] mg-primary-button mg-width-size mg-flex-center justify-end cursor-pointer">
              <Image
                src="/images/char/char-banner.svg"
                alt="mango banner"
                width={117}
                height={130}
                className="absolute top-[-50px] left-2 w-3/12"
              />
              <div className="mg-flex-center justify-center h-[71.98px]">
                <div className="ml-16 mr-6">
                  나도 새해 복망고 만들어볼까?
                  <div className="font-semibold">새해 복망고 메인으로 이동</div>
                </div>
                <div className="bg-[url(/images/ico/ico-banner-arrow.svg)] w-6 h-6 mg-background" />
              </div>
            </div>
          </Link>
        </>
      )}
    </div>
  );
};

export default index;
