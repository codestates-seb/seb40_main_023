import { useSelector, useDispatch } from "react-redux";
import { selectLoginState, setLoginState } from "../store/loginSlice";
// import { selectSidebarState, setSidebarState } from "../store/mangoSlice";
import Link from "next/link";
import { removeCookies } from "./util/cookie";
import { notifySuccess } from "../components/util/Toast";

const Sidebar = ({
  toggleHandler,
  toggleState,
  setIsSidebarOpen,
  userId,
}: any) => {
  //사이드바 영역
  // const dispatch = useDispatch();
  // const sidebarState = useSelector(selectSidebarState);
  // const hideSidebar = () => {
  //   dispatch(setSidebarState(false));
  // };

  //로그인 영역
  const dispatch = useDispatch();
  const loginState = useSelector(selectLoginState);
  const handleLogout = () => {
    localStorage.removeItem("memberId");
    removeCookies("accessJwtToken");
    dispatch(setLoginState(false));
    setIsSidebarOpen(false);
    notifySuccess({
      message: "로그아웃 되었습니다!!",
      icon: "😎",
    });
  };
  //나중에 지워주세요
  console.log("사이드바 로그인 되어있나요?", loginState);
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
            {loginState ? (
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
            {loginState ? (
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
