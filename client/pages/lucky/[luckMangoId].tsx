import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Greeting from "../../components/Greeting";
import LongModal from "../../components/modals/LongModal";
import LetterModal from "../../components/modals/LetterModal";
import { notifyInfo } from "../../components/util/Toast";
import { useFetch } from "../../fetch/useFetch";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import Banner from "../../components/Banner";
import { useRouter } from "next/router";
import LuckBags from "../../components/LuckBags";
import QrModal from "../../components/modals/QrModal";
import { Toast } from "../../components/util/Toast";
import { TEMPLETE_ID } from "../../constants/templeteId";

const index = () => {
  //스크린샷 구역
  const downloadRef = useRef<HTMLInputElement | null>(null);
  const downloadBtn = () => {
    if (!downloadRef.current) {
      return;
    }
    let btn: any = downloadRef.current;
    domtoimage.toPng(btn).then(blob => {
      saveAs(blob, "BokMango.png");
    });
    notifyInfo({ message: "복망고 캡처 이미지가 저장됐습니다.", icon: "🤓" });
  };

  //bgm 구역
  const [bgmOn, setBgmOn] = useState(false);
  const [shareBtn, setShareBtn] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [modal, setModal] = useState(false);
  const [letterModal, setLetterModal] = useState(false);
  const [qrCode, setQrCode] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);

  //패치 구역
  const [body, setBody] = useState("");
  const [bag, setBag] = useState([]);
  const [bagList, setBagList] = useState([]);
  const [mangoId, setMangoId] = useState(0);
  const [luckyBagId, setLuckyBagId] = useState(0);

  //유저 아이디 가져와서 then으로 엮기
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const { luckMangoId } = router.query;
    getLuckyMango(Number(luckMangoId));
    getAllLuckyBags(Number(luckMangoId));
  }, [router.isReady]);

  const getLuckyMango = async (luckMangoId: number) => {
    const res = await useFetch(`/api/luckMango/${luckMangoId}`);
    setBody(res?.data?.mangoBody);
  };
  const getLuckyBag = async () => {
    const res = await useFetch(`/api/luckBag/${luckyBagId}`);
    setBag(res.data);
  };
  const getAllLuckyBags = async (luckMangoId: number) => {
    const res = await useFetch(`/api/luckBag?&page=1&size=5`);
    setBagList(res.data);
    console.log("bagList", bagList);
  };

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }
  }, []);

  useEffect(() => {
    getLuckyBag();
  }, [luckyBagId]);

  const shareKakao = () => {
    const { Kakao, location } = window;
    Kakao.Link.sendScrap({
      requestUrl: location.href,
      templateId: TEMPLETE_ID,
    });
  };

  const shareUrl = () => {
    let currentUrl = window.document.location.href;
    let t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = currentUrl;
    t.select();
    document.execCommand("copy");
    document.body.removeChild(t);
    notifyInfo({ message: "url이 복사됐습니다.", icon: "😎" });
  };

  const shareQr = () => {
    setQrCode(!qrCode);
  };

  //한 줄 글 남기기 구역
  const greeting =
    "얘들아! 2023년에도 잘 부탁해~ 정말 고생 많았고, 우리 오래오래 보자 얘들아! 2023년에도 잘 부탁해~ 정말 고생 많았고, 우리 오래오래 보자 얘들아! 2023년에도 잘 부탁해~ 정말 고생 많았고, 우리 오래오래 보자 얘들아! 2023년에도 잘 부탁해~ 정말 고생 많았고, 우리 오래오래 보자 얘들아! 2023년에도 잘 부탁해~ 정말 고생 많았고, 우리 오래오래 보자 얘들아! 2023년에도 잘 부탁해~ 정말 고생 많았고, 우리 오래오래 보자 얘들아! 2023년에도 잘 부탁해~ 정말 고생 많았고, 우리 오래오래 보자";
  let money = 1000000001;

  const handleBgm = () => {
    setBgmOn(!bgmOn);
  };

  const handleShareBtn = () => {
    setShareBtn(!shareBtn);
  };

  const loginTest = () => {
    setIsLogin(!isLogin);
  };

  const handleModal = () => {
    setModal(!modal);
  };

  return (
    <div ref={downloadRef}>
      <div className="mg-layout bg-[url(/images/content/pt-dots.png)]">
        <button onClick={loginTest}>login</button>
        <div className="mg-width-size h-[600px] mg-border-2 bg-warning-light mg-flex items-center justify-between mb-8">
          <div className="w-full">
            <div className="relative mt-5 mg-flex-center mb-7">
              <div className="ml-6 w-[235px] h-[40px] bg-white rounded-full mg-flex-center justify-end pr-5 truncate font-medium">
                {money > 999999999999999 ? "∞ " : money.toLocaleString()}원
              </div>
              <div className="mg-icon-lucky-money w-[57px] h-[58px] absolute left-3 bottom-[0.3px]" />
              <button
                className="mx-2 h-[35px] w-[35px] ml-5 mg-icon-capture"
                onClick={downloadBtn}
              />
              <button
                className={
                  bgmOn
                    ? "ml-3 mg-icon-button-round mg-icon-sound-on"
                    : "ml-3 mg-icon-button-round mg-icon-sound-off"
                }
                onClick={handleBgm}
              />
            </div>
            <div className="absolute flex justify-center mg-width-size">
              <Greeting content={body || greeting} edit={false} />
            </div>
          </div>
          <div className="relative flex-col w-full mg-flex-center">
            <button className="scale-[-1] left-3 top-16 z-10 absolute mg-background bg-[url(/images/ico/ico-banner-arrow.svg)] rounded-full bg-[#0000004D] w-[34px] h-[34px]" />
            <button className="right-3 top-16 z-10 absolute mg-background bg-[url(/images/ico/ico-banner-arrow.svg)] rounded-full bg-[#0000004D] w-[34px] h-[34px]" />
            <div className="mg-flex-center justify-center top-[117px] z-10 absolute rounded-full bg-[#0000004D] px-3 h-[19px]">
              <div className="bg-[#FF9B53] mg-icon-pagination" />
              <div className="bg-[#D9D9D9] mg-icon-pagination" />
              <div className="bg-[#D9D9D9] mg-icon-pagination" />
              <div className="bg-[#D9D9D9] mg-icon-pagination" />
              <div className="bg-[#D9D9D9] mg-icon-pagination" />
            </div>
            <div className="bg-[url(/images/content/img-basket.svg)] w-[352px] h-[152px] mb-[74px]"></div>
            <LuckBags
              bagList={bagList}
              letterModal={letterModal}
              setLetterModal={setLetterModal}
              setLuckyBagId={setLuckyBagId}
            />
            {isLogin ? (
              <div className="cursor-pointer absolute w-[212px] justify-center mg-flex-center bottom-9">
                <button
                  className="pl-[60px] h-12 w-[212px] mg-secondary-button rounded-[100px] relative"
                  onClick={handleShareBtn}
                >
                  공유하기
                </button>
                <div className="absolute left-0 z-10 flex-col bottom-14 mg-flex-center">
                  <button
                    onClick={shareUrl}
                    className={
                      shareBtn
                        ? "mg-floating-button-long duration-200 bg-[url(/images/ico/ico-share-url.svg)] bg-primary-normal"
                        : "text-white"
                    }
                  >
                    {shareBtn && "url 복사하기"}
                  </button>
                  <button
                    onClick={shareQr}
                    className={
                      shareBtn
                        ? "pl-6 mg-floating-button-long duration-300 bg-[url(/images/ico/ico-share-qr.svg)] bg-link"
                        : "text-white"
                    }
                  >
                    {shareBtn && "QR코드 공유하기"}
                  </button>
                  <button
                    onClick={shareKakao}
                    className={
                      shareBtn
                        ? "text-[#3B1C1D] pl-7 mg-floating-button-long duration-400 bg-[length:30px_30px] bg-[url(/images/ico/ico-share-kakao.svg)] bg-social-kakaoNormal"
                        : "text-[#3B1C1D]"
                    }
                  >
                    {shareBtn && "카톡으로 공유하기"}
                  </button>
                </div>
                <div className="absolute w-12 h-12 mg-icon-share left-2" />
              </div>
            ) : (
              <div className="absolute flex items-end bottom-4">
                <button
                  className="h-12 mr-4 text-l mg-primary-button-round"
                  onClick={handleModal}
                >
                  새해 덕담 남기기
                </button>
                {modal && (
                  <LongModal
                    modal={modal}
                    setModal={setModal}
                    completeModal={completeModal}
                    setCompleteModal={setCompleteModal}
                  />
                )}
                <div className="transition-all duration-300 mg-flex">
                  <button
                    onClick={shareUrl}
                    className={
                      shareBtn
                        ? "mg-floating-button duration-200 bg-[url(/images/ico/ico-share-url.svg)] bg-primary-normal"
                        : ""
                    }
                  />
                  <button
                    onClick={shareQr}
                    className={
                      shareBtn
                        ? "mg-floating-button duration-300 bg-[url(/images/ico/ico-share-qr.svg)]  bg-link"
                        : ""
                    }
                  />
                  <button
                    onClick={shareKakao}
                    className={
                      shareBtn
                        ? "mg-floating-button duration-400 bg-[length:30px_30px] bg-[url(/images/ico/ico-share-kakao.svg)] bg-social-kakaoNormal"
                        : ""
                    }
                  />
                  <button
                    className="z-30 mg-icon-button-round mg-icon-share"
                    onClick={handleShareBtn}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        {!isLogin ? (
          <>
            <div className="flex justify-end mr-12 mg-width-size">
              복망고 소유주라면 &nbsp;
              <Link href="/login" className="mg-link">
                로그인
              </Link>
              하세요!
            </div>
            <Banner />
          </>
        ) : (
          <div className="text-center">
            <Link href="/mypage" className="mg-link">
              홍다희님
            </Link>
            의 새해 복망고입니다.
            <br />
            복주머니를 클릭하면 덕담을 볼 수 있어요!
          </div>
        )}
        {letterModal && (
          <LetterModal
            letterModal={letterModal}
            setLetterModal={setLetterModal}
            bag={bag}
            bagList={bagList}
          />
        )}
      </div>
      {qrCode && <QrModal qrCode={qrCode} setQrCode={setQrCode} />}
      <Toast />
    </div>
  );
};

export default index;
