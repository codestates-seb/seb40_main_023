import React from "react";

const mypage = () => {
  return (
    <>
      <div className="bg-mono-300">헤더</div>
      <div className="flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="flex mt-24 bg-primary-100">
            <div className="relative flex items-center justify-center w-40 h-40 mr-10 rounded-full bg-primary-400">
              이미지
            </div>
            <div className="w-[400px] pl-4">이름 소개글 회원탈퇴</div>
          </div>
          <div className="flex mt-10">나의 복망고 리스트</div>
        </div>
      </div>
    </>
  );
};

export default mypage;
