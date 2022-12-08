import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Toast } from "../components/util/Toast";

const PwFind = () => {
  const onSubmit2 = () => {
    console.log("a");
  };
  const onChangeEmail = () => {
    console.log("b");
  };
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
              <p className="text-base text-center text-medium">
                이메일을 입력하시면 임시번호{" "}
                <span className="text-primary-normal">test1111!</span>으로
                발급됩니다!
              </p>
            </div>
            <form onSubmit={onSubmit2}>
              <div className="mt-10">
                <label htmlFor="email" className="text-left mg-default-label">
                  이메일
                </label>
                <input
                  id="email"
                  type="text"
                  placeholder="이메일을 입력해 주세요"
                  className="w-full mg-default-input"
                  onChange={onChangeEmail}
                />
              </div>
              <button className="mg-primary-button mt-8 w-[320px]">
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
