import React from "react";

const ShareBtn = ({ margin }: any) => {
  return (
    <>
      <button
        className={` ${margin} mg-background bg-[url(/images/ico/ico-share-url.svg)] mg-share-button bg-primary-normal`}
      ></button>
      <button
        className={`${margin} mg-background bg-[url(/images/ico/ico-share-qr.svg)]  mg-share-button bg-link`}
      ></button>
      <button
        className={`${margin} mg-background bg-[url(/images/ico/ico-share-kakao.svg)] mg-share-button bg-social-kakaoNormal`}
      ></button>
    </>
  );
};

export default ShareBtn;
