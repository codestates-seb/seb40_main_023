import React from "react";
import Link from "next/link";
import axios from "axios";
import { getCookie } from "../util/cookie";

const GalleryItem = ({ bgImage, userId, luckMangoId, title }: any) => {
  const DeleteLuckMango = async () => {
    try {
      await axios({
        method: "DELETE",
        url: `/api/luckMango/${luckMangoId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessJwtToken")}`,
        },
      });
      location.reload();
    } catch (error) {}
  };

  return (
    <div className={`group gap-2 mg-default-card`}>
      <div className="mg-card-contents">
        <div
          className={
            bgImage === undefined || "NONE" ? `mg-card-image` : `${bgImage}`
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
          onClick={() => DeleteLuckMango()}
        ></div>

        {/* qr코드 */}
        <Link href={`/edit/${luckMangoId}`}>
          <div className="mg-card-button bg-[url(/images/ico/ico-card-qr.svg)]"></div>
        </Link>
        {/* link 복사 */}
        <Link href={`/edit/${luckMangoId}`}>
          <div className="mg-card-button bg-[url(/images/ico/ico-card-url.svg)]"></div>
        </Link>
      </div>
    </div>
  );
};

export default GalleryItem;
