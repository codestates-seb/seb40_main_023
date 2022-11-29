import Image from "next/image";
import React from "react";
import closed from "../../public/images/ico/ico-modal-close.svg";

const DefaultModal = ({
  title,
  contents,
  confirm,
  Nobutton,
  Yesbutton,
  setModal,
}: any) => {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 bg-mono-400 z-999">
      <div className="absolute top-[50%] left-[50%] bg-white border rounded-xl -translate-x-2/4 -translate-y-2/4 p-2 box-border">
        <header className="flex justify-end w-full hover:cursor-pointer">
          <Image src={closed} alt="closed" onClick={() => setModal(false)} />
        </header>
        <section className="">
          <main className="flex flex-col justify-center gap-1 text-center">
            <div>{title}</div>
            <div className="whitespace-pre-line text-mono-500">{contents}</div>
            <div className=" text-mono-400">{confirm}</div>
          </main>
        </section>
        <footer className="flex justify-center gap-5 p-2 mt-3">
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
      </div>
    </div>
  );
};

export default DefaultModal;
