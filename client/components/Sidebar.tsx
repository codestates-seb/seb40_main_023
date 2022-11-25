import { useSelector, useDispatch } from "react-redux";
import { selectSidebarState, setSidebarState } from "../store/sidebarSlice";
import Link from "next/link";

const Sidebar = ({ toggleHandler, toggleState }: any) => {
  const dispatch = useDispatch();
  // const sidebarState = useSelector(selectSidebarState);

  const hideSidebar = () => {
    dispatch(setSidebarState(false));
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
            <Link
              href="/login"
              className="hover:font-medium hover:text-primary-normal"
            >
              로그인
            </Link>
          </li>
          <li className="p-2 mb-1">
            <Link
              href="/mypage"
              className="hover:font-medium hover:text-primary-normal"
            >
              마이페이지
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
