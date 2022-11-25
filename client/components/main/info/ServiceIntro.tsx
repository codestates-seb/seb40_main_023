import React from "react";
import Link from "next/link";
import Image from "next/image";

const ServiceIntro = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 text-xl font-normal text-center whitespace-pre-line">
        새해 복 망고는 새해 인사를 전하고 덕담을 나눌 수 있는 <br />
        <span className="font-semibold text-primary-normal">
          온라인 롤링페이퍼 서비스
        </span>{" "}
        입니다. 사랑하는 사람들에게 <br />
        복망고가 대신 따뜻한 메세지를 전달해 드릴게요.
      </div>
      <div className="flex flex-col items-center max-w-[230px]">
        <Image
          width={113}
          height={95}
          src="/images/char/char-button1.svg"
          alt="버튼 유도 복망고 캐릭터"
        />
        <Link href="/create" className="mg-primary-button">
          복망고 만들러가기!
        </Link>
      </div>
    </div>
  );
};

export default ServiceIntro;
