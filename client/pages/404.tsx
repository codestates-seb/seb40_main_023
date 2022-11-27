import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="h-full mg-layout">
      <h1 className="mg-logo">Logo</h1>
      <div className="flex justify-center text-center text-7xl mt-[100px] text-mono-400">
        404
      </div>
      <div className="mt-5 mg-flex-center justify-center w-[400px] h-[200px] bg-[url(/images/char/char-404.svg)] bg-no-repeat bg-center"></div>
      <div className="mt-5 text-mono-400">찾으시는 페이지가 없는 것 같아요</div>
      <Link href="/" className="mg-primary-button mt-9">
        메인으로
      </Link>
      <hr />
      <div className="flex justify-center text-center text-xxl mt-[100px]">
        삭제된 복망고입니다
      </div>
      <div className="mt-5 mg-flex-center justify-center w-[300px] h-[200px] bg-[url(/images/char/char-404.svg)] bg-no-repeat bg-center"></div>
      <Link href="/" className="mg-primary-button mt-9">
        메인으로
      </Link>
    </div>
  );
};

export default NotFound;
