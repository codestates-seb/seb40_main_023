import React, { useEffect, useState } from "react";
import UserModify from "../../components/UserInfo";
import DefaultModal from "../../components/modals/DefaultModal";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import GalleryItem from "../../components/mypage/GalleryItem";
import { Toast } from "../../components/util/Toast";
import { getCookie } from "../../components/util/cookie";
import axios from "axios";
import { useRecoilState } from "recoil";
import { memberIdState } from "../../recoil/memberId";
import Link from "next/link";
import Image from "next/image";
import { useFetch } from "../../fetch/useFetch";
import { useCookies } from "react-cookie";
import { userState } from "../../recoil/user";
import { useRouter } from "next/router";

const Mypage = () => {
  const [memberId, setMemberId] = useRecoilState(memberIdState);
  const userId = memberId.memberId;
  const [click, setClick] = useState(false);
  const [LuckMango, setLuckMango]: any = useState([]);
  const [userName, setUserName] = useState<string>("");
  const [userImg, setUserImg] = useState<any>("");
  const [modal, setModal] = useState<boolean>(false);
  const [length, setLength] = useState<Number>(0);
  const [bagList, setBagList] = useState([]);
  const [cookies] = useCookies(["accessJwtToken"]);
  const [user, setUser] = useRecoilState(userState);
  const route = useRouter();

  const checkLogin = () => {
    const token = cookies.accessJwtToken;
    if (!token) {
      setUser({ login: false });
      setMemberId({ memberId: 0 });
      localStorage.removeItem("recoil-persist");
      route.push("/");
    }
  };

  const userModify = () => {
    setClick(!click);
  };

  const isModal = () => {
    setModal(!modal);
  };

  const getUserName = async () => {
    axios({
      method: "get",
      url: `/api/member/${userId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessJwtToken")}`,
      },
    }).then((el: any) => {
      setUserName(el.data.data.name);
      setUserImg(el.data.data.imgUrl);
    });
  };

  const getLuckMango = async () => {
    axios({
      method: "get",
      url: `/api/luckMango/member?memberId=${userId}&page=1&size=100&sort=desc`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessJwtToken")}`,
      },
    }).then((res): any => {
      setLength(res.data.data.length);
      setLuckMango(res.data.data);
    });
  };

  const getAllLuckyBags = async (userId: number) => {
    const res = await useFetch(
      `/api/luckBag/luckMango?luckMangoId=${userId}&page=1&size=7`,
    );
    setBagList(res.pageInfo.totalElements);
  };

  useEffect(() => {
    getLuckMango();
    getUserName();
    checkLogin();
    getAllLuckyBags(userId);
  }, []);

  return (
    <div>
      {!modal && (
        <div>
          <Header />
          <aside>
            <Sidebar />
          </aside>
        </div>
      )}
      <div className="flex flex-col items-center w-full h-full min-h-screen pt-10">
        {modal && <DefaultModal setModal={setModal} />}
        {!modal && (
          <div className="max-w-[400px] w-full relative flex mt-16">
            <div>
              <div
                style={
                  userImg === "NONE" || ""
                    ? {}
                    : { backgroundImage: `url("${userImg}")` }
                }
                className={
                  userImg === "NONE" || ""
                    ? `bg-[url(/images/char/profile.webp)] w-36 h-36 relative justify-center mg-border-2 mg-flex bg-center rounded-full bg-cover`
                    : `relative justify-center bg-center bg-cover rounded-full w-36 h-36 mg-border-2 mg-flex`
                }
              ></div>
            </div>
            <div className="flex flex-col justify-center pl-5">
              <div className="text-3xl">{userName}</div>
              <div className="flex gap-5 text-base">
                <button
                  className="underline text-mono-400 hover:cursor-pointer hover:text-mono-300"
                  onClick={userModify}
                >
                  정보수정
                </button>
                <button
                  className="underline text-mono-400 hover:cursor-pointer hover:text-mono-300"
                  onClick={isModal}
                >
                  회원탈퇴
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-row col-span-1">
          {click ? (
            <UserModify
              handle={userModify}
              userName={userName}
              modal={modal}
              userImg={userImg}
              setUserImg={setUserImg}
            />
          ) : (
            <div className="flex flex-col min-w-[400px] w-full mb-5">
              <div className="flex mt-[40px] mb-[10px] text-xl">
                나의 복망고 리스트
              </div>
              {!modal && (
                <div className="grid w-full grid-cols-2 gap-2 tablet:grid-cols-2">
                  {LuckMango.map((el: any, index: any) => (
                    <GalleryItem
                      key={index}
                      userName={userName}
                      luckMangoId={el.luckMangoId}
                      title={el.title}
                      bagList={bagList}
                      bgImage={el.bgImage}
                      length={length}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        {length === 0 && !click ? (
          <div className="flex flex-col items-center max-w-[230px]">
            <p className="mb-1 text-mono-textDisabled">
              아직 만드신 복망고가 없습니다.
            </p>
            <Link
              href="/create"
              className="mb-4 selection:underline text-primary-normal hover:text-primary-hover"
            >
              새로운 복망고를 만들어 볼까요?
            </Link>
            <Image
              width={113}
              height={95}
              src="/images/char/char-button1.svg"
              alt="버튼 유도 복망고 캐릭터"
              priority
            />
            <Link href="/create" className="mg-primary-button">
              복망고 만들러가기!
            </Link>
          </div>
        ) : null}
        <Toast />
      </div>
      {!modal && <Footer />}
    </div>
  );
};

export default Mypage;
