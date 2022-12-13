import React from "react";
import { useRecoilState } from "recoil";
import { memberIdState } from "../../recoil/memberId";
import { userState } from "../../recoil/user";
import { getCookie, removeCookies } from "../util/cookie";
import { useRouter } from "next/router";
import { notifySuccess } from "../util/Toast";
import { DeleteUserInfo } from "../../fetch/deleteUser";

const DefaultModal = ({
  setModal,
}: {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [user, setUser] = useRecoilState(userState);
  const [memberId, setMemberId] = useRecoilState(memberIdState);
  const userId = memberId.memberId;
  const router = useRouter();

  const pageChange = () => {
    setTimeout(() => router.push("/"), 2000);
  };

  const DeleteUser = async () => {
    let res = await DeleteUserInfo(`/api/member/${userId}`, {
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
