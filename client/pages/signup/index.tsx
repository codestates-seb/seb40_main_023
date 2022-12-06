import axios from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Toast, notifyError } from "../../components/util/Toast";

const Signup = () => {
  //이름, 이메일, 비밀번호, 비밀번호 확인 상태
  const [id, setId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  //오류메시지 상태
  const [idMessage, setIdMessage] = useState<string>("");
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<string>("");
  //유효성 검사
  const [isId, setIsId] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);
  const router = useRouter();

  //폼 만들기
  const signupSubmit = async (e: any) => {
    e.preventDefault();
    await axios({
      method: "post",
      url: `/api/member`,
      data: {
        name: id,
        email: email,
        password: password,
      },
    })
      .then(res => {
        router.push("/login");
      })
      .catch(function (error) {
        if (error.response.data.message === "Member exists") {
          notifyError({ message: "이메일이 중복되었습니다.", icon: "🥭" });
          setEmail("");
          setIsEmail(false);
        }
      });
  };

  //아이디
  const onChangeId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const idRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{4,10}$/;
    const idCurrent = e.target.value;
    setId(idCurrent);

    if (!idRegex.test(idCurrent)) {
      setIdMessage("아이디를 다시 작성해주세요!");
      setIsId(false);
    } else {
      setIdMessage("올바른 형식의 아이디입니다.");
      setIsId(true);
    }
  }, []);

  //이메일
  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const emailCurrent = e.target.value;
      setEmail(emailCurrent);

      if (!emailRegex.test(emailCurrent)) {
        setEmailMessage("이메일 형식이 틀렸어요! 다시 확인해주세요~");
        setIsEmail(false);
      } else {
        setEmailMessage("올바른 이메일 형식이에요 :)");
        setIsEmail(true);
      }
    },
    [],
  );

  //비밀번호
  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      const passwordCurrent = e.target.value;
      setPassword(passwordCurrent);

      if (!passwordRegex.test(passwordCurrent)) {
        setPasswordMessage("비밀번호를 다시 작성해주세요!!");
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
      <div className="flex flex-col items-center w-full h-full min-h-screen">
        <div className="flex flex-col max-w-[400px] justify-center w-full mb-10 text-center">
          <div className="mt-[100px] text-4xl">
            10초 안에 가입하고
            <br />
            복망고 만들러 가기!
          </div>
          <div className="mt-4 text-lg">만나서 반갑습니다!</div>
          <div className="px-[20px]">
            <form onSubmit={signupSubmit}>
              <div className="mt-11">
                <div className="mt-11">
                  <label htmlFor="id" className="text-left mg-default-label">
                    닉네임
                  </label>
                  <div className="flex flex-col ">
                    <input
                      id="id"
                      type="text"
                      onChange={onChangeId}
                      placeholder="영문, 숫자를 포함하여 4글자 이상 10글자 이하"
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
                        className={`text-left text-sm pl-2 pt-1 ${
                          isId ? "mg-vaild-success" : "mg-vaild-error"
                        }`}
                      >
                        {idMessage}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-5">
                  <label htmlFor="email" className="text-left mg-default-label">
                    이메일
                  </label>
                  <div className="flex flex-col">
                    <input
                      id="email"
                      type="text"
                      value={email}
                      placeholder="이메일 형식에 맞게 입력해주세요"
                      onChange={onChangeEmail}
                      className={`mg-default-input w-full ${
                        isEmail
                          ? "border-success-normal focus:outline-none"
                          : email.length === 0
                          ? "null"
                          : "border-danger-normal focus:outline-none"
                      } 
                  }`}
                    />
                    {email.length > 0 && (
                      <span
                        className={`text-left text-sm pl-2 pt-1 w-full ${
                          isEmail ? "mg-vaild-success" : "mg-vaild-error"
                        }`}
                      >
                        {emailMessage}
                      </span>
                    )}
                  </div>
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
                      type="password"
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
                      type="password"
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
                        className={`text-left text-sm pl-2 pt-1 ${
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
              <button
                className={`mt-10 w-full ${
                  !(isId && isPassword && isPasswordConfirm && isEmail)
                    ? "px-12 py-3 text-white rounded cursor-not-allowed bg-negative-normal"
                    : "mg-primary-button"
                }`}
                disabled={!(isId && isPassword && isPasswordConfirm && isEmail)}
              >
                가입하기
              </button>
            </form>
          </div>
        </div>
        <Toast />
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
