import { useState, useRef, useEffect } from "react";
import { createReview } from "../../../fetch/review";
import { getCookie } from "../../util/cookie";
import { useCookies } from "react-cookie";
import { useRecoilValue } from "recoil";
import { memberIdState } from "../../../recoil/memberId";
import { notifyInfo, notifyError, notifySuccess } from "../../util/Toast";
import CountCharLength from "../../util/CountCharLength";

function ReviewWrite({ setUpdated }: any) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [reviewSize, setReviewSize] = useState<number>(0);
  const [reviewInput, setReviewInput] = useState<string>("");
  const memberId = useRecoilValue(memberIdState).memberId;
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

  const onChangeReview = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setReviewSize(e.target.value.length);
    setReviewInput(e.target.value);
  };

  const submitReview = async () => {
    if (!isLogin) {
      notifyError({
        message: `로그인이 필요한 서비스입니다.`,
        icon: "🥹",
      });
      return;
    }

    if (reviewSize < 10) {
      notifyInfo({
        message: "10자 이상 입력해 주시면\n 더 좋을 것 같아요!",
        icon: "🤗",
      });
    } else if (reviewSize >= 130) {
      notifyError({
        message: `마음은 너무 감사하지만,\n 130자 이하로 작성해 주세요.`,
        icon: "🥹",
      });
    } else {
      const res = await createReview(
        "/api/review",
        {
          memberId,
          reviewBody: reviewInput,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("accessJwtToken")}`,
          },
        },
      );

      if (res.statusText === "Unauthorized") {
        notifyError({ message: "로그인이 필요한 서비스입니다.", icon: "🥹" });
      } else if (res.status >= 400) {
        notifyError({
          message: "통신이 원활하지 않습니다. \n 잠시 후에 시도해 주세요.",
          icon: "🙏",
        });
      } else {
        notifySuccess({
          message: "정성스러운 후기 감사합니다. \n새해 복망고!",
          icon: "😀",
        });
      }

      setReviewInput("");
      setReviewSize(0);
      setUpdated(true);
    }
  };

  return (
    <div>
      <h3 className="mb-5 text-2xl mt-7">
        새해 복망고 이용해보셨다면 <br className="mobile:hidden" />
        후기를 남겨주세요
      </h3>
      <div className="flex flex-col mb-4">
        <textarea
          className={`${
            reviewSize <= 130
              ? "border-mono-borderNormal"
              : "border-danger-normal"
          } mg-default-textarea px-6 py-4 border rounded-xl mb-2`}
          cols={30}
          rows={3}
          onChange={onChangeReview}
          ref={ref}
          value={reviewInput}
        ></textarea>
        <div className="flex flex-row justify-between">
          <div className="mg-info-disabled">
            <i></i>130자까지 입력할 수 있어요.
          </div>
          <CountCharLength current={reviewSize} limit={130} />
        </div>
      </div>
      <button
        className="mg-primary-button w-[230px]"
        onClick={submitReview}
        disabled={reviewSize <= 130 ? false : true}
      >
        후기 남기기
      </button>
    </div>
  );
}

export default ReviewWrite;
