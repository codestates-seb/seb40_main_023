import React from "react";
import Link from "next/link";
import Image from "next/image";

const Banner = () => {
  return (
    <Link href="/" className="block py-4">
      <div className="relative rounded-md mg-primary-button py-3 pl-[90px] pr-[20px] after:content-['〉'] after:absolute after:right-[12px] after:top-[50%] after:translate-y-[-50%] after:text-white after:font-bold after:text-xl">
        <Image
          width={117}
          height={130}
          src="/images/char/char-banner.svg"
          alt="유혹의 복망고 캐릭터"
          className="absolute top-[-50px] left-[-10px]"
        />
        <div className="justify-center mg-flex-center">
          <div className="">
            <p>나도 새해 복망고 만들어볼까?</p>
            <p className="font-medium">새해 복망고 메인으로 이동</p>
          </div>
          <div className="text-xl font-bold cursor-pointer"></div>
        </div>
      </div>
    </Link>
  );
};

export default Banner;
