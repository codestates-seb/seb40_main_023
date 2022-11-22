import React from "react";
import Image from "next/image";

const ReviewItem = ({ currentIdx, ...review }: any) => {
  return (
    <div className={review.id === currentIdx ? "active-slide" : "slide"}>
      <div className="mg-slide-wrapper">
        <div className="mb-4">{review.contents}</div>
        <div className="flex flex-row items-center justify-start">
          <Image
            src={review.profile}
            alt={`${review.username}의 프로필 사진`}
            width={45}
            height={45}
          />
          <span className="ml-3">{review.username}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
