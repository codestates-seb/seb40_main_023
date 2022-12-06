import React, { useRef, useState } from "react";
import Image from "next/image";
import Greeting from "./Greeting";
import { uploadMgImg } from "../fetch/create";
import { getCookie } from "./util/cookie";
import Loading from "./util/Loading";

const BokPreview = ({ greeting, edit, setBgUrl, bgUrl }: any) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const uploadImg = (e: React.ChangeEvent<HTMLInputElement | null>) => {
    if (e.target.files?.length) {
      let formData = new FormData();
      formData.append("images", e.target.files[0]);
      uploadBgImg(formData);
    }
  };

  const uploadBgImg = async (formData: any) => {
    const res = await uploadMgImg(
      `/api/s3/luckMango/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getCookie("accessJwtToken")}`,
        },
      },
      setLoading,
    );
    setLoading(false);
    setBgUrl(res.data);
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
        style={{ backgroundImage: `url("${bgUrl}")` }}
        className={
          bgUrl
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
            {bgUrl !== "" || edit ? "이미지 수정하기" : "이미지 등록하기"}
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
              className="mx-auto"
            />
          </div>
        </div>
        {loading && <Loading />}
      </div>
    </>
  );
};

export default BokPreview;
