import Image from "next/image";
import React from "react";
import closed from "../../public/images/ico/ico-modal-close.svg";
//마이페이지용 모달로 사용하겠습니다.
const DefaultModal = ({
  title,
  contents,
  confirm,
  Nobutton,
  Yesbutton,
  setModal,
}: any) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 bg-mono-400">
      <div className="absolute top-[50%] left-[50%] bg-white border rounded-xl -translate-x-2/4 -translate-y-2/4 p-2 box-border z-999 w-[300px] h-[200px]">
        <header className="flex justify-end w-full hover:cursor-pointer">
          <Image
            src={closed}
            alt="closed button"
            onClick={() => setModal(false)}
          />
        </header>
        <div>
          <main className="flex flex-col gap-1 text-center">
            <div>{title}</div>
            <div className="whitespace-pre-line text-mono-500">{contents}</div>
            <div className=" text-mono-400">{confirm}</div>
            <footer className="flex justify-center gap-5 p-3">
              {Nobutton && (
                <button
                  className="mg-negative-button-round"
                  onClick={() => setModal(false)}
                >
                  {Nobutton}
                </button>
              )}
              <button className="rounded-full mg-primary-button">
                {Yesbutton}
              </button>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DefaultModal;
