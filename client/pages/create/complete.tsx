import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ShareBtn from "../../components/ShareBtn";
import { notifySuccess } from "../../components/util/Toast";
import Loading from "../../components/util/Loading";

const complete = () => {
  const [isValidPage, setIsValidPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // if (!isValidPage) return;

    setTimeout(() => {
      setIsLoading(false);
      notifySuccess({
        message: "새해 복망고가 완성되었습니다!",
        icon: "🥳",
      });
    }, 2000);
  }, []);

  return (
    <div>
      <Header />
      <main className="pt-[58px] mg-screenY-full">
        <div className="w-full mg-layout">
          <div className="mb-6 text-center mg-layout-row">
            <h1 className="my-6 text-5xl font-HSS">
              새해 <span className="text-primary-normal">복망고</span>{" "}
              {isLoading ? "제작중.." : "완성!"}
            </h1>
            <div className="mb-2 text-xl">
              친구들에게 링크를 공유해서 덕담을 나눠 보세요!
            </div>
            <div className="text-base text-mono-400">
              제작한 나의 새해복망고는{" "}
              <Link
                href="/mypage"
                className="font-medium underline text-primary-normal decoration-wavy"
              >
                마이페이지
              </Link>
              에서 수정할 수 있습니다.
            </div>
          </div>
          <div className="mg-layout-row">
            <div className="relative w-full my-10 min-h-[150px] flex items-center justify-center ">
              {isLoading ? <Loading /> : <ShareBtn />}
            </div>
          </div>
          <Link href="/" className="mg-primary-button">
            메인으로 가기
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default complete;
