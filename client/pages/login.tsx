import Link from "next/link";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

const login = () => {
  return (
    <>
      <Header />
      <aside>
        <Sidebar />
      </aside>
      <div className="mg-layout">
        <h1 className="flex justify-center mt-20 text-4xl w-[500px]">로그인</h1>
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
            className="mg-default-input w-[360px]"
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
        <button className="mg-primary-button mt-5 w-[320px]">로그인</button>
        <Link href="signup">
          <button className="mt-5 font-medium underline cursor-pointer text-primary-normal">
            가입하기
          </button>
        </Link>
      </div>
      <footer className="absolute bottom-0 flex w-full">
        <Footer />
      </footer>
    </>
  );
};

export default login;
