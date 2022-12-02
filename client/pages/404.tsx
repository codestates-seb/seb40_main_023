import React, { useState } from "react";
import Link from "next/link";

const NotFound = ({ content }: { content: string }) => {
  const [temp, setTemp] = useState(true);

  return (
    <div className="h-full mg-layout">
      <h1 className="mg-logo">
        <Link href="/">Logo</Link>
      </h1>
      {temp ? (
        <div className="flex justify-center text-center text-7xl mt-[100px] text-mono-400">
          404
        </div>
      ) : (
        <div className="flex justify-center text-center text-xxl mt-[100px]">
          삭제된 복망고입니다
        </div>
      )}

      <div className="mt-5 mg-flex-center justify-center w-[400px] h-[200px] bg-[url(/images/char/char-404.svg)] bg-no-repeat bg-center"></div>
      <div className="mt-5 text-mono-400">
        {content ? content : "찾으시는 페이지가 없는 것 같아요"}
      </div>
      <button className="mt-9 mg-primary-button">
        <Link href="/">메인으로</Link>
      </button>
    </div>
  );
};

export default NotFound;
