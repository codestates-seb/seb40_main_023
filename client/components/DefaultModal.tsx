import Image from "next/image";
import React from "react";
import closed from "../public/images/ico/ico-modal-close.svg";

const DefaultModal = () => {
  return (
    <div className="w-[350px] h-[200px] z-999 absolute top-[50%] left-[50%] bg-white border rounded-2xl -translate-x-2/4 -translate-y-2/4 p-3">
      <header className="flex justify-end w-full hover:cursor-pointer">
        <Image src={closed} alt="" />
      </header>
      <main className="flex flex-col justify-center gap-1 text-center">
        지금까지 받은 덕담도 모두 삭제됩니다.
        <div>삭제된 새해복망고는 복구할 수 없습니다!</div>
        <div>그래도 삭제하시겠어요?</div>
      </main>
      <div className="flex justify-around p-2">
        <button className="mg-negative-button-round"> 아니요</button>
        <button className="rounded-full mg-primary-button">삭제할게요</button>
      </div>
    </div>
  );
};

export default DefaultModal;
