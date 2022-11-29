import Link from "next/link";
import { removeCookies } from "./util/cookie";
import { notifySuccess } from "../components/util/Toast";
import { userState } from "../recoil/user";
import { useRecoilState } from "recoil";
import { memberIdState } from "../recoil/memberId";

const Sidebar = ({ toggleHandler, toggleState, setIsSidebarOpen }: any) => {
  //로그인 영역
  const [user, setUser] = useRecoilState(userState);
  const [memberId, setMemberId] = useRecoilState(memberIdState);
  console.log("유저정보 확인 콘솔", user, memberId);
  const handleLogout = () => {
    removeCookies("accessJwtToken");
    setUser(false);
    setMemberId(0);
    setIsSidebarOpen(false);
    notifySuccess({
      message: "로그아웃 되었습니다!!",
      icon: "😎",
    });
  };

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
            {user ? (
              <div
                className="cursor-pointer hover:font-medium hover:text-primary-normal"
                onClick={handleLogout}
              >
                로그아웃
              </div>
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
            {user ? (
              <Link
                href={`/mypage/${memberId}`}
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
