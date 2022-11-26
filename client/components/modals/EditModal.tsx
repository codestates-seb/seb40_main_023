import React from "react";
import BokPreview from "../BokPreview";
import Link from "next/link";
import { createMg } from "../../api/create";

const EditModal = ({ setModal, greeting, title, bgUrl }: any) => {
  const createLuckMg = async () => {
    const res = await createMg("/api/luckMango", {
      memberId: 1,
      title: title,
      bgImage: "aaa",
      bgVideo: "bbb",
    });
    console.log(res);
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
            <div className="w-[400px]">{title}</div>
            <BokPreview greeting={greeting} bgUrl={bgUrl} />
          </main>
          <div className="flex justify-around p-2 mt-1">
            <button className="mg-negative-button-round" onClick={handleModal}>
              취소
            </button>
            <Link
              href="/create/complete"
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
