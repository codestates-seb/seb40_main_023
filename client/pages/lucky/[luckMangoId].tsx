import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Greeting from "../../components/Greeting";
import LongModal from "../../components/modals/LongModal";
import LetterModal from "../../components/modals/LetterModal";
import { Toast, notifyError, notifyInfo } from "../../components/util/Toast";
import { useFetch } from "../../fetch/useFetch";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import Banner from "../../components/Banner";
import { useRouter } from "next/router";
import LuckBags from "../../components/LuckBags";
import QrModal from "../../components/modals/QrModal";
import { TEMPLETE_ID } from "../../constants/templeteId";
import Player from "../../components/lucky/Player";
import { useCookies } from "react-cookie";
import { getCookie } from "../../components/util/cookie";
import { memberIdState } from "../../recoil/memberId";
import { useRecoilValue } from "recoil";
import { luckMgType, UserInfoType } from "../../types/lucky";
import CheckModal from "../../components/modals/CheckModal";
import NotFound from "../404";
import { patchViewBag } from "../../fetch/lucky";
import { getUserInfoFetch } from "../../fetch/userInfo";

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
  const [bgmOn, setBgmOn] = useState<boolean>(false);
  const [shareBtn, setShareBtn] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [letterModal, setLetterModal] = useState<boolean>(false);
  const [qrCode, setQrCode] = useState<boolean>(false);
  const [completeModal, setCompleteModal] = useState<boolean>(false);

  //패치 구역
  const [body, setBody] = useState<string>("");
  const [bag, setBag] = useState([]);
  const [bagList, setBagList] = useState([]);
  const [luckyBagId, setLuckyBagId] = useState<number>(0);
  const [luckMgId, setLuckMgId] = useState<number>(0);
  const [luckMg, setLuckMg] = useState<luckMgType>();
  const [money, setMoney] = useState<number>(0);
  const [existPage, setExistPage] = useState<boolean>(true);
  const [bgUrl, setBgUrl] = useState<string>("");

  //복주머니
  const [currPage, setCurrPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const [isUpdate, setIsUpdate] = useState<boolean>(true);

  //로그인 여부
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const memberId = useRecoilValue(memberIdState).memberId;
  const [cookies] = useCookies(["accessJwtToken"]);
  const [userInfo, setUserInfo] = useState();
  const router = useRouter();

  const checkLogin = () => {
    const token = cookies.accessJwtToken;
    if (token === undefined || token === "") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  };

  const getUserInfomation = async () => {
    const res = await getUserInfoFetch(`/api/member/${memberId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessJwtToken")}`,
      },
    });
    setUserInfo(res.data);
  };

  useEffect(() => {
    checkLogin();
    getUserInfomation();
    if (!window.Kakao?.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    const { luckMangoId } = router.query;
    getLuckyMango(Number(luckMangoId));
    setLuckMgId(Number(luckMangoId));
  }, [router.isReady, completeModal]);

  useEffect(() => {
    if (!router.isReady) return;
    const { luckMangoId } = router.query;
    getAllLuckyBags(Number(luckMangoId), currPage);
  }, [router.isReady, currPage, completeModal]);

  useEffect(() => {
    getAllLuckyBags(luckMgId, currPage);
    setIsUpdate(false);
  }, [currPage, isUpdate]);

  const getLuckyMango = async (luckMangoId: number) => {
    const res = await useFetch(`/api/luckMango/${luckMangoId}`);
    if (res.status === 404) {
      setExistPage(false);
    } else {
      setExistPage(true);
      setBody(res.data.mangoBody);
      setMoney(res.data.tot_Money);
      setLuckMg(res.data);
      setBgUrl(res.data.bgImage);
    }
  };

  const getAllLuckyBags = async (luckMangoId: number, currPage: number) => {
    const res = await useFetch(
      `/api/luckBag/luckMango?luckMangoId=${luckMangoId}&page=${currPage}&size=7`,
    );
    if (res) {
      setBagList(res.data);
      setPageInfo(res.pageInfo);
    }
  };

  const shareKakao = () => {
    const { Kakao } = window;
    Kakao.Link.sendScrap({
      requestUrl: `https://seb40-main-023.vercel.app/lucky/${luckMgId}`,
      templateId: TEMPLETE_ID,
      templateArgs: {
        id: `${luckMgId}`,
        img: `${bgUrl}`,
        username: `${luckMg?.member.name}`,
      },
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

  const handleLetterModal = async (
    id: number,
    style: number,
    color: number,
  ) => {
    setLuckyBagId(id);

    if (isLogin && luckMg && (luckMg as any).member.memberId === memberId) {
      await patchViewBag(
        `/api/luckBag/${id}`,
        {
          bagColor: color,
          bagStyle: style,
          viewed: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("accessJwtToken")}`,
          },
        },
      ).then(() => setIsUpdate(true));
      setIsUpdate(true);
      setLetterModal(!letterModal);
    } else {
      notifyError({
        message: "복망고 주인만 볼 수 있어요.",
        icon: "🥲",
      });
      return;
    }
  };

  return (
    <div className="pt-4 bg-[url(/images/content/pt-dots.svg)]">
      <h1 className="mx-auto mb-1 mg-logo">
        <Link href="/">새해복망고 로고</Link>
      </h1>
      <main>
        <div ref={downloadRef}>
          {existPage ? (
            <div className="w-full mg-layout">
              <div
                style={{ backgroundImage: `url("${bgUrl}")` }}
                className="justify-start bg-center bg-cover rounded-md mg-bok-layout bg-[#eee]"
              >
                <div className="top-0 justify-between my-3 mg-bok-layout-row">
                  <div className="mx-2 grow before:bg-contain before:bg-[url(/images/content/ico-mg-money.svg)] before:w-[57px] before:h-[58px] before:top-[-13px] before:left-[-2px] before:content-[''] before:absolute relative pl-[60px] justify-end flex-nowrap pr-4 h-[40px] bg-white rounded-full mg-flex-center">
                    <p className="font-medium text-right truncate">
                      {money && money > 99999999999999
                        ? "∞ "
                        : money.toLocaleString()}
                      원
                    </p>
                  </div>
                  <button
                    className="flex-none mx-2 mg-icon-button-round mg-icon-capture bg-black/20 hover:bg-black/30"
                    onClick={downloadBtn}
                  />
                  <button
                    className={
                      bgmOn
                        ? "mx-3 mg-icon-button-round mg-icon-sound-on"
                        : "mx-3 mg-icon-button-round mg-icon-sound-off"
                    }
                    onClick={handleBgm}
                  />
                  <Player bgmOn={bgmOn} />
                </div>
                <div className="absolute flex justify-center w-full top-20 mg-bok-layout-row">
                  <Greeting content={body} edit={false} />
                </div>
                <div className="absolute bottom-[15%] w-full px-6 flex-col flex items-center mg-bok-layout-row">
                  {bagList && (
                    <LuckBags
                      luckMangoId={luckMgId}
                      letterModal={letterModal}
                      handleLetterModal={handleLetterModal}
                      setLetterModal={setLetterModal}
                      setLuckyBagId={setLuckyBagId}
                      luckyBagList={bagList}
                      pageInfo={pageInfo}
                      setCurrPage={setCurrPage}
                      currPage={currPage}
                      setIsUpdate={setIsUpdate}
                    />
                  )}
                </div>
                <div className="absolute bottom-[5%] w-full px-4 mg-bok-layout-row">
                  {isLogin &&
                  luckMg &&
                  (luckMg as any)?.member?.memberId === memberId ? (
                    <div className="flex-col-reverse items-end justify-center mg-flex-center">
                      <button
                        className="mg-icon-share my-1 w-[230px] bg-[left_1rem_center] mg-secondary-button-round"
                        onClick={handleShareBtn}
                      >
                        공유하기
                      </button>
                      <div className="relative z-10 flex-col mg-flex-center">
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
                    </div>
                  ) : (
                    <div className="flex items-end">
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
                          luckMg={luckMg}
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
              {isLogin &&
              luckMg &&
              (luckMg as any)?.member?.memberId === memberId ? (
                <div className="pt-10 text-center mg-layout-row text-mono-400">
                  <Link
                    href={`/mypage/${memberId}`}
                    className="font-medium mg-link text-link"
                  >
                    {userInfo && (userInfo as UserInfoType).name}님
                  </Link>
                  님이 제작하신 새해 복망고입니다.
                  <p className="underline text-mono-600">
                    복주머니를 클릭하면 덕담을 볼 수 있어요!
                  </p>
                </div>
              ) : (
                <div className="pt-10 mg-layout-row">
                  <div className="pl-[95px] text-center">
                    복망고 소유주라면 &nbsp;
                    <Link href="/login" className="mg-link">
                      로그인
                    </Link>
                    하세요!
                  </div>
                  <Banner />
                </div>
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
          ) : (
            <NotFound message="찾으시는 복망고가 없는 것 같아요" />
          )}
          {qrCode && <QrModal shareQr={shareQr} />}
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
        <Toast />
      </main>
    </div>
  );
};

export default index;
