import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Profile from "../public/dummy/mypage-profile.png";
import previous from "../public/images/ico/ico-mypage-previous.svg";
import { selectModalState, setModalState } from "../store/modalSlice";
import Edit from "../public/images/ico/ico-card-edit.svg";

type formProps = {
  onSubmit: (form: { name: string; password: string }) => void;
};

const UserModify = ({ handle }: any): React.ReactElement => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const modalState = useSelector(selectModalState);
  const handleTextField = (e: any) => {
    setText(e.target.value);
  };

  return (
    <div className="mg-layout w-[500px]">
      <div className="flex flex-row w-full pt-4 text-left">
        <Image
          src={previous}
          alt=""
          className="cursor-pointer"
          onClick={() => handle(false)}
        />
        <span className="flex pt-1">회원정보 수정</span>
      </div>
      <div className="pt-10">
        {!modalState && (
          <div className="relative flex items-center justify-center rounded-full w-36 h-36 bg-primary-400">
            <Image src={Profile} alt="" />
            <button className="absolute w-11 h-11 top-[90px] left-[110px] mg-secondary-button-line bg-mono-700 hover:bg-mono-600">
              <Image src={Edit} alt="" className="ml-2" />
            </button>
          </div>
        )}
      </div>
      <div className="pt-5">
        <label htmlFor="" className="mg-default-label">
          이름
        </label>
        <input
          type="text"
          placeholder="아이디를 입력하세요"
          className="mg-default-input w-[360px]"
        />
      </div>
      <div className="pt-4">
        <label htmlFor="" className="mg-default-label">
          비밀번호
        </label>
        <input
          type="text"
          placeholder="비밀번호를 입력하세요"
          className="mg-default-input w-[360px]"
        />
      </div>
      <div className="pt-4">
        <label htmlFor="" className="mg-default-label">
          비밀번호 확인
        </label>
        <input
          type="text"
          placeholder="비밀번호를 한번 더 입력하세요"
          className="mg-default-input w-[360px]"
        />
      </div>
      <button className="mt-5 mg-primary-button">수정 완료</button>
    </div>
  );
};

export default UserModify;
