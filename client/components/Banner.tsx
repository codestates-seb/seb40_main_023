import React from "react";
import Link from "next/link";
import Image from "next/image";

const Banner = () => {
  return (
    <Link href="/" className="mg-width-size">
      <div className="h-[71.98px] relative rounded-[10px] mg-primary-button mg-width-size mg-flex-center justify-end cursor-pointer">
        <Image
          src="/images/char/char-banner.svg"
          alt="mango banner"
          width={117}
          height={130}
          className="absolute top-[-50px] left-2 w-3/12"
        />
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
