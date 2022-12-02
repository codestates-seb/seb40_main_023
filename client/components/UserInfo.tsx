import axios from "axios";
import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import previous from "../public/images/ico/ico-mypage-previous.svg";
import { memberIdState } from "../recoil/memberId";
import { getCookie } from "./util/cookie";

const UserModify = ({
  handle,
  userName,
  modal,
  userImg,
  setUserImg,
}: any): React.ReactElement => {
  //전역상태
  const [memberId, setMemberId] = useRecoilState(memberIdState);
  const userId = memberId.memberId;

  //프로필 사진 영역
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [bgImg, setBgImg] = useState("");
  const [bgUrl, setBgUrl] = useState("");

  //폼 영역
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<string>("");
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);

  const uploadProfile = (e: React.ChangeEvent<HTMLInputElement | null>) => {
    if (e.target.files?.length) {
      setBgImg(URL.createObjectURL(e.target.files[0]));
      setBgUrl(URL.createObjectURL(e.target.files[0]));
    }
  };
  console.log(bgImg);
  //정보수정 보내는 함수
  const passwordChange = async () => {
    try {
      await axios({
        method: "patch",
        url: `/api/member/${userId}`,
        data: { password: password },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessJwtToken")}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImageButtonClick = () => {
    inputRef.current?.click();
  };

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      const passwordCurrent = e.target.value;
      setPassword(passwordCurrent);

      if (!passwordRegex.test(passwordCurrent)) {
        setPasswordMessage(
          "영문, 숫자, 특수기호를 포함하여 8자 이상 입력해주세요!",
        );
        setIsPassword(false);
      } else {
        setPasswordMessage("사용 가능한 비밀번호에요 :)");
        setIsPassword(true);
      }
    },
    [],
  );

  const onChangePasswordConfirm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordConfirmCurrent = e.target.value;
      setPasswordConfirm(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent && isPassword) {
        setPasswordConfirmMessage("비밀번호를 똑같이 입력했어요 :)");
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage("비밀번호가 일치하지 않아요!!");
        setIsPasswordConfirm(false);
      }
    },
    [password],
  );

  return (
    <div className="mg-layout min-w-[400px]">
      <div className="flex flex-row w-full pt-4 text-xl text-left">
        <Image
          src={previous}
          alt="뒤로가기 버튼"
          className="cursor-pointer"
          onClick={() => handle(false)}
        />
        <span className="flex items-center justify-center">회원정보 수정</span>
      </div>
      <div className="pt-10">
        {!modal && (
          <div className="relative flex items-center justify-center rounded-full cursor-pointer w-36 h-36 bg-primary-400 group">
            <div>
              <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={uploadProfile}
                className="hidden"
              />
              <div
                style={
                  bgUrl
                    ? { backgroundImage: `url(${bgUrl})` }
                    : { backgroundImage: `url(${bgImg})` }
                }
                className={
                  bgImg || bgUrl
                    ? `w-36 h-36 relative justify-center mg-border-2 mg-flex bg-center bg-cover rounded-full`
                    : "bg-[url(/images/ico/ico-profile.svg)] w-36 h-36 relative justify-center mg-border-2 mg-flex bg-center rounded-full bg-cover"
                }
              ></div>
              <div className="flex justify-center mg-mypage-overlay">
                <button
                  className="bg-[url(/images/ico/ico-mypage-edit.svg)] mg-mypage-button"
                  onClick={uploadImageButtonClick}
                ></button>
              </div>
            </div>
          </div>
        )}
      </div>
      <form className="w-[350px]" onSubmit={passwordChange}>
        <div>
          <div className="pt-5">
            <label htmlFor="" className="mg-default-label">
              아이디
            </label>
            <input
              disabled
              type="text"
              placeholder={`${userName}`}
              className="w-full mg-default-input"
            />
          </div>
          <div className="pt-4">
            <label htmlFor="password" className="text-left mg-default-label">
              비밀번호
            </label>
            <div className="flex flex-col">
              <input
                id="password"
                type="passowrd"
                placeholder="영문, 숫자, 특수기호를 포함하여 8자 이상"
                onChange={onChangePassword}
                className={`mg-default-input ${
                  isPassword
                    ? "border-success-normal focus:outline-none"
                    : password.length === 0
                    ? "null"
                    : "border-danger-normal focus:outline-none"
                } 
        }`}
              />
              {password.length > 0 && (
                <span
                  className={`text-left text-sm pl-2 pt-1 ${
                    isPassword ? "mg-vaild-success" : "mg-vaild-error"
                  }`}
                >
                  {passwordMessage}
                </span>
              )}
            </div>
          </div>
          <div className="mt-5">
            <label
              htmlFor="passwordconfirm"
              className="text-left mg-default-label "
            >
              비밀번호 확인
            </label>
            <div className="flex flex-col">
              <input
                id="passwordconfirm"
                type="text"
                placeholder="비밀번호 확인"
                onChange={onChangePasswordConfirm}
                className={`mg-default-input ${
                  isPasswordConfirm
                    ? "border-success-normal focus:outline-none"
                    : passwordConfirm.length === 0
                    ? "null"
                    : "border-danger-normal focus:outline-none"
                } 
                  }`}
              />
              {passwordConfirm.length > 0 && (
                <span
                  className={`text-left text-sm pl-2 pt-1 ${
                    isPasswordConfirm ? "mg-vaild-success" : "mg-vaild-error"
                  }`}
                >
                  {passwordConfirmMessage}
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          className={`mt-12 w-full ${
            !(isPassword && isPasswordConfirm)
              ? "px-12 py-3 text-white rounded cursor-not-allowed bg-negative-normal"
              : "mg-primary-button"
          }`}
          disabled={!(isPassword && isPasswordConfirm)}
        >
          수정 완료
        </button>
      </form>
    </div>
  );
};

export default UserModify;
