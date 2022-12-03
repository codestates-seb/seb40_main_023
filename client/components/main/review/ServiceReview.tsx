import React, { useState, useEffect } from "react";
import ReviewSlide from "./ReviewSlide";
import ReviewWrite from "./ReviewWrite";
import Loading from "../../util/Loading";
import { useFetch } from "../../../fetch/useFetch";

const ServiceReview = () => {
  const [reviewData, setReviewData] = useState([]);
  const [reviewUpdate, setReviewUpdate] = useState(true);

  useEffect(() => {
    const getReview = async () => {
      const res = await useFetch("/api/review?page=1&size=10");
      setReviewData(res.data);
      setReviewUpdate(false);
    };
    getReview();
  }, [reviewUpdate]);

  return (
    <div className="w-full px-0 mobile:px-8 mg-review-card">
      <div className="relative mobile:mb-10 min-h-[200px]">
        {reviewUpdate ? <Loading /> : <ReviewSlide reviewData={reviewData} />}
      </div>
      <div className="py-4 text-center mobile:py-8">
        <ReviewWrite setUpdated={setReviewUpdate} />
      </div>
    </div>
  );
};

export default ServiceReview;
