import React, { useEffect } from "react";
import Link from "next/link";

const GalleryItem = ({ ...galleryData }: any) => {
  return (
    <Link href={galleryData} className={`group mg-default-card`}>
      <div className="mg-card-contents">
        <div className={`mg-card-image`}></div>
        <div className="mg-card-desc">
          <p className="truncate">
            <span className="font-medium">{galleryData}</span>님의 새해 복망고
          </p>
          <p className="truncate">{galleryData}개의 덕담을 받았어요!</p>
        </div>
      </div>
    </Link>
  );
};

export default GalleryItem;
