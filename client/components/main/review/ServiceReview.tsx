import React, { useState, useEffect } from "react";
import ReviewSlide from "./ReviewSlide";
import ReviewWrite from "./ReviewWrite";
import Loading from "../../util/Loading";
import { useFetch } from "../../../api/useFetch";

const ServiceReview = () => {
  const [reviewData, setReviewData] = useState([]);
  const [reviewUpdate, setReviewUpdate] = useState(true);

  useEffect(() => {
    const getReview = async () => {
      const res = await useFetch("/api/review?page=1&size=10");
      console.log(res);
      setReviewData(res.data);
      setReviewUpdate(false);
    };
    getReview();
  }, [reviewUpdate]);

  return (
    <div className="w-full px-8 py-4 mg-review-card">
      <div className="relative mb-10">
        {reviewUpdate && <Loading />}
        <ReviewSlide reviewData={reviewData} />
      </div>
      <div className="py-8 text-center">
        <ReviewWrite setUpdated={setReviewUpdate} />
      </div>
    </div>
  );
};

export default ServiceReview;
