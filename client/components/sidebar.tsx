import { useSelector } from "react-redux";
import { selectSidebarState } from "../store/sidebarSlice";
import Link from "next/link";

const Sidebar = () => {
  const sidebarState = useSelector(selectSidebarState);

  return (
    <div
      className={
        sidebarState
          ? "mg-sidebar mg-sidebar-show"
          : "mg-sidebar mg-sidebar-hide"
      }
    >
      <ul>
        <li className="p-2 mb-1">
          <Link
            href="/mypage"
            className="hover:font-medium hover:text-primary-normal"
          >
            로그인/로그아웃
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
  );
};

export default Sidebar;
