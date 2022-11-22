import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const BokPreview = ({ greeting, edit, setBgUrl, bgUrl }: any) => {
  const [bgImg, setBgImg] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const uploadImg = (e: React.ChangeEvent<HTMLInputElement | null>) => {
    // if (!e.target.files && bgImg) {
    //   window.URL.revokeObjectURL(bgImg);

    // }

    if (e.target.files?.length) {
      setBgImg(URL.createObjectURL(e.target.files[0]));
      setBgUrl(bgImg);
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
        <div className="items-center mg-flex">
          <div className="bg-white w-4/6 p-[0.8em] break-all text-sm border-dashed mg-border-2 border-mono-borderNormal">
            {greeting
              ? greeting
              : "얘들아! 2023년에도 잘 부탁해~ 정말 고생 많았고, 우리 오래오래 보자!"}
          </div>

          <button
            className={
              edit
                ? "w-8/12 my-20 font-bold mg-white-button"
                : "w-8/12 my-20 font-bold mg-white-button invisible"
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
          />
        </div>
      </div>
    </>
  );
};

export default BokPreview;
