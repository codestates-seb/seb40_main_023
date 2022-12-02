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
  const [userImg, setUserImg] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [length, setLength] = useState<Number>(0);

  const userModify = () => {
    setClick(!click);
  };

  const isModal = () => {
    setModal(!modal);
  };

  console.log(userImg);

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

  useEffect(() => {
    getUserName();
  }, [userImg, setUserImg]);

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
              {userImg === "NONE" ? (
                <div className="bg-[url(/images/ico/ico-profile.svg)] w-36 h-36 relative justify-center mg-border-2 mg-flex bg-center rounded-full bg-cover"></div>
              ) : (
                <div className="relative justify-center bg-center bg-cover rounded-full w-36 h-36 mg-border-2 mg-flex">
                  <Image
                    src={`https://s3.ap-northeast-2.amazonaws.com/saypart/%2F544f7ddd-b73f-43ab-9382-fa8c26170057-BokMango%20%2811%29.png`}
                    alt="유저 프로필"
                    priority
                    width={140}
                    height={140}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center pl-4">
              <div className="text-3xl">{userName}</div>
              <div className="flex gap-5 text-xl">
                <div
                  className="underline text-mono-400 hover:cursor-pointer hover:text-mono-300"
                  onClick={userModify}
                >
                  정보수정
                </div>
                <div
                  className="underline text-mono-400 hover:cursor-pointer hover:text-mono-300"
                  onClick={isModal}
                >
                  회원탈퇴
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-row col-span-1">
          {click ? (
            <UserModify handle={userModify} userName={userName} modal={modal} />
          ) : (
            <div className="flex flex-col min-w-[400px] w-full mb-5">
              <div className="flex mt-[40px] mb-[10px] text-2xl">
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
                      bgImage={el.bgImage}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        {length === 0 ? (
          <div className="flex flex-col items-center max-w-[230px]">
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
