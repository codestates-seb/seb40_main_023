import axios from "axios";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import closed from "../../public/images/ico/ico-modal-close.svg";
import { memberIdState } from "../../recoil/memberId";
import { userState } from "../../recoil/user";
import { getCookie, removeCookies } from "../util/cookie";
import { useRouter } from "next/router";
import { notifySuccess } from "../util/Toast";

//마이페이지용 모달로 사용하겠습니다.
const DefaultModal = ({ setModal }: any) => {
  const [memberId, setMemberId] = useRecoilState(memberIdState);
  const userId = memberId.memberId;
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  const pageChange = () => {
    setTimeout(() => router.push("/"), 2000);
  };
  const DeleteUser = async () => {
    try {
      await axios({
        method: "DELETE",
        url: `/api/member/${userId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessJwtToken")}`,
        },
      });
      removeCookies("accessJwtToken");
      setUser({ login: false });
      setMemberId({ memberId: 0 });
      notifySuccess({
        message: "성공적으로 탈퇴되었습니다. 다음에 또 봐요!!",
        icon: "😭",
      });
      pageChange();
    } catch (error) {}
  };

  return (
    <div className="flex items-center justify-center mg-modal-container">
      <div className="mg-modal-confirm">
        <button
          className="mg-modal-close"
          onClick={() => setModal(false)}
          aria-label="모달 닫기"
        ></button>
        <div className="text-center">
          <div className="mb-2 font-bold text-mono-800">{`모든 새해복망고와 덕담이 삭제됩니다.`}</div>
          <div className="mb-2 font-bold whitespace-pre-line text-danger-normal">
            {`링크를 전달받은 친구들이 더 이상 \n 새해복망고 페이지를 볼 수 없습니다.`}
          </div>
          <div className="mb-4 text-mono-600">그래도 탈퇴하시겠어요?</div>
          <button
            className="mx-2 mg-negative-button-round"
            onClick={() => setModal(false)}
          >
            아니오
          </button>
          <button
            className="mx-2 rounded-full mg-primary-button"
            onClick={() => DeleteUser()}
          >
            탈퇴할게요
          </button>
        </div>
      </div>
    </div>
  );
};

export default DefaultModal;
