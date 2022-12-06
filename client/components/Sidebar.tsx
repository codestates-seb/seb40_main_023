import Link from "next/link";
import { removeCookies } from "./util/cookie";
import { userState } from "../recoil/user";
import { useRecoilState } from "recoil";
import { memberIdState } from "../recoil/memberId";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Sidebar = ({ toggleHandler, toggleState, setIsSidebarOpen }: any) => {
  const [user, setUser] = useRecoilState(userState);
  const [memberId, setMemberId] = useRecoilState(memberIdState);
  const [userId, setUserId] = useState<Number>(0);
  const [login, setLogin] = useState<boolean>(false);
  const router = useRouter();

  const getUserId = () => {
    setUserId(memberId.memberId);
    setLogin(user.login);
  };

  const handleLogout = () => {
    removeCookies("accessJwtToken");
    setUser({ login: false });
    setMemberId({ memberId: 0 });
    setIsSidebarOpen(false);
    setLogin(false);
    router.push("/");
  };

  useEffect(() => {
    getUserId();
  }, []);

  return (
    <>
      <div
        className={toggleState ? "mg-sidebar-dim" : "hidden"}
        onClick={toggleHandler}
      ></div>
      <div
        className={
          toggleState
            ? "mg-sidebar mg-sidebar-show"
            : "mg-sidebar mg-sidebar-hide"
        }
      >
        <ul>
          <li className="p-2 mb-1">
            {login ? (
              <Link
                href="/"
                className="cursor-pointer hover:font-medium hover:text-primary-normal"
                onClick={handleLogout}
              >
                로그아웃
              </Link>
            ) : (
              <Link
                href="/login"
                className="hover:font-medium hover:text-primary-normal"
              >
                로그인
              </Link>
            )}
          </li>
          <li className="p-2 mb-1">
            {login ? (
              <Link
                href={`/mypage/${userId}`}
                className="hover:font-medium hover:text-primary-normal"
              >
                마이페이지
              </Link>
            ) : (
              <Link
                href="/login"
                className="hover:font-medium hover:text-primary-normal"
              >
                마이페이지
              </Link>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
