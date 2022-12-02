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

const Mypage = () => {
  const [memberId, setMemberId] = useRecoilState(memberIdState);
  const userId = memberId.memberId;
  const [click, setClick] = useState(false);
  const [LuckMango, setLuckMango]: any = useState([]);
  const [userName, setUserName] = useState<string>("");
  const [userImg, setUserImg] = useState("");
  const [modal, setModal] = useState<boolean>(false);
  const [length, setLength] = useState<Number>(0);

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

  useEffect(() => {
    getLuckMango();
    getUserName();
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
      <main className="pt-[58px]">
        <div className="flex flex-col w-full h-full min-h-screen px-4 mobile:px-2 mx-auto max-w-[440px]">
          {modal && <DefaultModal setModal={setModal} />}
          {!modal && (
            <div className="max-w-[400px] w-full relative flex mt-16">
              <div>
                {userImg === "NONE" || undefined ? (
                  <div className="bg-[url(/images/char/profile.webp)] w-36 h-36 relative justify-center mg-border-2 mg-flex bg-center rounded-full bg-cover"></div>
                ) : (
                  <div className="relative justify-center bg-center bg-cover rounded-full w-36 h-36 mg-border-2 mg-flex"></div>
                )}
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
              />
            ) : (
              <div className="flex flex-col w-full mb-5">
                <div className="flex mt-[40px] mb-[10px] text-xl">
                  나의 복망고 리스트
                </div>
                {!modal && (
                  <div className="relative grid w-full justify-items-center mb-[20px] grid-flow-row grid-cols-2 gap-6 tablet:grid-cols-3">
                    {LuckMango.map((el: any, index: any) => (
                      <GalleryItem
                        key={index}
                        luckMangoId={el.luckMangoId}
                        title={el.title}
                        bgImage={el.bgImage}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          {length === 0 ? (
            <div className="flex flex-col items-center w-full">
              <p className="mb-1 text-mono-textDisabled">
                🥹 아직 만드신 복망고가 없습니다.
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
              />
              <Link href="/create" className="mg-primary-button">
                복망고 만들러가기!
              </Link>
            </div>
          ) : null}
          <Toast />
        </div>
      </main>
      {!modal && <Footer />}
    </div>
  );
};

export default Mypage;
