import axios from "axios";
import jwt_decode from "jwt-decode";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { getCookie, setCookie } from "../../components/util/cookie";
import { useSelector, useDispatch } from "react-redux";
import { selectLoginState, setLoginState } from "../../store/loginSlice";
import { useRouter } from "next/router";
import { Toast, notifySuccess, notifyError } from "../../components/util/Toast";
const Login = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const dispatch = useDispatch();
  const loginState = useSelector(selectLoginState);
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<String>("");
  // const onSubmit2 = async (req: NextApiRequest, res: NextApiResponse) => {
  //   const loginData = req.body;
  //   const response = await axios.post("api/auth/login", loginData);
  //   const { user } = response.data;
  //   const token = response.headers["set-cookie"];
  //   res.setHeader("Set-Cookie", `token=${token} path=/;`);
  //   res.status(200).json(user);
  // };

  // const onSubmit = () => {
  //   axios
  //     .post("api/auth/login", {
  //       username: email,
  //       password: password,
  //     })
  //     .then(res => {
  //       localStorage.setItem("Token", res.data.token);
  //       localStorage.setItem("UserID", res.data.id);
  //     });
  // };
  const pageChange = () => {
    setTimeout(() => router.push("/"), 2000);
  };

  const onSubmit2 = async (e: any) => {
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
            // const decodedUserInfo = jwt_decode(jwtToken);
            // localStorage.setItem("userInfo", JSON.stringify(decodedUserInfo));
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
                ? localStorage.setItem("memberId", el.memberId)
                : null,
            ),
          );
          dispatch(setLoginState(true));
          notifySuccess({
            message: "로그인에 성공했어요. 자동으로 화면 이동 됩니다!",
            icon: "😎",
          });
          pageChange();
        });
    } catch (error) {
      notifyError({
        message: "로그인에 실패했어요. 정보를 다시 확인해주세요!",
        icon: "😭",
      });
    }
  };

  const onChangeEmail = (e: any) => {
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);
  };

  const onChangePassword = (e: any) => {
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);
  };

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
                  type="text"
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
