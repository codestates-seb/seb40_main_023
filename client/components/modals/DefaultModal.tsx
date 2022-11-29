import axios from "axios";
import Image from "next/image";
import React, { useRef } from "react";
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
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  const pageChange = () => {
    setTimeout(() => router.push("/"), 2000);
  };
  const DeleteUser = async () => {
    try {
      await axios({
        method: "DELETE",
        url: `/api/member/${memberId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessJwtToken")}`,
        },
      });
      removeCookies("accessJwtToken");
      setUser(false);
      setMemberId(0);
      notifySuccess({
        message: "성공적으로 탈퇴되었습니다. 다음에 또 봐요!!",
        icon: "😭",
      });
      pageChange();
    } catch (error) {}
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 bg-mono-400">
      <div className="absolute top-[50%] left-[50%] bg-white border rounded-xl -translate-x-2/4 -translate-y-2/4 p-2 box-border z-999 w-[300px] h-[200px]">
        <header className="flex justify-end w-full hover:cursor-pointer">
          <Image
            src={closed}
            alt="closed button"
            onClick={() => setModal(false)}
          />
        </header>
        <div>
          <main className="flex flex-col gap-1 text-center">
            <div>지금까지 받은 덕담도 모두 삭제됩니다.</div>
            <div className="whitespace-pre-line text-mono-500">
              {`링크를 전달받은 친구들이 더 이상 \n 새해복망고 페이지를 볼 수 없습니다.`}
            </div>
            <div className=" text-mono-400">그래도 탈퇴하시겠어요?</div>
            <footer className="flex justify-center gap-5 p-3">
              <button
                className="mg-negative-button-round"
                onClick={() => setModal(false)}
              >
                아니오
              </button>
              <button
                className="rounded-full mg-primary-button"
                onClick={() => DeleteUser()}
              >
                탈퇴할게요
              </button>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DefaultModal;
