import React, { useState } from "react";
import UserModify from "../../components/UserInfo";
import Profile from "../../public/dummy/mypage-profile.png";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { selectModalState, setModalState } from "../../store/modalSlice";
import DefaultModal from "../../components/Modal/DefaultModal";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import GalleryItem from "../../components/main/gallery/GalleryItem";

const Mypage = () => {
  //나중에 카운트 바꾸기 (한 유저 복망고 숫자로)
  const count = 12;
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  const modalState = useSelector(selectModalState);

  const handleClick = () => {
    setClick(!click);
    dispatch(setModalState(false));
  };

  return (
    <div>
      {!modalState && (
        <div>
          <Header />
          <aside>
            <Sidebar />
          </aside>
        </div>
      )}
      <div className="flex flex-col items-center w-full h-full min-h-screen pt-10">
        {modalState && (
          <DefaultModal
            title={"지금까지 받은 덕담도 모두 삭제됩니다."}
            contents={
              "링크를 전달받은 친구들이 더 이상 \n 새해복망고 페이지를 볼 수 없습니다."
            }
            confirm={"그래도 탈퇴하시겠어요?"}
            Nobutton={"아니오"}
            Yesbutton={"탈퇴할게요"}
          />
        )}
        {!modalState && (
          <div className="max-w-[400px] w-full relative flex mt-16">
            <div>
              <Image src={Profile} alt="프로필" />
            </div>
            <div className="flex flex-col justify-center pl-4">
              <div className="text-3xl">유저 아이디</div>
              <div className="flex gap-5 text-xl">
                <div
                  className="underline text-mono-400 hover:cursor-pointer hover:text-mono-300"
                  onClick={handleClick}
                >
                  정보수정
                </div>
                <div
                  className="underline text-mono-400 hover:cursor-pointer hover:text-mono-300"
                  onClick={() =>
                    modalState
                      ? dispatch(setModalState(false))
                      : dispatch(setModalState(true))
                  }
                >
                  회원탈퇴
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-row col-span-1">
          {click ? (
            <UserModify handle={handleClick} />
          ) : (
            <div className="flex flex-col min-w-[400px] w-full mb-5">
              <div className="flex mt-[40px] mb-[10px] text-2xl">
                나의 복망고 리스트
              </div>
              {!modalState && (
                <div className="grid w-full grid-cols-2 gap-2 tablet:grid-cols-2">
                  {Array.from({ length: count }).map((el, idx) => (
                    <GalleryItem key={idx} mypage={"mg-mypage-card"} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {!modalState && <Footer />}
    </div>
  );
};

export default Mypage;
