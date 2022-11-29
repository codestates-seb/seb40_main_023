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
import Player from "../../components/lucky/Player";
import { useCookies } from "react-cookie";
import axios from "axios";
import { getCookie } from "../../components/util/cookie";
import { memberIdState } from "../../recoil/memberId";
import { useRecoilValue } from "recoil";
import { UserInfoType } from "../../types/lucky";
import CheckModal from "../../components/modals/CheckModal";

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
  const [modal, setModal] = useState(false);
  const [letterModal, setLetterModal] = useState(false);
  const [qrCode, setQrCode] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);

  //패치 구역
  const [body, setBody] = useState("");
  const [bag, setBag] = useState([]);
  const [bagList, setBagList] = useState([]);
  const [luckyBagId, setLuckyBagId] = useState(0);
  const [luckMgId, setLuckMgId] = useState(0);
  const [luckMg, setLuckMg] = useState();
  const [money, setMoney] = useState(0);
  const [luckMemId, setLuckMemId] = useState();

  //페이지네이션
  const [curPage, setCurPage] = useState(1);
  const [totPage, setTotPage] = useState();

  //로그인 여부

  const [isLogin, setIsLogin] = useState(false);
  const memberId = useRecoilValue(memberIdState);
  const [cookies] = useCookies(["accessJwtToken"]);
  const [userInfo, setUserInfo] = useState();
  const checkLogin = () => {
    const token = cookies.accessJwtToken;
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  const getUserInfo = async () => {
    try {
      await axios({
        method: "get",
        url: `/api/member/${memberId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessJwtToken")}`,
        },
      }).then(el => {
        setUserInfo(el.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getLuckUserInfo = async () => {
    try {
      await axios({
        method: "get",
        url: `/api/member/${luckMemId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessJwtToken")}`,
        },
      }).then(el => {
        setMoney(el.data.data.tot_Money);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
    checkLogin();
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }
  }, []);

  useEffect(() => {
    if (luckMemId) {
      getLuckUserInfo();
    }
  }, [luckMemId]);

  //유저 아이디 가져와서 then으로 엮기
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const { luckMangoId } = router.query;
    getLuckyMango(Number(luckMangoId));
    setLuckMgId(Number(luckMangoId));
  }, [router.isReady]);

  useEffect(() => {
    if (!router.isReady) return;
    const { luckMangoId } = router.query;
    getAllLuckyBags(Number(luckMangoId), curPage);
  }, [router.isReady, curPage]);

  const getLuckyMango = async (luckMangoId: number) => {
    const res = await useFetch(`/api/luckMango/${luckMangoId}`);
    setBody(res?.data?.mangoBody);
    setLuckMg(res.data);
    setLuckMemId(res.data.member.memberId);
  };
  console.log("@!@!@", luckMg);
  const getAllLuckyBags = async (luckMangoId: number, curPage: number) => {
    const res = await useFetch(
      `/api/luckBag/luckMango?luckMangoId=${luckMangoId}&page=${curPage}&size=7`,
    );
    setTotPage(res.pageInfo?.totalPages);
    setBagList(res.data);
  };

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

  //bgm
  const handleBgm = () => {
    setBgmOn(!bgmOn);
  };

  const handleShareBtn = () => {
    setShareBtn(!shareBtn);
  };

  const handleModal = () => {
    setModal(!modal);
  };

  const nextPage = () => {
    if (curPage === totPage) return;
    setCurPage(prev => prev + 1);
  };

  const prevPage = () => {
    if (curPage <= 1) return;
    setCurPage(prev => prev - 1);
  };

  return (
    <div ref={downloadRef}>
      <div className="mg-layout bg-[url(/images/content/pt-dots.svg)]">
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
              {/* BGM구간 */}
              <button
                className={
                  bgmOn
                    ? "ml-3 mg-icon-button-round mg-icon-sound-on"
                    : "ml-3 mg-icon-button-round mg-icon-sound-off"
                }
                onClick={handleBgm}
              />
              <Player bgmOn={bgmOn} onClick={handleBgm} />
            </div>
            <div className="absolute flex justify-center mg-width-size">
              <Greeting content={body} edit={false} />
            </div>
          </div>
          <div className="relative flex-col w-full mg-flex-center">
            <button
              onClick={prevPage}
              className="scale-[-1] left-3 top-16 z-10 absolute mg-background bg-[url(/images/ico/ico-banner-arrow.svg)] rounded-full bg-[#0000004D] w-[34px] h-[34px]"
            />
            <button
              onClick={nextPage}
              className="right-3 top-16 z-10 absolute mg-background bg-[url(/images/ico/ico-banner-arrow.svg)] rounded-full bg-[#0000004D] w-[34px] h-[34px]"
            />
            <div className="mg-flex-center justify-center top-[117px] z-10 absolute rounded-full bg-[#0000004D] px-3 h-[19px]">
              <div>
                {curPage}/{totPage}
              </div>
            </div>
            <div className="bg-[url(/images/content/img-basket.svg)] w-[352px] h-[152px] mb-[74px]" />
            <LuckBags
              bagList={bagList}
              letterModal={letterModal}
              setLetterModal={setLetterModal}
              setLuckyBagId={setLuckyBagId}
            />
            {isLogin &&
            luckMg &&
            (luckMg as any).member.memberId === memberId ? (
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
                    luckMgId={luckMgId}
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
        {isLogin && luckMg && (luckMg as any).member.memberId === memberId ? (
          <div className="text-center">
            <Link href={`/mypage/${memberId}`} className="mg-link">
              {userInfo && (userInfo as UserInfoType).name}님
            </Link>
            의 새해 복망고입니다.
            <br />
            복주머니를 클릭하면 덕담을 볼 수 있어요!
          </div>
        ) : (
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
        )}
        {letterModal && (
          <LetterModal
            letterModal={letterModal}
            setLetterModal={setLetterModal}
            bag={bag}
            bagList={bagList}
            setBag={setBag}
            luckyBagId={luckyBagId}
          />
        )}
      </div>
      {qrCode && <QrModal qrCode={qrCode} setQrCode={setQrCode} />}
      <Toast />
      {completeModal && (
        <CheckModal
          Yesbutton="복망고 만들기"
          Nobutton="괜찮아요"
          firstP={`${(luckMg as any).member.name}님에게 덕담이 성공적으로`}
          secondP="전달되었습니다!"
          confirm="아직 복망고가 없으시다면 만들어 보세요!"
          completeModal={completeModal}
          setCompleteModal={setCompleteModal}
        />
      )}
    </div>
  );
};

export default index;
