import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { notifySuccess } from "../util/Toast";
import QrModal from "../modals/QrModal";
import DeleteMgModal from "../modals/DeleteMgModal";

const GalleryItem = ({ bgImage, userId, luckMangoId, title }: any) => {
  const router = useRouter();
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
    let currentUrl = `http://localhost:3000/lucky/${luckMangoId}`;
    let t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = currentUrl;
    t.select();
    document.execCommand("copy");
    document.body.removeChild(t);
    notifySuccess({ message: "url이 복사됐습니다.", icon: "😎" });
  };

  const onClickLink = (e: any) => {
    router.push(`/edit/${luckMangoId}`);
  };

  return (
    <div className={`group mg-default-card aspect-card`}>
      <div className="mg-card-contents">
        <div
          className={
            bgImage === undefined || "NONE"
              ? `mg-card-image mobile:group-hover:blur-sm`
              : `${bgImage}`
          }
        ></div>
        <div className="mg-card-desc">
          <p className="truncate">
            <span className="font-medium">{title}</span>님의 새해 복망고
          </p>
          <div className="truncate">{luckMangoId}개의 덕담을 받았어요!</div>
        </div>
      </div>
      <div className={`mg-card-overlay`} onClick={onClickLink}>
        {/* 수정페이지 */}
        <Link href={`/edit/${luckMangoId}`}>
          <div className="mg-card-button bg-[url(/images/ico/ico-card-edit.svg)]"></div>
        </Link>
        {/* 삭제버튼 */}
        <div
          className="mg-card-button bg-[url(/images/ico/ico-card-delete.svg)]"
          onClick={handleModal}
        ></div>

        {/* onClick={() => DeleteLuckMango()} */}
        {/* qr코드 */}
        <div
          className="mg-card-button bg-[url(/images/ico/ico-card-qr.svg)]"
          onClick={shareQr}
        >
          {qrCode && (
            <QrModal
              shareQR={shareQr}
              link={`http://localhost:3000/lucky/${luckMangoId}`}
            />
          )}
        </div>

        {/* link 복사 */}
        <div
          className="mg-card-button bg-[url(/images/ico/ico-card-url.svg)]"
          onClick={shareUrl}
        ></div>
      </div>
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
