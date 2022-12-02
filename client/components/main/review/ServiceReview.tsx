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
    <div className="w-full px-0 py-4 mobile:px-8 mg-review-card">
      <div className="relative mb-3 mobile:mb-10">
        {reviewUpdate && <Loading />}
        {reviewData && <ReviewSlide reviewData={reviewData} />}
      </div>
      <div className="py-8 text-center">
        <ReviewWrite setUpdated={setReviewUpdate} />
      </div>
    </div>
  );
};

export default ServiceReview;
