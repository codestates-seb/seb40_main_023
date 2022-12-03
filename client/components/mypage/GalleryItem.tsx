import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { notifySuccess } from "../util/Toast";
import QrModal from "../modals/QrModal";
import DeleteMgModal from "../modals/DeleteMgModal";

const GalleryItem = ({
  bgImage,
  luckMangoId,
  bagList,
  userName,
  ...el
}: any) => {
  //모달 관리
  const [deleteModal, setDeleteModal] = useState(false);
  const handleModal = (e: any) => {
    e.stopPropagation();
    setDeleteModal(!deleteModal);
  };
  //Qr 관리
  const [qrCode, setQrCode] = useState(false);
  const shareQr = (e: any) => {
    e.stopPropagation();
    setQrCode(!qrCode);
  };

  //URL 관리
  const shareUrl = (e: any) => {
    e.stopPropagation();
    let currentUrl = `https://seb40-main-023-7vi4.vercel.app/lucky/${luckMangoId}`;
    let t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = currentUrl;
    t.select();
    document.execCommand("copy");
    document.body.removeChild(t);
    notifySuccess({ message: "url이 복사됐습니다.", icon: "😎" });
  };

  return (
    <div
      className={`group mg-default-card aspect-[2/1.3] max-w-none max-h-none shadow-none border border-mono-100`}
    >
      <div className="flex-col mg-card-contents">
        <div className="flex flex-row h-[75%] rounded-[14px] overflow-hidden rounded-bl-none rounded-br-none">
          <div
            style={{ backgroundImage: `url("${bgImage}")` }}
            className={`mg-card-image h-full grow shrink basis-[40%] ${
              (bgImage === null || bgImage === "NONE" || bgImage === "") &&
              "bg-[url(/dummy/user1.png)]"
            }`}
          ></div>
          <div className="mg-card-desc py-3 px-5 grow shrink basis-[60%] flex flex-col justify-evenly items-end text-base">
            <div className="text-sm text-mono-500">
              <span className="">{el.member.name}</span>님의 새해 복망고
            </div>
            <p className="text-xl text-black underline truncate underline-offset-4 text-medium">
              <Link href={`/lucky/${luckMangoId}`}>{el.title}</Link>
            </p>
            <div className="truncate">{bagList}개의 덕담을 받았어요!</div>
            <p className="truncate relative text-right pl-[30px] before:content-[''] before:w-[20px] before:h-[20px] before:bg-[url(/images/ico/ico-like-active.svg)] before:bg-contain bg-no-repeat before:absolute before:left-0 before:top-0 text-primary-light font-medium">
              {Number(el.likeCount).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="h-[25%] flex flex-row flex-nowrap items-center justify-evenly bg-white text-mono-textNormal p-2 rounded-[14px] rounded-tl-none rounded-tr-none border-dashed border-spacing-3 border-t border-mono-200">
          <Link
            href={`/lucky/${luckMangoId}`}
            className="flex items-center mg-card-button bg-[url(/images/ico/ico-mypage-link.svg)] bg-[center] bg-no-repeat"
          ></Link>
          <button
            className="flex items-center mg-card-button bg-[url(/images/ico/ico-mypage-qr.svg)] bg-[center] bg-no-repeat"
            onClick={shareQr}
          ></button>
          <button
            className="flex items-center mg-card-button bg-[url(/images/ico/ico-mypage-url.svg)] bg-[center] bg-no-repeat"
            onClick={shareUrl}
          ></button>
          <Link
            href={`/edit/${luckMangoId}`}
            className="flex items-center mg-card-button bg-[url(/images/ico/ico-mypage-edit2.svg)] bg-[center] bg-no-repeat"
          ></Link>
          <button
            className="flex items-center mg-card-button bg-[url(/images/ico/ico-mypage-delete.svg)] bg-[center] bg-no-repeat"
            onClick={handleModal}
          ></button>
        </div>
      </div>

      {qrCode && (
        <QrModal
          shareQr={shareQr}
          link={`https://seb40-main-023-7vi4.vercel.app/lucky/${luckMangoId}`}
        />
      )}
      {deleteModal && (
        <DeleteMgModal
          setDeleteModal={setDeleteModal}
          luckMangoId={luckMangoId}
        />
      )}
    </div>
  );
};

export default GalleryItem;
