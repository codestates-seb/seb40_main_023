import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Profile from "../public/dummy/mypage-profile.png";
import previous from "../public/images/ico/ico-mypage-previous.svg";
import { selectModalState, setModalState } from "../store/modalSlice";

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

  //폼 영역
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<string>("");
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);

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
        {!modalState && (
          <div className="relative flex items-center justify-center rounded-full cursor-pointer w-36 h-36 bg-primary-400 group">
            <div>
              <Image src={Profile} alt="프로필" />
            </div>
            <div className="flex justify-center mg-mypage-overlay">
              <button className="bg-[url(/images/ico/ico-mypage-edit.svg)] mg-mypage-button"></button>
            </div>
          </div>
        )}
      </div>
      <form className="w-[350px]">
        <div className="pt-5">
          <label htmlFor="" className="mg-default-label">
            아이디
          </label>
          <input
            disabled
            type="text"
            placeholder="유저 아이디"
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
              type="text"
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
                className={`text-left text-sm ${
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
                className={`text-left text-sm ${
                  isPasswordConfirm ? "mg-vaild-success" : "mg-vaild-error"
                }`}
              >
                {passwordConfirmMessage}
              </span>
            )}
          </div>
        </div>
      </form>
      <button
        className={`mt-12 ${
          !(isPassword && isPasswordConfirm)
            ? "px-12 py-3 text-white rounded cursor-not-allowed bg-negative-normal"
            : "mg-primary-button"
        }`}
        disabled={!(isPassword && isPasswordConfirm)}
      >
        수정 완료
      </button>
    </div>
  );
};

export default UserModify;
