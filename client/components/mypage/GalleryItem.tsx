import React, { useState } from "react";
import Link from "next/link";
import { notifySuccess, Toast } from "../util/Toast";
import QrModal from "../modals/QrModal";
import DeleteMgModal from "../modals/DeleteMgModal";

const GalleryItem = ({ bgImage, userId, luckMangoId, title }: any) => {
  //모달 관리
  const [deleteModal, setDeleteModal] = useState(false);
  const handleModal = () => {
    setDeleteModal(!deleteModal);
  };
  //Qr 관리
  const [qrCode, setQrCode] = useState(false);
  const shareQr = () => {
    setQrCode(!qrCode);
  };

  //URL 관리
  const shareUrl = () => {
    let currentUrl = `http://localhost:3000/lucky/${luckMangoId}`;
    let t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = currentUrl;
    t.select();
    document.execCommand("copy");
    document.body.removeChild(t);
    notifySuccess({ message: "url이 복사됐습니다.", icon: "😎" });
  };

  return (
    <div className={`group gap-2 mg-default-card`}>
      <div className="mg-card-contents">
        <div
          className={
            bgImage === undefined || "NONE"
              ? `mg-card-image group-hover:blur-sm`
              : `${bgImage}`
          }
        ></div>
        <div className="mg-card-desc">
          <div className="truncate">
            <span className="font-medium">{title}</span>님의 새해 복망고
          </div>
          <div className="truncate">{luckMangoId}개의 덕담을 받았어요!</div>
        </div>
      </div>
      <div className={`mg-card-overlay`}>
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

      <Toast />
    </div>
  );
};

export default GalleryItem;
