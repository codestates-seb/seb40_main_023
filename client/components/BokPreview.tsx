import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Greeting from "./Greeting";

const BokPreview = ({ greeting, edit, setBgUrl, bgUrl }: any) => {
  const [bgImg, setBgImg] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const uploadImg = (e: React.ChangeEvent<HTMLInputElement | null>) => {
    // if (!e.target.files && bgImg) {
    //   window.URL.revokeObjectURL(bgImg);
    // }

    if (e.target.files?.length) {
      setBgImg(URL.createObjectURL(e.target.files[0]));
      setBgUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const uploadImageButtonClick = () => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  };

  return (
    <>
      <div
        style={
          bgUrl
            ? { backgroundImage: `url(${bgUrl})` }
            : { backgroundImage: `url(${bgImg})` }
        }
        className={
          bgImg || bgUrl
            ? `mg-bok-layout bg-center bg-cover`
            : "mg-bok-layout bg-[url(/images/content/pt-dots.png)]"
        }
      >
        <div className="mg-width-size w-[101%] h-[60px] rounded-t-[10px] bg-mono-borderLight absolute top-[-2px] left-[-2px]"></div>
        <div className="items-center justify-between mg-flex mg-width-size h-[600px]">
          {/* <div className="bg-white w-4/6 p-[0.8em] break-all text-sm border-dashed mg-border-2 border-mono-borderNormal"> */}
          <div className="absolute flex justify-center mg-width-size mt-[95.99px]">
            <Greeting
              content={
                greeting
                  ? greeting
                  : "얘들아! 2023년에도 잘 부탁해~ 정말 고생 많았고, 우리 오래오래 보자!"
              }
              edit={edit}
            />
          </div>
          {/* {greeting
              ? greeting
              : "얘들아! 2023년에도 잘 부탁해~ 정말 고생 많았고, 우리 오래오래 보자!"} */}
          {/* </div> */}

          <button
            className={
              edit
                ? "w-8/12 font-bold mg-white-button mt-[241px] bg-[center_left_1rem] mg-background bg-[url(/images/content/ico-upload-image.svg)] pl-14"
                : "w-8/12 font-bold mg-white-button invisible mt-[241px]"
            }
            onClick={uploadImageButtonClick}
          >
            이미지 등록하기
          </button>
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={uploadImg}
            className="hidden"
          />
          <Image
            src="/images/content/img-basket-guide.svg"
            alt="basket guide"
            width={350}
            height={150}
            className="mb-[74px]"
          />
        </div>
      </div>
    </>
  );
};

export default BokPreview;
