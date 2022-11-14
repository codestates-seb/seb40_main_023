import React, { useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import UserModify from "../components/userModify";
const mypage = () => {
  const [click, setClick] = useState(true);

  const handleClick = () => {
    setClick(!click);
  };

  return (
    <div className="mg-layout">
      <div className="max-w-[500px] w-full relative flex">
        <div className="flex items-center justify-center rounded-full w-36 h-36 bg-primary-400">
          이미지
        </div>
        <div
          className="absolute w-8 h-8 top-[100px] left-[115px] rounded-full bg-mono-500 flex justify-center items-center hover:cursor-pointer"
          onClick={handleClick}
        >
          <BsFillPencilFill />
        </div>
        <div className="flex flex-col justify-center pl-4">
          <div className="text-xl">카리나</div>
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
              <div className="w-[240px] h-[200px] bg-mono-500">리스트</div>
              <div className="w-[240px] h-[200px] bg-mono-500">리스트</div>
              <div className="w-[240px] h-[200px] bg-mono-500">리스트</div>
              <div className="w-[240px] h-[200px] bg-mono-500">리스트</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default mypage;
