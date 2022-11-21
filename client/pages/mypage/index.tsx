import React, { useState } from "react";
import UserModify from "../../components/userModify";
import BokCard from "../../components/BokCard";
import Profile from "../../public/dummy/mypage-profile.png";
import Image from "next/image";
import { dummy } from "./dummy";
import { useDispatch, useSelector } from "react-redux";
import { selectModalState, setModalState } from "../../store/modalSlice";
import DefaultModal from "../../components/Modal/DefaultModal";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import Footer from "../../components/Footer";

const mypage = () => {
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  const modalState = useSelector(selectModalState);

  const handleClick = () => {
    setClick(!click);
    dispatch(setModalState(false));
  };

  return (
    <>
      {!modalState && (
        <div>
          <Header />
          <aside>
            <Sidebar />
          </aside>
        </div>
      )}
      <div className="mg-layout">
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
          <div className="max-w-[500px] w-full relative flex mt-16">
            <div>
              <Image src={Profile} alt="" />
            </div>
            {!click ? (
              <button
                className="absolute w-11 h-11 top-[90px] left-[100px] mg-icon-card-edit mg-secondary-button-line bg-mono-700 hover:bg-mono-600"
                onClick={handleClick}
              />
            ) : null}

            <div className="flex flex-col justify-center pl-4">
              <div className="text-3xl">카리나</div>
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
        )}
        <div className="flex flex-row col-span-1 z-1">
          {click ? (
            <UserModify handle={handleClick} />
          ) : (
            <div className="flex flex-col max-w-[500px] w-full">
              <div className="flex mt-10 text-xl">나의 복망고 리스트</div>
              <div className="grid grid-cols-2 gap-2">
                <BokCard data={dummy} />
              </div>
            </div>
          )}
        </div>
      </div>
      {!modalState && (
        <footer className="absolute bottom-0 flex w-full">
          <Footer />
        </footer>
      )}
    </>
  );
};

export default mypage;
