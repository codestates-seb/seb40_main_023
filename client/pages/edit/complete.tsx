import React from "react";

const complete = () => {
  return (
    <div className="justify-center mg-layout">
      <h1 className="leading-[47px] text-4xl font-bold">
        새해 <span className="text-[#F6911B]">복망고</span> 완성!
      </h1>
      <div className="mt-4 mb-8">
        친구들에게 링크를 공유해서 덕담을 나눠 보세요!
      </div>
      <div className="flex my-16">
        <button className="mr-8 mg-share-button bg-primary-normal"></button>
        <button className="mr-8 mg-share-button bg-secondary-normal"></button>
        <button className="mg-share-button bg-[#F2DA00]"></button>
      </div>

      <button className="mt-8 mg-primary-button">메인으로 가기</button>
    </div>
  );
};

export default complete;
