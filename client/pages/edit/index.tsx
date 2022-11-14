import React from "react";

const edit = () => {
  return (
    <div className="mg-layout">
      <h1 className="leading-[47px] text-4xl font-bold">
        새해 <span className="text-[#F6911B]">복망고</span> 만들기
      </h1>
      <div className="mt-4 mb-8">
        초간단! 나만의 복망고 페이지를 생성해 보세요!
      </div>
      <div className="justify-center mg-width-size mg-flex">
        <div className="mg-flex-center">
          <div className="py-3 font-semibold text-s">
            복망고 제목을 입력해 주세요.
          </div>
          <span className="ml-3 text-xs text-danger-normal">
            * 최대 16자까지 입력할 수 있습니다.
          </span>
        </div>
        <input
          placeholder="친구들에게 보내는 카드"
          className="h-10 mb-5 text-sm mg-input"
        ></input>
        <div className="py-3 font-semibold text-s">
          받는 사람에게 보여질 새해 인사를 입력해 주세요.
        </div>
        <textarea
          placeholder="얘들아! 2023년에도 잘 부탁해~ 정말 고생 많았고, 우리 
오래오래 보자!"
          className="py-3 text-sm resize-none h-18 mb-7 mg-input"
        ></textarea>
        <div className="relative justify-center mg-border-2 h-[600px] mg-flex">
          <div className="mg-width-size w-[101%] h-[60px] rounded-t-[10px] bg-[#EEEEEE] absolute top-[-2px] left-[-2px]"></div>
          <div className="items-center mg-flex">
            <div className="mg-border-2 p-4 text-sm w-4/6 border-dashed border-[#CCCCCC]">
              얘들아! 2023년에도 잘 부탁해~ 정말
              <br />
              고생 많았고, 우리 오래오래 보자!
            </div>
            <button className="w-8/12 my-20 font-bold mg-white-button">
              이미지 등록하기
            </button>
            <div className="w-5/6 h-32 bg-[#CCCCCC]/[0.5] border-[3px] border-dashed border-[#CCCCCC] rounded-[50%]"></div>
          </div>
        </div>
      </div>
      <button className="mt-8 mg-primary-button">완성!</button>
    </div>
  );
};

export default edit;
