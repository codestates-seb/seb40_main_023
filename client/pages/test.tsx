import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import DefaultModal from "../components/Modal/DefaultModal";
import { selectModalState, setModalState } from "../store/modalSlice";
import { useQRCode } from "next-qrcode";

const test = () => {
  const dispatch = useDispatch();
  const modalState = useSelector(selectModalState);
  const { Canvas } = useQRCode();

  return (
    <div>
      <button
        onClick={() =>
          modalState
            ? dispatch(setModalState(false))
            : dispatch(setModalState(true))
        }
        className="bg-black"
      >
        adadsdadadsdasdasasdas
      </button>
      {modalState && (
        <DefaultModal
          title={"지금까지 받은 덕담도 모두 삭제됩니다."}
          contents={"삭제된 새해복망고는 복구할 수 없습니다!"}
          confirm={"그래도 삭제하시겠어요?"}
          button1={"아니오"}
          button2={"삭제할게요"}
        />
      )}
      <Canvas
        text={"https://github.com/bunlong/next-qrcode"}
        options={{
          level: "M",
          margin: 3,
          scale: 4,
          width: 200,
          color: {
            dark: "#010599FF",
            light: "#FFBF60FF",
          },
        }}
      />
    </div>
  );
};

export default test;
