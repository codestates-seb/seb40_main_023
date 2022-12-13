import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ShareBtn from "../../components/ShareBtn";
import { Toast, notifySuccess } from "../../components/util/Toast";
import Loading from "../../components/util/Loading";
import { useRecoilValue, useRecoilState } from "recoil";
import { memberIdState } from "../../recoil/memberId";
import { luckMgIdState } from "../../recoil/luckMgId";
import { TEMPLETE_ID } from "../../constants/templeteId";
import { notifyInfo } from "../../components/util/Toast";
import QrModal from "../../components/modals/QrModal";

import { userState } from "../../recoil/user";
import { useRouter } from "next/router";
import { memberNameState } from "../../recoil/memberName";
import { luckImgState } from "../../recoil/luckImg";

const Complete = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [qrCode, setQrCode] = useState<boolean>(false);

  const memberId = useRecoilValue(memberIdState).memberId;
  const luckMgId = useRecoilValue(luckMgIdState);
  const [user, setUser] = useRecoilState(userState);
  const userName = useRecoilValue(memberNameState);
  const luckImg = useRecoilValue(luckImgState);
  const userlogin = user.login;
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      notifySuccess({
        message: "새해 복망고가 완성되었습니다!",
        icon: "🥳",
      });
    }, 500);
  }, []);

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }
  }, []);

  const shareQr = () => {
    setQrCode(!qrCode);
  };

  const shareKakao = () => {
    const { Kakao } = window;
    Kakao.Link.sendScrap({
      requestUrl: `${process.env.NEXT_PUBLIC_URL}/lucky/${luckMgId}`,
      templateId: TEMPLETE_ID,
      templateArgs: {
        id: `${luckMgId}`,
        username: `${userName}`,
        img: `${luckImg}`,
      },
    });
  };

  const shareUrl = () => {
    let currentUrl = `${process.env.NEXT_PUBLIC_URL}/lucky/${luckMgId}`;
    let t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = currentUrl;
    t.select();
    document.execCommand("copy");
    document.body.removeChild(t);
    notifyInfo({ message: "url이 복사됐습니다.", icon: "😎" });
  };

  useEffect(() => {
    if (!userlogin) router.replace("/");
  }, [userlogin]);

  return (
    <div>
      <Header />
      <main className="pt-[58px] mg-screenY-full">
        <div className="w-full mg-layout">
          <div className="mb-6 text-center mg-layout-row">
            <h1 className="my-8 text-5xl font-HSS">
              새해 <span className="text-primary-normal">복망고</span>{" "}
              {isLoading ? "제작중.." : "완성!"}
            </h1>
            <div className="mb-4 text-xl">
              친구들에게 링크를 공유해서 <br className="mobile:hidden" />
              덕담을 나눠 보세요!
            </div>
            <div className="text-base text-mono-400">
              제작한 나의 새해복망고는
              <br className="mobile:hidden" />
              <Link
                href={`/mypage/${memberId}`}
                className="font-medium underline text-primary-normal decoration-wavy"
              >
                마이페이지
              </Link>
              에서 수정할 수 있습니다.
            </div>
          </div>
          <div className="mg-layout-row">
            <div className="relative w-full my-3 mobile:my-10 min-h-[150px] flex items-center justify-center">
              {isLoading ? (
                <Loading />
              ) : (
                <ShareBtn
                  shareQr={shareQr}
                  shareKakao={shareKakao}
                  shareUrl={shareUrl}
                />
              )}
            </div>
          </div>
          <Link href="/" className="mg-primary-button">
            메인으로 가기
          </Link>
        </div>
        <Toast />
      </main>
      <Footer />
      {qrCode && (
        <QrModal
          shareQr={shareQr}
          link={`${process.env.NEXT_PUBLIC_URL}/lucky/${luckMgId}`}
        />
      )}
    </div>
  );
};

export default Complete;
