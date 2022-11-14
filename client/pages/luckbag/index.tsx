import React from "react";

const index = () => {
  return (
    <div className="mg-layout">
      <div className="mg-width-size h-[600px] mg-border-2 bg-secondary-200 mg-flex items-center">
        <div className="flex items-center w-full">
          <div className="ml-6 w-[235px] h-[40px] bg-white rounded-full flex justify-end items-center pr-5 my-5 truncate font-medium">
            10,000,001원
          </div>
          <button className="mx-2">캡처</button>
          <button className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary-400">
            bgm
          </button>
        </div>
        <div className="w-4/6 p-4 text-sm border-white mg-border-2 bg-[#FFFFFFCC]">
          얘들아! 2023년에도 잘 부탁해~ 정말
          <br />
          고생 많았고, 우리 오래오래 보자!
        </div>
      </div>
    </div>
  );
};

export default index;
