import React from "react";
import Link from "next/link";

const GalleryItem = ({ mypage, ...items }: any) => {
  return (
    <Link
      href={"https://www.naver.com"}
      className={`group ${mypage} mg-default-card`}
    >
      <div className="mg-card-contents">
        <div className="mg-card-image"></div>
        <div className="mg-card-desc">
          <p className="truncate">
            <span className="font-medium">김민아김민아</span>님의 새해 복망고
          </p>
          <p className="truncate">13,478,123,456개의 덕담을 받았어요!</p>
        </div>
      </div>
      <div className="mg-card-overlay">
        <button className="mg-card-button bg-[url(/images/ico/ico-card-edit.svg)]"></button>
        <button className="mg-card-button bg-[url(/images/ico/ico-card-delete.svg)]"></button>
        <button className="mg-card-button bg-[url(/images/ico/ico-card-qr.svg)]"></button>
        <button className="mg-card-button bg-[url(/images/ico/ico-card-url.svg)]"></button>
      </div>
    </Link>
  );
};

export default GalleryItem;
