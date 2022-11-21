import { useSelector } from "react-redux";
import { selectSidebarState, setSidebarState } from "../store/sidebarSlice";
import Link from "next/link";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  const sidebarState = useSelector(selectSidebarState);

  return (
    <div>
      <div>
        <div
          className={
            sidebarState
              ? "mg-sidebar mg-sidebar-show"
              : "mg-sidebar mg-sidebar-hide"
          }
        >
          <ul>
            <li
              className="p-2 mb-1"
              onClick={() => {
                sidebarState
                  ? dispatch(setSidebarState(false))
                  : dispatch(setSidebarState(true));
              }}
            >
              <Link
                href="/login"
                className="hover:font-medium hover:text-primary-normal"
              >
                로그인/로그아웃
              </Link>
            </li>
            <li
              className="p-2 mb-1"
              onClick={() => {
                sidebarState
                  ? dispatch(setSidebarState(false))
                  : dispatch(setSidebarState(true));
              }}
            >
              <Link
                href="/mypage"
                className="hover:font-medium hover:text-primary-normal"
              >
                마이페이지
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
