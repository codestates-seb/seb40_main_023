import { useSelector, useDispatch } from "react-redux";
import { selectSidebarState, setSidebarState } from "../store/sidebarSlice";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const dispatch = useDispatch();
  const sidebarState = useSelector(selectSidebarState);

  return (
    <header className="border-b border-mono-borderLight bg-white z-50 fixed h-[58px] px-3 shadow-header flex items-center w-full justify-between z-2">
      <div className="ml-[40px] flex justify-center w-full">
        <Link href="/">
          <h1 className="mg-logo">새해복망고 로고</h1>
        </Link>
      </div>
      <button
        onClick={() =>
          sidebarState
            ? dispatch(setSidebarState(false))
            : dispatch(setSidebarState(true))
        }
        className="mg-header-profile basis-[40px] shrink-0 grow-0 flex justify-center items-center"
      >
        {!sidebarState ? (
          <Image
            src="/images/ico/ico-menu-show.svg"
            width={20}
            height={16}
            alt="사이드 메뉴 열기"
          />
        ) : (
          <Image
            src="/images/ico/ico-menu-hide.svg"
            width={12}
            height={19}
            alt="사이드 메뉴 닫기"
          />
        )}
      </button>
    </header>
  );
};

export default Header;
