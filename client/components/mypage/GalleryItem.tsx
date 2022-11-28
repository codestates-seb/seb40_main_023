import React from "react";
import Link from "next/link";

const GalleryItem = ({ bgImage, userId, luckMangoId, title }: any) => {
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
          <div className="truncate">개의 덕담을 받았어요!</div>
        </div>
      </div>
      <div className={`mg-card-overlay`}>
        {/* 수정페이지 */}

        <div className="mg-card-button bg-[url(/images/ico/ico-card-edit.svg)]">
          <Link href={`/edit/${luckMangoId}`}></Link>
        </div>

        {/* 삭제버튼 */}

        <div className="mg-card-button bg-[url(/images/ico/ico-card-delete.svg)]">
          <Link href={`/edit/${luckMangoId}`}> </Link>
        </div>

        {/* qr코드 */}

        <div className="mg-card-button bg-[url(/images/ico/ico-card-qr.svg)]">
          <Link href={`/edit/${luckMangoId}`}> </Link>
        </div>

        {/* link 복사 */}

        <div className="mg-card-button bg-[url(/images/ico/ico-card-url.svg)]">
          {" "}
          <Link href={`/edit/${luckMangoId}`}></Link>
        </div>
      </div>
    </div>
  );
};

export default GalleryItem;
