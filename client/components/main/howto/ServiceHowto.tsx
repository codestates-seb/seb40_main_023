import React from "react";
import Link from "next/link";
import Image from "next/image";

const ServiceHowto = () => {
  return (
    <div className="flex flex-col items-center mt-5 mobile:mt-10">
      <ul className="grid w-full grid-flow-row grid-cols-2 gap-4 mb-5 tablet:grid-cols-4">
        <li className="mg-howto-item">
          <Image
            width={140}
            height={140}
            src="/images/char/char-step-1.png"
            alt="복망고 만들기1"
          />
          <p className="my-4 text-center whitespace-pre-line">
            로그인 후,{"\n"}{" "}
            <span className="inline px-2 py-1 text-white rounded bg-primary-normal/80">
              복망고 만들기
            </span>{" "}
            클릭!
          </p>
        </li>
        <li className="mg-howto-item">
          <Image
            width={140}
            height={140}
            src="/images/char/char-step-2.png"
            alt="복망고 만들기2"
          />
          <p className="my-4 text-center whitespace-pre-line">
            <span className="text-primary-normal">사진과 인삿말</span>을{"\n"}{" "}
            등록해 주세요!
          </p>
        </li>
        <li className="mg-howto-item">
          <Image
            width={140}
            height={140}
            src="/images/char/char-step-3.png"
            alt="복망고 만들기3"
          />
          <p className="my-4 text-center whitespace-pre-line">
            완성된 복망고를{"\n"}공유해 보세요
          </p>
        </li>
        <li className="mg-howto-item after:hidden">
          <Image
            width={140}
            height={140}
            src="/images/char/char-step-4.png"
            alt="복망고 만들기4"
          />
          <p className="my-4 text-center whitespace-pre-line">
            💌 덕담과 💵 새뱃돈을{"\n"}모으는 재미는 덤 ❤️
          </p>
        </li>
      </ul>
      <div className="flex flex-col items-center max-w-[230px]">
        <Image
          width={115}
          height={101}
          src="/images/char/char-button2.svg"
          alt="버튼 유도 복망고 캐릭터"
          className="ml-[20px]"
        />
        <Link href="/create" className="mg-primary-button">
          복망고 만들러가기!
        </Link>
      </div>
    </div>
  );
};

export default ServiceHowto;
