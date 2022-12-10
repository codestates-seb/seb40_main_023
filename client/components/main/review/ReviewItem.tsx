import React from "react";

const ReviewItem = ({ ...review }: any) => {
  return (
    <div>
      <div className="mg-slide-wrapper">
        <div className="mb-4">{review.reviewBody}</div>
        <div className="flex flex-row items-center justify-start ml-[-14px] mb-[-4px]">
          <div
            style={{ backgroundImage: `url("${review.member.imgUrl}")` }}
            className={`w-[45px] h-[45px] border-mono-borderNormal rounded-full overflow-hidden bg-cover ${
              review.member.imgUrl === null ||
              review.member.imgUrl === "NONE" ||
              review.member.imgUrl === ""
                ? "bg-[url(/images/char/profile.webp)]"
                : ""
            }`}
          ></div>
          <span className="ml-3">{review.member.name}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
