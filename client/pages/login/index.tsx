import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Sidebar from "../../components/sidebar";

const Login = () => {
  return (
    <div>
      <Header />
      <aside>
        <Sidebar />
      </aside>
      <div className="flex flex-col items-center w-full h-full min-h-screen">
        <div className="flex flex-col max-w-[360px] justify-center text-center mb-10">
          <div className="mt-[100px] mb-[20px] text-4xl">로그인</div>
          <div className="px-[20px]">
            <button className="w-[230px] py-3 mt-5 text-black rounded bg-social-kakaoNormal hover:bg-social-kakaoHover">
              카카오톡 회원가입
            </button>
            <button className="w-[230px] py-3 mt-3 text-white rounded bg-social-githubNormal hover:bg-social-githubHover">
              깃허브 회원가입
            </button>
            <button className="w-[230px] py-3 mt-3 text-white rounded bg-social-naverNormal hover:bg-social-naverHover">
              네이버 회원가입
            </button>
            <div className="mt-10">
              <label htmlFor="" className="text-left mg-default-label">
                아이디
              </label>
              <input
                type="text"
                placeholder="아이디를 입력해 주세요"
                className="w-full mg-default-input"
              />
            </div>
            <div className="mt-3">
              <label htmlFor="" className="text-left mg-default-label">
                비밀번호
              </label>
              <input
                type="text"
                placeholder="비밀번호를 입력해 주세요"
                className="w-full mg-default-input"
              />
            </div>
            <button className="mg-primary-button mt-8 w-[320px]">로그인</button>
            <Link href="signup">
              <button className="mt-8 font-medium underline cursor-pointer text-primary-normal">
                가입하기
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
