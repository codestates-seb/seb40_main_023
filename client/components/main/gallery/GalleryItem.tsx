import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCookies } from "react-cookie";
import { usePatchLikes } from "../../../fetch/useGallery";
import { notifySuccess, notifyError } from "../../util/Toast";

const GalleryItem = ({ ...gallery }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [like, setLike] = useState(gallery.likeCount);
  const [id, setId] = useState(gallery.luckMangoId);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [cookies] = useCookies(["accessJwtToken"]);

  const checkLogin = () => {
    const token = cookies.accessJwtToken;
    if (token === undefined || token === "") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const clickLikeHandle = async (e: any) => {
    e.preventDefault();

    if (!isLogin) {
      notifyError({
        message: `로그인이 필요한 서비스입니다.`,
        icon: "🥹",
      });
      return;
    }

    const res = await usePatchLikes(id, like);
    if (res.statusText === "Unauthorized") {
      notifyError({ message: "로그인이 필요한 서비스입니다.", icon: "🥹" });
    } else if (res.status >= 400) {
      notifyError({
        message: "통신이 원활하지 않습니다. \n 잠시 후에 시도해 주세요.",
        icon: "🙏",
      });
    } else {
      setLike(res.likeCount);
      notifySuccess({ message: "마음을 담아 추천을 보냈어요.", icon: "😀" });
    }
  };

  return (
    <Link
      href={`/lucky/${gallery.luckMangoId}`}
      className={`group mg-default-card aspect-card`}
    >
      <button
        className="absolute top-[5px] right-[5px] z-10"
        onClick={e => clickLikeHandle(e)}
      >
        {loading ? (
          <Image
            width={32}
            height={28}
            src="/images/ico/ico-like-active.svg"
            alt="likeActive"
          />
        ) : (
          <Image
            width={32}
            height={28}
            src="/images/ico/ico-like-normal.svg"
            alt="likeNormal"
          />
        )}
      </button>
      <div className="mg-card-contents">
        <div
          style={{ backgroundImage: `url("${gallery.bgImage}")` }}
          className={`mg-card-image mobile:group-hover:blur-sm${
            (gallery.bgImage === null ||
              gallery.bgImage === "NONE" ||
              gallery.bgImage === "") &&
            "bg-[url(/dummy/user1.png)]"
          }`}
        ></div>
        <div className="mg-card-desc">
          <p className="truncate">
            <span className="font-medium">{gallery.member.name}</span>님의 새해
            복망고
          </p>
          <p className="truncate relative text-right pl-[30px] before:content-[''] before:w-[20px] before:h-[20px] before:bg-[url(/images/ico/ico-like-active.svg)] before:bg-contain bg-no-repeat before:absolute before:left-0 before:top-0 text-primary-light font-medium">
            {Number(like).toLocaleString()}
          </p>
        </div>
      </div>
      <div
        className={`invisible justify-center mobile:visible mg-card-overlay text-white flex items-center pointer-events-none`}
      >
        클릭하시면 {gallery.member.name}님의 <br /> 복망고로 이동합니다.
      </div>
    </Link>
  );
};

export default GalleryItem;
