import axios from "axios";
import React, { useCallback, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const Signup = () => {
  //이름, 비밀번호, 비밀번호 확인 상태
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  //오류메시지 상태
  const [idMessage, setIdMessage] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<string>("");
  //유효성 검사
  const [isId, setIsId] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);

  //폼 만들기

  //아이디
  const onChangeId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const idRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{4,25}$/;
    const idCurrent = e.target.value;
    setId(idCurrent);

    if (!idRegex.test(idCurrent)) {
      setIdMessage("영문, 숫자를 포함하여 4글자 이상으로 입력해주세요!");
      setIsId(false);
    } else {
      setIdMessage("예쁜 아이디네요.");
      setIsId(true);
    }
  }, []);

  //비밀번호
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

  //비밀번호 확인
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
    <div>
      <Header />
      <aside>
        <Sidebar />
      </aside>
      <div className="flex flex-col items-center w-full h-full min-h-screen">
        <div className="flex flex-col max-w-[360px] justify-center text-center mb-10">
          <div className="mt-[100px] text-4xl whitespace-pre-line">
            {"10초 안에 가입하고 \n 복망고 만들러 가기!"}
          </div>
          <div className="mt-4 text-lg">
            1분 안에 나만의 복망고 페이지를 생성해 보세요!
          </div>
          <div className="px-[20px]">
            <button className="w-[230px] py-3 mt-6 text-black rounded bg-social-kakaoNormal hover:bg-social-kakaoHover">
              카카오톡 회원가입
            </button>
            <button className="w-[230px] py-3 mt-4 text-white rounded bg-social-githubNormal hover:bg-social-githubHover">
              깃허브 회원가입
            </button>
            <button className="w-[230px] py-3 mt-4 text-white rounded bg-social-naverNormal hover:bg-social-naverHover">
              네이버 회원가입
            </button>
            <form>
              <div className="mt-11">
                <label htmlFor="id" className="text-left mg-default-label">
                  아이디
                </label>
                <div className="flex flex-col ">
                  <input
                    id="id"
                    type="text"
                    onChange={onChangeId}
                    placeholder="영문, 숫자를 포함하여 4글자 이상"
                    className={`mg-default-input w-full ${
                      isId
                        ? "border-success-normal focus:outline-none"
                        : id.length === 0
                        ? "null"
                        : "border-danger-normal focus:outline-none"
                    } 
                }`}
                  />
                  {id.length > 0 && (
                    <span
                      className={`text-left text-sm ${
                        isId ? "mg-vaild-success" : "mg-vaild-error"
                      }`}
                    >
                      {idMessage}
                    </span>
                  )}
                </div>
                <div className="mt-5">
                  <label
                    htmlFor="password"
                    className="text-left mg-default-label"
                  >
                    비밀번호
                  </label>
                  <div className="flex flex-col">
                    <input
                      id="password"
                      type="text"
                      placeholder="영문, 숫자, 특수기호를 포함하여 8자 이상"
                      onChange={onChangePassword}
                      className={`mg-default-input w-full ${
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
                      className={`mg-default-input w-full ${
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
                          isPasswordConfirm
                            ? "mg-vaild-success"
                            : "mg-vaild-error"
                        }`}
                      >
                        {passwordConfirmMessage}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </form>
            <button
              className={`mt-10 w-full ${
                !(isId && isPassword && isPasswordConfirm)
                  ? "px-12 py-3 text-white rounded cursor-not-allowed bg-negative-normal"
                  : "mg-primary-button"
              }`}
              disabled={!(isId && isPassword && isPasswordConfirm)}
            >
              가입하기
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
