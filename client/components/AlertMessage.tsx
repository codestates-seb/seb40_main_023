import React from "react";
import Link from "next/link";

const AlertMessage = () => {
  return (
    <ul className="px-5 py-4 rounded-xl bg-white shadow-context w-[calc(100%-40px)] max-h-[400px] overflow-y-auto min-h-[40px] absolute top-[calc(100%+14px)] left-[20px]">
      {/* {data.map(el => {
        return (
          <li className="my-1 text-base text-mono-600">
            <Link
              href="www.naver.com"
              className="underline underline-offset-4 decoration-mono-100"
            >
              <span className="text-primary-normal">00</span>의 복망고에{" "}
              <span className="text-primary-normal">N</span>개의 덕담이
              도착했습니다!
            </Link>
          </li>
        );
      })} */}
    </ul>
  );
};

export default AlertMessage;
