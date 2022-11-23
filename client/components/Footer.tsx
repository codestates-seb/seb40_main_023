import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full px-4 py-6 pb-8 border-t border-mono-borderNormal bg-mono-bgFooter">
      <ul className="grid grid-cols-1 tablet:grid-cols-2 text-mono-textFooter">
        <div className="mg-footer-github-col tablet:justify-end">
          <p className="mg-footer-github-title">FE</p>
          <li className="mr-3">
            <Link
              href="https://github.com/Exist95"
              className="mg-footer-github-link"
            >
              <Image
                width={18}
                height={18}
                alt="github icon"
                src="/images/ico/ico-github.svg"
                className="mr-1"
              ></Image>
              노종열
            </Link>
          </li>
          <li className="mr-3">
            <Link
              href="https://github.com/rmaomina"
              className="mg-footer-github-link"
            >
              <Image
                width={18}
                height={18}
                alt="github icon"
                src="/images/ico/ico-github.svg"
                className="mr-1"
              ></Image>
              김민아
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/hongdahee"
              className="mg-footer-github-link"
            >
              <Image
                width={18}
                height={18}
                alt="github icon"
                src="/images/ico/ico-github.svg"
                className="mr-1"
              ></Image>
              홍다희
            </Link>
          </li>
        </div>
        <div className="mg-footer-github-col tablet:justify-start">
          <p className="mg-footer-github-title">BE</p>
          <li className="mr-3">
            <Link
              href="https://github.com/Dev-Sam32"
              className="mg-footer-github-link"
            >
              <Image
                width={18}
                height={18}
                alt="github icon"
                src="/images/ico/ico-github.svg"
                className="mr-1"
              ></Image>
              신현상
            </Link>
          </li>
          <li className="mr-3">
            <Link
              href="https://github.com/yoojunghyen"
              className="mg-footer-github-link"
            >
              <Image
                width={18}
                height={18}
                alt="github icon"
                src="/images/ico/ico-github.svg"
                className="mr-1"
              ></Image>
              유정현
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/saypart"
              className="mg-footer-github-link"
            >
              <Image
                width={18}
                height={18}
                alt="github icon"
                src="/images/ico/ico-github.svg"
                className="mr-1"
              ></Image>
              한상현
            </Link>
          </li>
        </div>
      </ul>
      <Link
        href="https://github.com/codestates-seb/seb40_main_023"
        className="block text-xs text-center underline text-mono-500 decoration-solid underline-offset-1"
      >
        코드스테이츠 40기 메인 프로젝트 애플망고팀의 새해복망고 프로젝트 입니다.
      </Link>
    </footer>
  );
}
