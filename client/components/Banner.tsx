import React from "react";
import Link from "next/link";

const Banner = () => {
  return (
    <Link href="/" className="mg-width-size">
      <div className="h-[71.98px] relative rounded-[10px] mg-primary-button mg-width-size mg-flex-center justify-end cursor-pointer">
        <div className="bg-[url(/images/char/char-banner.svg)] w-[117px] h-[130px] absolute top-[-50px] left-2" />
        <div className="mg-flex-center justify-center mg-width-size h-[71.98px]">
          <div className="ml-16 mr-9">
            나도 새해 복망고 만들어볼까?
            <div className="font-semibold">새해 복망고 메인으로 이동</div>
          </div>
          <div className="text-xl font-bold cursor-pointer">〉</div>
        </div>
      </div>
    </Link>
  );
};

export default Banner;
