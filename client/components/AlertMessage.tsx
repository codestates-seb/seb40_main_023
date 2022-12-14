import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NewMessageType } from "../types/main";

const AlertMessage = ({
  messages,
  memberId,
  isLoading,
  isError,
}: {
  messages: NewMessageType[];
  memberId: number;
  isLoading: boolean;
  isError: boolean;
}) => {
  return (
    <ul className="px-5 py-4 rounded-xl bg-white shadow-context w-[calc(100%-40px)] mobile:min-w-[400px] mobile:w-auto max-h-[400px] overflow-y-auto min-h-[40px] absolute top-[calc(100%+14px)] left-[20px]">
      {isError ? (
        <div className="text-center text-mono-400">
          <p>
            {" "}
            <Link
              href={`/mypage/${memberId}`}
              className="underline text-primary-normal decoration-primary-normal"
            >
              로그인
            </Link>
            이 필요한 정보입니다.{" "}
          </p>
        </div>
      ) : isLoading ? (
        <div>덕담을 불러오는 중...</div>
      ) : messages?.length ? (
        messages.map(el => {
          return (
            <li key={el.mgId} className="my-1 text-base text-mono-600">
              <Link
                href={`/lucky/${el.mgId}`}
                className="underline underline-offset-4 decoration-mono-100"
              >
                <span className="font-medium text-primary-normal">
                  {el.mgTitle}
                </span>
                의 복망고에 읽지 않은{" "}
                <span className="font-medium text-primary-normal">
                  {el.mgCount}
                </span>
                개의 덕담이 있습니다!
                <Image
                  src="/images/ico/ico-mypage-link.svg"
                  width={14}
                  height={14}
                  className="inline-block mb-1 ml-2"
                  alt="마이페이지 바로가기"
                />
              </Link>
            </li>
          );
        })
      ) : (
        <div className="text-center text-mono-400">
          <p>받은 메시지가 없습니다! </p>
          <Link
            href={`/mypage/${memberId}`}
            className="underline text-primary-normal decoration-primary-normal"
          >
            복망고를 공유하고 덕담을 받아보세요!
          </Link>
        </div>
      )}
    </ul>
  );
};

export default AlertMessage;
