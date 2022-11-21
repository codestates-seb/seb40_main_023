import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

const signup = () => {
  //이름, 비밀번호, 비밀번호 확인 상태
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  //오류메시지 상태
  const [nameMessage, setNameMessage] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<string>("");
  //유효성 검사
  const [isName, setIsName] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);

  return (
    <>
      <Header />
      <aside>
        <Sidebar />
      </aside>
      <div className="mg-layout">
        <h1 className="flex justify-center mt-20 text-4xl w-[500px]">
          10초 안에 가입하고 <br />
          복망고 만들러 가기!
        </h1>
        <h2 className="mt-4">1분 안에 나만의 복망고 페이지를 생성해 보세요!</h2>
        <button className="w-[300px] px-20 py-3 mt-5 text-black rounded bg-social-kakaoNormal hover:bg-social-kakaoHover">
          카카오톡 회원가입
        </button>
        <button className="w-[300px] px-20 py-3 mt-3 text-white rounded bg-social-githubNormal hover:bg-social-githubHover">
          깃허브 회원가입
        </button>
        <button className="w-[300px] px-20 py-3 mt-3 text-white rounded bg-social-naverNormal hover:bg-social-naverHover">
          네이버 회원가입
        </button>
        <div className="mt-10">
          <label htmlFor="" className="mg-default-label">
            아이디
          </label>

          <input
            type="text"
            placeholder="4자 이상 입력해 주세요"
            className="mg-default-input w-[360px] focus:ring-2 focus:ring-primary-darker"
            input
            ring
            작업
            진행해야
            함
          />
        </div>
        <div className="mt-3">
          <label htmlFor="" className="mg-default-label">
            비밀번호
          </label>
          <input
            type="text"
            placeholder="영문, 숫자, 특수기호를 포함하여 8자 이상"
            className="mg-default-input w-[360px]"
          />
        </div>
        <div className="mt-3">
          <label htmlFor="" className="mg-default-label">
            비밀번호 확인
          </label>
          <input
            type="text"
            placeholder="비밀번호 확인"
            className="mg-default-input w-[360px]"
          />
        </div>
        <button className="mg-primary-button mt-9 w-[320px]">가입하기</button>
      </div>
      <footer className="absolute bottom-0 flex w-full">
        <Footer />
      </footer>
    </>
  );
};

export default signup;
