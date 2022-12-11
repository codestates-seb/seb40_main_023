import React from "react";
import Image from "next/image";
import closed from "../../public/images/ico/ico-modal-close.svg";
import { createBag } from "../../fetch/lucky";
import Router from "next/router";
import { CheckModalProps } from "../../types/lucky";

const CheckModal = ({
  confirmModal,
  setConfirmModal,
  Nobutton,
  Yesbutton,
  firstP,
  secondP,
  confirm,
  create,
  data,
  setModal,
  completeModal,
  setCompleteModal,
  luckMgId,
}: CheckModalProps) => {
  const createLuckBag = async () => {
    const colorNum = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    const res = await createBag("/api/luckBag", {
      luckMangoId: luckMgId!,
      luckBagBody: data!.luckContent,
      writer: data!.writer,
      bagStyle: data!.bagType,
      bagColor: colorNum,
      nyMoney: data!.money,
    });
    setModal!(false);
    setConfirmModal!(false);
    setCompleteModal(!completeModal);
  };

  const moveToLuckMg = () => {
    Router.push("/create");
  };

  const handleConfirm = () => {
    setConfirmModal!(!confirmModal);
  };

  const handleComplete = () => {
    setCompleteModal(!completeModal);
  };

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 z-999">
      <div className="z-20 w-[356px] h-[238px] absolute top-[50%] left-[50%] bg-white border shadow-context rounded-xl -translate-x-2/4 -translate-y-2/4 p-2 box-border">
        <header className="flex justify-end w-full hover:cursor-pointer">
          <Image
            src={closed}
            alt="close button"
            className="z-50 cursor-pointer"
            onClick={create ? handleConfirm : handleComplete}
          />
        </header>
        <section className="mt-[0.5rem] h-[100px] mg-flex justify-center">
          <main className="flex flex-col justify-center gap-1 text-center">
            <p>{firstP}</p>
            <p>{secondP}</p>
            <p className="whitespace-pre-line text-mono-500">{confirm}</p>
          </main>
        </section>
        <footer className="flex justify-center gap-[0.5rem] mt-[1rem] mb-1.5">
          {Nobutton && (
            <button
              className="mg-negative-button-round"
              onClick={create ? handleConfirm : handleComplete}
            >
              {Nobutton}
            </button>
          )}
          <button
            className="rounded-full mg-primary-button"
            onClick={create ? createLuckBag : moveToLuckMg}
          >
            {Yesbutton}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default CheckModal;
