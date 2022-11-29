import React from "react";
import BokPreview from "../BokPreview";
import Link from "next/link";
import { createMg } from "../../fetch/create";
import { editMg } from "../../fetch/edit";
import { getCookie } from "../util/cookie";

const EditModal = ({
  setModal,
  greeting,
  title,
  bgUrl,
  reveal,
  editMode,
  luckId,
}: any) => {
  const createLuckMg = async () => {
    if (editMode) {
      const res = await editMg(
        `/api/luckMango/${luckId}`,
        {
          title: title,
          mangoBody: greeting,
          bgImage: "bg.jpg",
          bgVideo: "bgVideo.mp",
          luckMangoId: luckId,
          reveal: reveal,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("accessJwtToken")}`,
          },
        },
      );
    } else {
      const res = await createMg(
        "/api/luckMango",
        {
          memberId: 2,
          title: title,
          mangoBody: greeting,
          bgImage: "bg.jpg",
          bgVideo: "bgVideo.mp",
          reveal: reveal,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("accessJwtToken")}`,
          },
        },
      );
    }
  };

  return (
    <div className="mg-modal-container">
      <div className="overflow-y-auto mg-modal-panel">
        <button
          className="mg-modal-close"
          onClick={() => setModal(false)}
          aria-label="모달 닫기"
        ></button>
        <div className="px-2">
          <div className="justify-center mb-4 text-xl mg-modal-title">
            작성하신 내용을 한 번 더 확인해 주세요!
          </div>
        </div>
        <div className="px-2">
          <div className="mg-flex-center">
            <div className="mg-modal-title">
              <p className="mr-3">
                제목 <span className="text-mono-textDisabled">|</span>{" "}
              </p>
              <p className="font-normal">{title}</p>
            </div>
          </div>
          <div className="mb-4 mg-info-normal">
            <i></i>제목은 친구들에게 노출되지 않아요
          </div>
        </div>
        <div>
          <BokPreview greeting={greeting} bgUrl={bgUrl} />
          <div className="flex justify-center mt-5 mb-3">
            <button
              className="mx-2 mg-negative-button-round"
              onClick={() => setModal(false)}
            >
              취소
            </button>
            <Link
              href={editMode ? "/edit/complete" : "/create/complete"}
              className="mx-2 rounded-full mg-primary-button"
              onClick={createLuckMg}
            >
              복망고 만들기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
