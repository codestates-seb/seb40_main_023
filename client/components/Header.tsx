import { useState } from "react";
import Sidebar from "./Sidebar";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebarHandle = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="border-b border-mono-borderLight bg-white z-[9999] fixed h-[58px] px-3 shadow-header flex items-center w-full justify-between">
        <div className="ml-[40px] flex justify-center w-full">
          <h1 className="mg-logo">
            <Link href="/">새해복망고 로고</Link>
          </h1>
        </div>
        <button
          onClick={() =>
            isSidebarOpen ? setIsSidebarOpen(false) : setIsSidebarOpen(true)
          }
          className="mg-header-profile basis-[40px] shrink-0 grow-0 flex justify-center items-center"
        >
          {!isSidebarOpen ? (
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
      <Sidebar
        toggleHandler={toggleSidebarHandle}
        toggleState={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </>
  );
};

export default Header;
