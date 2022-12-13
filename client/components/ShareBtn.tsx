import React from "react";
import { shareBtnProps } from "../types/create";

const ShareBtn = ({ shareQr, shareKakao, shareUrl }: shareBtnProps) => {
  return (
    <>
      <button
        onClick={shareUrl}
        className={`mx-4 mg-background bg-[url(/images/ico/ico-share-url.svg)] mg-share-button bg-primary-normal hover:bg-primary-hover`}
      ></button>
      <button
        onClick={shareQr}
        className={`mx-4 mg-background bg-[url(/images/ico/ico-share-qr.svg)]  mg-share-button bg-link hover:bg-linkHover`}
      ></button>
      <button
        onClick={shareKakao}
        className={`mx-4 mg-background bg-[url(/images/ico/ico-share-kakao.svg)] mg-share-button bg-social-kakaoNormal hover:bg-social-kakaoHover`}
      ></button>
    </>
  );
};

export default ShareBtn;
