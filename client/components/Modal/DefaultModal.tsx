import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import closed from "../../public/images/ico/ico-modal-close.svg";
import { selectModalState, setModalState } from "../../store/modalSlice";

const DefaultModal = ({
  title,
  contents,
  confirm,
  Nobutton,
  Yesbutton,
}: any) => {
  const dispatch = useDispatch();
  const modalState = useSelector(selectModalState);
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 bg-mono-400 z-999">
      <div className="w-[300px] h-[200px] absolute top-[50%] left-[50%] bg-white border rounded-xl -translate-x-2/4 -translate-y-2/4 p-2 box-border">
        <header className="flex justify-end w-full hover:cursor-pointer">
          <Image
            src={closed}
            alt=""
            onClick={() =>
              modalState
                ? dispatch(setModalState(false))
                : dispatch(setModalState(true))
            }
          />
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
              onClick={() =>
                modalState
                  ? dispatch(setModalState(false))
                  : dispatch(setModalState(true))
              }
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
