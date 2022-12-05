import axios from "axios";
import React from "react";
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
    <div className="flex items-center justify-center mg-modal-container">
      <div className="mg-modal-confirm">
        <button
          className="mg-modal-close"
          onClick={() => setDeleteModal(false)}
          aria-label="모달 닫기"
        ></button>
        <div className="text-center">
          <div className="mb-2 font-bold text-mono-800">{`지금까지 받은 덕담도 모두 삭제됩니다.`}</div>
          <div className="mb-2 font-bold whitespace-pre-line text-danger-normal">
            {`삭제된 새해복망고는 복구할 수 없습니다!`}
          </div>
          <div className="mb-4 text-mono-600">그래도 삭제하시겠어요?</div>
          <button
            className="mx-2 mg-negative-button-round"
            onClick={() => setDeleteModal(false)}
          >
            아니오
          </button>
          <button
            className="mx-2 rounded-full mg-primary-button"
            onClick={() => DeleteLuckMango()}
          >
            삭제할게요
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMgModal;
