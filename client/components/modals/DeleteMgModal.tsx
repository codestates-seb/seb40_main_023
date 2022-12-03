import Image from "next/image";
import React from "react";
import closed from "../../public/images/ico/ico-modal-close.svg";
import axios from "axios";
import { getCookie } from "../util/cookie";

const DeleteMgModal = ({ setDeleteModal, luckMangoId }: any) => {
  const DeleteLuckMango = async () => {
    try {
      await axios({
        method: "DELETE",
        url: `/api/luckMango/${luckMangoId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessJwtToken")}`,
        },
      });
      location.reload();
    } catch (error) {}
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 bg-black/20">
      <div className="absolute top-[50%] left-[50%] bg-white border rounded-xl -translate-x-2/4 -translate-y-2/4 p-2 box-border z-[9999] w-[300px]">
        <button
          className="mg-modal-close"
          onClick={() => setDeleteModal(false)}
          aria-label="모달 닫기"
        ></button>
        <div>
          <main className="flex flex-col gap-1 text-center">
            <div className="mt-5 font-bold text-mono-800">
              지금까지 받은 덕담도 모두 삭제됩니다.
            </div>
            <div className="whitespace-pre-line text-mono-500">
              {`삭제된 새해복망고는 복구할 수 없습니다!`}
            </div>
            <div className=" text-mono-400">그래도 삭제하시겠어요?</div>
            <footer className="flex justify-center gap-5 p-3">
              <button
                className="mg-negative-button-round"
                onClick={() => setDeleteModal(false)}
              >
                아니오
              </button>
              <button
                className="rounded-full mg-primary-button"
                onClick={() => DeleteLuckMango()}
              >
                삭제할게요
              </button>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DeleteMgModal;
