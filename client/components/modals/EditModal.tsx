import React, { useEffect } from "react";
import { useRouter } from "next/router";
import BokPreview from "../BokPreview";
import { createMg } from "../../fetch/create";
import { notifyError } from "../util/Toast";
import { editMg } from "../../fetch/edit";
import { getCookie } from "../util/cookie";
import { useRecoilValue, useRecoilState } from "recoil";
import { memberIdState } from "../../recoil/memberId";
import { luckMgIdState } from "../../recoil/luckMgId";
import { memberNameState } from "../../recoil/memberName";
import { luckImgState } from "../../recoil/luckImg";

const EditModal = ({
  setModal,
  greeting,
  title,
  bgUrl,
  reveal,
  editMode,
  luckId,
}: any) => {
  const memberId = useRecoilValue(memberIdState).memberId;
  const [luckMgId, setLuckMgId] = useRecoilState(luckMgIdState);
  const [userName, setUserName] = useRecoilState(memberNameState);
  const [luckImg, setLuckImg] = useRecoilState(luckImgState);
  const router = useRouter();

  useEffect(() => {
    setLuckImg(bgUrl);
  }, []);

  const checkIfResOK = (res: any, mode: string) => {
    if (res.statusText === "Unauthorized") {
      notifyError({ message: "로그인이 필요한 서비스입니다.", icon: "🥹" });
    } else if (res.status >= 400) {
      notifyError({
        message: "통신이 원활하지 않습니다. \n 잠시 후에 시도해 주세요.",
        icon: "🙏",
      });
    } else {
      if (mode === "create") setLuckMgId(res?.data?.luckMangoId);
      setTimeout(() => router.push(`/${mode}/complete`), 1000);
    }
  };

  const createLuckMg = async () => {
    if (editMode) {
      const res = await editMg(
        `/api/luckMango/${luckId}`,
        {
          title: title,
          mangoBody: greeting,
          bgImage: bgUrl,
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
      setUserName(res.data.member.name);
      checkIfResOK(res, "edit");
    } else {
      const res = await createMg(
        "/api/luckMango",
        {
          memberId: memberId,
          title: title,
          mangoBody: greeting,
          bgImage: bgUrl,
          reveal: reveal,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("accessJwtToken")}`,
          },
        },
      );
      setUserName(res.data.member.name);
      checkIfResOK(res, "create");
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
        <div className="max-w-[440px] mobile:max-w-none w-full">
          <div className="px-2">
            <div className="justify-center mb-6 text-xl mg-modal-title">
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
        </div>
        <div>
          <BokPreview greeting={greeting} edit={editMode} bgUrl={bgUrl} />
          <div className="flex justify-center mt-5 mb-3">
            <button
              className="mx-2 mg-negative-button-round"
              onClick={() => setModal(false)}
            >
              취소
            </button>
            <button
              className="mx-2 rounded-full mg-primary-button"
              onClick={createLuckMg}
            >
              복망고 만들기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
