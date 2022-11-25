import React, { useState } from "react";
import Image from "next/image";
import BokPreview from "../BokPreview";
import Link from "next/link";
import { createMg } from "../../api/create";

const EditModal = ({ modal, setModal, greeting, title, bgUrl }: any) => {
  const handleModal = () => {
    setModal(!modal);
  };

  const createLuckMg = async () => {
    const res = await createMg("/api/luckMango", {
      memberId: 1,
      title: title,
      bgImage: "aaa",
      bgVideo: "bbb",
    });
    console.log(res);
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 bg-mono-400 ">
      <div className="w-[437px] h-[780px] absolute top-[50%] left-[50%] bg-white border rounded-xl -translate-x-2/4 -translate-y-2/4 p-2 z-999 box-border">
        <header className="flex justify-end w-full hover:cursor-pointer">
          <Image
            src="/images/ico/ico-modal-close.svg"
            width={30}
            height={30}
            alt="close button"
            onClick={handleModal}
          />
        </header>
        <div className="m-auto">
          <main className="flex-col gap-3 mg-flex-center">
            <div className="mg-flex-center w-[400px]">
              <div className="flex-1 mg-modal-title">제목</div>
              <div className="text-xs pr-52 flex-2 text-secondary-hover">
                제목은 노출되지 않아요
              </div>
            </div>
            <div className="w-[400px]">{title}</div>
            <BokPreview greeting={greeting} bgUrl={bgUrl} />
          </main>
          <div className="flex justify-around p-2 mt-1">
            <button className="mg-negative-button-round" onClick={handleModal}>
              취소
            </button>
            <Link href="/create/complete">
              <button
                className="rounded-full mg-primary-button"
                onClick={createLuckMg}
              >
                복망고 만들기
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
