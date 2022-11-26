import React from "react";
import Image from "next/image";

const ReviewItem = ({ ...review }: any) => {
  return (
    <div>
      <div className="mg-slide-wrapper">
        <div className="mb-4">{review.reviewBody}</div>
        <div className="flex flex-row items-center justify-start ml-[-14px] mb-[-4px]">
          <Image
            src={
              review.member.imgUrl === null ||
              review.member.imgUrl === "NONE" ||
              review.member.imgUrl === ""
                ? "/images/char/profile.webp"
                : review.member.imgUrl
            }
            alt={`${review.member.name}의 프로필 사진`}
            width={45}
            height={45}
          />
          <span className="ml-3">{review.member.name}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
