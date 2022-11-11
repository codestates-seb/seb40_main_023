import React from "react";

const edit = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="leading-[47px] text-4xl">
        새해 <span>복망고</span> 만들기
      </h1>
      <div className="">1분 만에 나만의 복망고 페이지를 생성해 보세요!</div>
      <div className="border border-solid rounded-[10px] min-w-[300px] max-w-[400px] max-h-[500px] min-h-[400px] border-black flex flex-col items-center justify-center">
        <div className="w-4/5 border border-solid rounded-[10px] h-[54px] font-bold px-8 py-3 text-xs text-center">
          나의 복망고를 찾는 친구에게 보여질 <br />
          한줄 소개를 작성해 주세요!
        </div>
        <button>이미지 등록하기</button>
        <div className="w-5/6 h-32 bg-[#CCCCCC]/[0.5] border-[3px] border-dashed border-[#CCCCCC] rounded-[50%]"></div>
      </div>
      <button>완성하기</button>
    </div>
  );
};

export default edit;
