import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReviewItem from "./ReviewItem";

const settings = {
  arrows: true,
  dots: true,
  infinite: true,
  speed: 500,
  // autoplaySpeed: 2000,
  // autoplay: true,
  className: "mg-review-card",
  centerMode: true,
  centerPadding: "150px",
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  draggable: true,
  adaptiveHeight: true,
};

const ServiceReview = () => {
  const reviewData = [
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
      <Slider {...settings}>
        {reviewData.map((review, idx) => (
          <ReviewItem key={idx} {...review} />
        ))}
      </Slider>
    </div>
  );
};

export default ServiceReview;
