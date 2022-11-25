import React, { useEffect } from "react";
import Link from "next/link";
import { useDelete } from "../../../api/mypage";

const GalleryItem = ({
  mypage,
  mypageGap,
  bgImage,
  duckdam,
  userId,
  LuckMangoId,
  setLuckMango,
  LuckMango,
  title,
  ...items
}: any) => {
  //럭망고를 가지고 작업
  //useEffect onclick시

  return (
    <div className={`group ${mypage} mg-default-card`}>
      <div className="mg-card-contents">
        <div className={bgImage ? `${bgImage}` : `mg-card-image`}></div>
        <div className="mg-card-desc">
          <p className="truncate">
            <span className="font-medium">{title}</span>님의 새해 복망고
          </p>
          <p className="truncate">{duckdam}개의 덕담을 받았어요!</p>
        </div>
      </div>
      <div className={`mg-card-overlay ${mypageGap}`}>
        <Link href={`/api/mypage/${LuckMangoId}`}>
          <button className="mg-card-button bg-[url(/images/ico/ico-card-edit.svg)]"></button>
        </Link>
        <button className="mg-card-button bg-[url(/images/ico/ico-card-delete.svg)]"></button>
        <button className="mg-card-button bg-[url(/images/ico/ico-card-qr.svg)]"></button>
        <button className="mg-card-button bg-[url(/images/ico/ico-card-url.svg)]"></button>
      </div>
    </div>
  );
};

export default GalleryItem;
