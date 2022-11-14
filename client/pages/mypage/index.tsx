import React, { useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import UserModify from "../../components/userModify";
import BokCard from "../../components/BokCard";
import Profile from "../../public/dummy/mypage-profile.png";
import Image from "next/image";
const mypage = () => {
  const [click, setClick] = useState(true);

  const handleClick = () => {
    setClick(!click);
  };

  return (
    <div className="mg-layout">
      <div className="max-w-[500px] w-full relative flex">
        <Image src={Profile} alt="" />
        <button
          className="absolute top-24 left-28 w-[55px] h-[55px]  bg-transparent border-2 border-mono-500 bg-mono-500 rounded-full hover:bg-[rgba(0,0,0)] mg-icon-card-edit text-mono-400"
          onClick={handleClick}
        ></button>
        <div className="flex flex-col justify-center pl-4">
          <div className="text-3xl">카리나</div>
          <div className="underline text-mono-400 hover:cursor-pointer hover:text-mono-300">
            회원탈퇴
          </div>
        </div>
      </div>
      <div>
        {click ? (
          <UserModify />
        ) : (
          <div className="flex flex-col max-w-[500px] w-full ">
            <div className="flex mt-10">나의 복망고 리스트</div>

            <div className="grid grid-cols-2 gap-2">
              <BokCard className="w-[240px] h-[200px] bg-mono-500">
                리스트
              </BokCard>
              <BokCard className="w-[240px] h-[200px] bg-mono-500">
                리스트
              </BokCard>
              <BokCard className="w-[240px] h-[200px] bg-mono-500">
                리스트
              </BokCard>
              <BokCard className="w-[240px] h-[200px] bg-mono-500">
                리스트
              </BokCard>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default mypage;
