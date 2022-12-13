import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFoundProps } from "../types/basic";

const NotFound = (props: notFoundProps) => {
  return (
    <div className="pt-4 bg-[url(/images/content/pt-dots.svg)]">
      <main className="py-[58px]">
        <div className="h-full mg-layout">
          <div className="flex justify-center my-8 text-center text-9xl text-mono-textLight font-HSS opacity-60">
            404
          </div>
          <div className="py-4 text-center">
            <Image
              width={111}
              height={123}
              src="/images/char/char-404.svg"
              alt="아쉬운 표정"
            />
          </div>
          <div className="mt-4 text-mono-400">
            {!props.message
              ? "찾으시는 페이지가 없는 것 같아요"
              : props.message}
          </div>
          <button className="mt-9 mg-primary-button min-w-[230px]">
            <Link href="/">메인으로</Link>
          </button>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
