import axios from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { notifyError, notifySuccess, Toast } from "../components/util/Toast";

const PwFind = () => {
  const [email, setEmail] = useState<string>("");
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const router = useRouter();
  const pageChange = () => {
    setTimeout(() => router.push("/"), 1500);
  };

  const onSubmit2 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios({
      method: "patch",
      url: `/api/member/findPassword?mail=${email}&name=${id}`,
      data: {
        email: email,
        name: id,
      },
    })
      .then(el => {
        if (el) {
          notifySuccess({
            message: "test1111로 비밀번호가 바뀌었어요.",
            icon: "🥭",
          });
          setEmail("");
          setId("");
          pageChange();
        } else {
          console.error();
        }
      })
      .catch(function (error) {
        console.log(error);
        notifyError({
          message: "이메일이나 닉네임이 올바르지 않아요!",
          icon: "🥭",
        });
      });
  };

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

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
        setEmailMessage("✔");
        setIsEmail(true);
      }
    },
    [],
  );
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center w-full h-full min-h-screen">
        <div className="flex flex-col max-w-[360px] justify-center text-center mb-10">
          <div className="mt-[100px] mb-[10px] text-4xl">비밀번호 찾기</div>
          <div className="px-[20px]">
            <div className="flex flex-col items-center">
              <p className="mb-4 w-[165px] h-[209px] animate-[welcome_2.5s_steps(7)_infinite] bg-[url(/images/char/sprite.png)]"></p>
              <p className="mb-2 text-xl text-center text-medium">
                비밀번호 찾기를 도와드릴게요!
              </p>
              <p className="text-base text-center whitespace-pre-line text-medium">
                이메일과 닉네임을 정확하게 입력하시면 {"\n"} 임시번호
                <span className="text-primary-normal"> test1111!</span>으로
                발급됩니다!
              </p>
            </div>
            <form onSubmit={onSubmit2}>
              <div className="mt-10">
                <label htmlFor="email" className="text-left mg-default-label">
                  이메일
                  {email.length > 0 && (
                    <span
                      className={`text-left text-sm pl-2 w-full ${
                        isEmail ? "mg-vaild-error" : "mg-vaild-error"
                      }`}
                    >
                      {emailMessage}
                    </span>
                  )}
                </label>
                <input
                  id="email"
                  type="text"
                  placeholder="이메일을 입력해 주세요"
                  className="w-full mg-default-input"
                  onChange={onChangeEmail}
                />
              </div>
              <div className="mt-2">
                <label htmlFor="name" className="text-left mg-default-label">
                  닉네임
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="닉네임을 입력해 주세요"
                  className="w-full mg-default-input"
                  onChange={onChangeId}
                />
              </div>
              <button
                className={`mt-8 w-[320px] ${
                  !isEmail
                    ? "px-12 py-3 text-white rounded cursor-not-allowed bg-negative-normal"
                    : "mg-primary-button"
                }`}
              >
                비밀번호 찾기!
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

export default PwFind;
