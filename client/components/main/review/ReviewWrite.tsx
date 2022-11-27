import React, { useState, useRef } from "react";
import CountCharLength from "../../util/CountCharLength";
import { Toast, notifyInfo, notifyError } from "../../util/Toast";
import { createReview } from "../../../fetch/review";
import Image from "next/image";

function ReviewWrite({ setUpdated }: any) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [reviewSize, setReviewSize] = useState(0);
  const [reviewInput, setReviewInput] = useState("");

  const onChangeReview = (e: any) => {
    setReviewSize(e.target.value.length);
    setReviewInput(e.target.value);
  };

  const submitReview = () => {
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
      createReview("/api/review", {
        memberId: 1,
        reviewBody: reviewInput,
      });

      setUpdated(true);
      setReviewInput("");
    }
  };

  return (
    <div>
      <h3 className="mb-4 text-2xl">
        새해 복망고 이용해보셨다면 후기를 남겨주세요
      </h3>
      <div className="flex flex-col mb-4">
        <textarea
          className={`${
            reviewSize <= 130
              ? "border-mono-borderNormal"
              : "border-danger-normal"
          } w-full mb-2 px-8 py-6 border border-mono-borderNormal resize-none rounded-xl focus:outline-none focus-visible:ring`}
          cols={30}
          rows={3}
          onChange={onChangeReview}
          ref={ref}
          value={reviewInput}
        ></textarea>
        <div className="flex flex-row justify-between">
          <div className="flex text-mono-textDisabled">
            <Image
              className="mr-2 grayscale"
              src={"/images/ico/ico-info.svg"}
              alt="info 아이콘"
              width={20}
              height={20}
            />
            130자까지 입력할 수 있어요
          </div>
          <CountCharLength current={reviewSize} limit={130} />
        </div>
      </div>
      <button className="mg-primary-button w-[230px]" onClick={submitReview}>
        후기 남기기
      </button>
      <Toast />
    </div>
  );
}

export default ReviewWrite;
