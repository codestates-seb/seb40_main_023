import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "./Sidebar";
import AlertMessage from "./AlertMessage";
import { useCookies } from "react-cookie";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/user";
import { memberIdState } from "../recoil/memberId";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(true);
  const [cookies] = useCookies(["accessJwtToken"]);
  const [user, setUser] = useRecoilState(userState);
  const [memberId, setMemberId] = useRecoilState(memberIdState);

  const toggleSidebarHandle = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleAlertHandle = (): void => {
    setIsAlertOpen(!isAlertOpen);
  };

  const tokenValid = () => {
    const token = cookies.accessJwtToken;
    if (token === undefined || "") {
      setUser({ login: false });
      setMemberId({ memberId: 0 });
      localStorage.removeItem("recoil-persist");
    }
  };

  useEffect(() => {
    tokenValid();
  }, [isSidebarOpen]);

  return (
    <>
      <header className="border-b border-mono-borderLight bg-white z-[999] fixed h-[58px] px-3 shadow-header flex items-center w-full justify-between">
        <div className="flex justify-center items-center basis-[40px] shrink-0 grow-0">
          <button className="relative flex items-center justify-center">
            <Image
              src="/images/ico/ico-alert.svg"
              width={19}
              height={20}
              alt="받은 덕담 알림"
              onClick={toggleAlertHandle}
            />
            <span className="absolute top-0 right-0 z-10 flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full opacity-30 animate-ping bg-danger-normal"></span>
              <span className="relative inline-flex w-2 h-2 rounded-full bg-danger-normal"></span>
            </span>
          </button>
          {isAlertOpen && <AlertMessage />}
        </div>
        <div className="flex justify-center w-full">
          <h1 className="mg-logo">
            <Link href="/">새해복망고 로고</Link>
          </h1>
        </div>
        <button
          onClick={() =>
            isSidebarOpen ? setIsSidebarOpen(false) : setIsSidebarOpen(true)
          }
          className="basis-[40px] shrink-0 grow-0 flex justify-center items-center"
        >
          {!isSidebarOpen ? (
            <Image
              src="/images/ico/ico-menu-show.svg"
              width={20}
              height={16}
              alt="사이드 메뉴 열기"
              onClick={tokenValid}
            />
          ) : (
            <Image
              src="/images/ico/ico-menu-hide.svg"
              width={12}
              height={19}
              alt="사이드 메뉴 닫기"
              onClick={tokenValid}
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
