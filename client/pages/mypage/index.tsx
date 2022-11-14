import React, { useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import UserModify from "../../components/userModify";
import BokCard from "../../components/BokCard";
import Profile from "../../public/dummy/mypage-profile.png";
import Image from "next/image";
import { dummy } from "./dummy";
const mypage = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  return (
    <div className="mg-layout">
      <div className="max-w-[400px] w-full relative flex">
        <Image src={Profile} alt="" />
        <button
          className="absolute w-11 h-11 top-[90px] left-[100px] mg-icon-card-edit mg-secondary-button-line bg-mono-700 hover:bg-mono-600"
          onClick={handleClick}
        ></button>
        <div className="flex flex-col justify-center pl-4">
          <div className="text-3xl">카리나</div>
          <div className="underline text-mono-400 hover:cursor-pointer hover:text-mono-300">
            회원탈퇴
          </div>
        </div>
      </div>
      <div className="flex flex-row col-span-1">
        {click ? (
          <UserModify />
        ) : (
          <div className="flex flex-col max-w-[500px] w-full">
            <div className="flex mt-10">나의 복망고 리스트</div>

            <div className="grid grid-cols-2 gap-2">
              <BokCard data={dummy} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default mypage;
