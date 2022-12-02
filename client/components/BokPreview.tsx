import React, { useRef, useState } from "react";
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
            : "mg-bok-layout bg-[url(/images/content/pt-dots.svg)]"
        }
      >
        <div className="w-full h-[60px] bg-mono-borderLight/50 absolute top-0 left-0 text-white text-sm flex items-center justify-center">
          이미지가 가려지는 부분입니다.
        </div>
        <div className="relative items-center w-full h-full mg-flex p-15">
          <div className="absolute flex justify-center w-full top-20">
            <Greeting
              content={
                greeting
                  ? greeting
                  : "친구들에게 보여질 메세지를 입력해 주세요."
              }
              edit={edit}
            />
          </div>
          <button
            className={edit ? "mg-greet-button" : "mg-greet-button invisible"}
            onClick={uploadImageButtonClick}
          >
            {bgImg === "" ? "이미지 등록하기" : "이미지 수정하기"}
          </button>
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={uploadImg}
            className="hidden"
          />
          <div className="basketWrapper absolute bottom-[10%] w-[90%]">
            <Image
              src="/images/content/img-basket-guide.svg"
              alt="basket guide"
              width={350}
              height={150}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BokPreview;
