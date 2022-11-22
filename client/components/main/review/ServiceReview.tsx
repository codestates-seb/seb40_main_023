import React, { useState } from "react";
import ReviewSlide from "./ReviewSlide";
import ReviewWrite from "./ReviewWrite";

const ServiceReview = () => {
  const reviewData = [
    {
      id: 0,
      profile: "/dummy/review-profile.png",
      contents: `복망고를 만들어서 공유하는거 진짜 재밌어요~!!!! 강추 강추입니다. 진짜 다들 메인프 정말 열심히 하시는 것 같아서 자극받구 갑니다. 화이팅!복망고를 만들어서 공유하는거 진짜 재밌어요~!!!! 강추 강추입니다.`,
      createdAt: "2022-10-10",
      username: "Nana",
    },
    {
      id: 1,
      profile: "/dummy/review-profile.png",
      contents: `복망고를 만들어서 공유하는거 진짜 재밌어요~!!!! 강추 강추입니다. 진짜 다들 메인프 정말 열심히 하시는 것 같아서 자극받구 갑니다. 화이팅!`,
      createdAt: "2022-10-10",
      username: "Nana",
    },
    {
      id: 2,
      profile: "/dummy/review-profile.png",
      contents: `복망고를 만들어서 공유하는거 진짜 재밌어요~!!!! 강추 강추입니다. 진짜 다들 메인프 정말 열심히 하시는 것 같아서 자극받구 갑니다. 화이팅!`,
      createdAt: "2022-10-10",
      username: "Nana",
    },
    {
      id: 3,
      profile: "/dummy/review-profile.png",
      contents: `복망고를 만들어서 공유하는거 진짜 재밌어요~!!!! 강추 강추입니다. 진짜 다들 메인프 정말 열심히 하시는 것 같아서 자극받구 갑니다. 화이팅!`,
      createdAt: "2022-10-10",
      username: "Nana",
    },
    {
      id: 4,
      profile: "/dummy/review-profile.png",
      contents: `복망고를 만들어서 공유하는거 진짜 재밌어요~!!!! 강추 강추입니다. 진짜 다들 메인프 정말 열심히 하시는 것 같아서 자극받구 갑니다. 화이팅!`,
      createdAt: "2022-10-10",
      username: "Nana",
    },
    {
      id: 5,
      profile: "/dummy/review-profile.png",
      contents: `복망고를 만들어서 공유하는거 진짜 재밌어요~!!!! 강추 강추입니다. 진짜 다들 메인프 정말 열심히 하시는 것 같아서 자극받구 갑니다. 화이팅!`,
      createdAt: "2022-10-10",
      username: "Nana",
    },
  ];

  return (
    <div className="w-full px-8 py-4 mg-review-card">
      <div className="mb-10">
        <ReviewSlide reviewData={reviewData} />
      </div>
      <div className="py-8 text-center">
        <ReviewWrite />
      </div>
    </div>
  );
};

export default ServiceReview;
