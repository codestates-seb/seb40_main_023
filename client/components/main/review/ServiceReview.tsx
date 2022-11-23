import React, { useState, useEffect } from "react";
import ReviewSlide from "./ReviewSlide";
import ReviewWrite from "./ReviewWrite";
import Loading from "../../util/Loading";
import { useFetch } from "../../../api/useFetch";

const ServiceReview = () => {
  const [reviewData, setReviewData] = useState([]);
  // const reviewData = [
  //   {
  //     reviewId: 1,
  //     reviewBody: "후기내용",
  //     memberId: 0,
  //     createdAt: "2022-11-21T06:08:40.561186",
  //     modifiedAt: "2022-11-21T06:08:40.561186",
  //   },
  // ];

  const getReview = async () => {
    const res = await useFetch("/api/review?page=1&size=10");
    console.log(res);
    setReviewData(res?.data);
  };

  useEffect(() => {
    getReview();
  }, []);

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
