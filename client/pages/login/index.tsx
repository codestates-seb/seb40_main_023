import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { getCookie, setCookie } from "../../components/util/cookie";
import { notifyError, notifySuccess, Toast } from "../../components/util/Toast";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user";
import { memberIdState } from "../../recoil/memberId";

const Login = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [user, setUser] = useRecoilState(userState);
  const [memberId, setMemberId] = useRecoilState(memberIdState);
  const router = useRouter();

  const pageChange = () => {
    setTimeout(() => router.push("/"), 1500);
  };

  const onSubmit2 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "api/auth/login",
          {
            username: email,
            password: password,
          },
          {
            withCredentials: true,
          },
        )
        .then(res => {
          const expires = new Date();
          expires.setMinutes(expires.getMinutes() + 60);
          const jwtToken = res.headers.authorization;
          if (jwtToken) {
            setCookie("accessJwtToken", jwtToken, {
              path: "/",
              expires,
            });
          }
          axios({
            method: "get",
            url: "/api/member?page=1&size=100",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getCookie("accessJwtToken")}`,
            },
          }).then(res =>
            res.data.data.map((el: any) =>
              el.email === email
                ? setMemberId({ memberId: el.memberId })
                : null,
            ),
          );
          setUser({ login: true });
          notifySuccess({
            message: "로그인에 성공했어요. \n자동으로 화면 이동 됩니다!",
            icon: "😎",
          });
          pageChange();
        });
    } catch (error) {
      notifyError({
        message: "로그인에 실패했어요. \n정보를 다시 확인해주세요!",
        icon: "😭",
      });
    }
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center w-full h-full min-h-screen">
        <div className="flex flex-col max-w-[360px] justify-center text-center mb-10">
          <div className="mt-[100px] mb-[10px] text-4xl">로그인</div>
          <div className="px-[20px]">
            <div className="flex flex-col items-center">
              <p className="mb-4 w-[165px] h-[209px] animate-[welcome_2.5s_steps(7)_infinite] bg-[url(/images/char/sprite.png)]"></p>
              <p className="mb-2 text-xl text-center text-medium">
                다시 만나게 되어 반가워요!
              </p>
              <p className="text-base text-center text-medium">
                따뜻한 덕담을 주고받는{" "}
                <span className="text-primary-normal">새해 복망고</span>입니다
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
              <div className="mt-3">
                <label
                  htmlFor="password"
                  className="text-left mg-default-label"
                >
                  비밀번호
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="비밀번호를 입력해 주세요"
                  className="w-full mg-default-input"
                  onChange={onChangePassword}
                />
              </div>
              <button className="mg-primary-button mt-8 w-[320px]">
                로그인
              </button>
            </form>
            <Link href="signup">
              <button className="mt-8 font-medium underline cursor-pointer text-primary-normal">
                가입하기
              </button>
            </Link>
          </div>
        </div>
        <Toast />
      </div>
      <Footer />
    </div>
  );
};

export default Login;
