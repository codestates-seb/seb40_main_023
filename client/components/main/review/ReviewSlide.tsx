import React, { useState } from "react";
import ReviewItem from "./ReviewItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReviewDataProps } from "../../../types/main";
import FetchEmpty from "../../util/FetchEmpty";

function ReviewSlide({ reviewData }: any) {
  const NextArrow = ({ onClick }: any) => {
    return (
      <div
        className="mg-slick-next w-[9px] h-[14px] bg-[url('/images/ico/ico-slide-next.svg')]"
        onClick={onClick}
      ></div>
    );
  };

  const PrevArrow = ({ onClick }: any) => {
    return (
      <div
        className="mg-slick-prev w-[9px] h-[14px] bg-[url('/images/ico/ico-slide-prev.svg')]"
        onClick={onClick}
      ></div>
    );
  };

  const settings = {
    centerMode: true,
    infinite: true,
    dots: true,
    speed: 300,
    slidesToShow: 3,
    initialSlide: 0,
    centerPadding: "0",
    swipeToSlide: true,
    focusOnSelect: true,
    nextArrow: <NextArrow onClick />,
    prevArrow: <PrevArrow onClick />,
    adaptiveHeight: true,
    draggable: true,
    responsive: [
      {
        breakpoint: 1490,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return reviewData.length ? (
    <Slider {...settings} className="flex flex-col items-center justify-center">
      {reviewData.map((review: ReviewDataProps, idx: number) => (
        <ReviewItem key={idx} {...review} />
      ))}
    </Slider>
  ) : (
    <FetchEmpty />
  );
}

export default ReviewSlide;
