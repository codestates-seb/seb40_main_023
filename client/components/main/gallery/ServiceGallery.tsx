import React, { useState, useEffect } from "react";
import { useFetch } from "../../../api/useFetch";
import Loading from "../../util/Loading";
import GalleryItem from "./GalleryItem";

const ServiceGallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [galleryUpdate, setGalleryUpdate] = useState(true);

  useEffect(() => {
    const getGalleryItem = async () => {
      const res = await useFetch(
        "/api/luckMango/public?reveal=true&page=1&size=12&sort=likeCount",
      );
      setGalleryData(res.data);
      setGalleryUpdate(false);
    };
    getGalleryItem();
  }, [galleryUpdate]);

  return (
    <div className="flex flex-col items-center justify-center my-4">
      <ul className="mg-gallery-filter">
        <li className="rounded-l-full active">
          <button>최신순</button>
        </li>
        <li className="rounded-r-full">
          <button>추천순</button>
        </li>
      </ul>
      <div className="relative grid w-full mb-[20px] grid-flow-row grid-cols-2 gap-6 tablet:grid-cols-3 min-h-[100px]">
        {galleryUpdate && <Loading />}
        {galleryData &&
          galleryData.map((el, idx) => (
            <GalleryItem key={idx} {...galleryData} />
          ))}
      </div>
      <div className="flex flex-col items-center py-4 text-center">
        <p className="mb-1 text-mono-textDisabled">
          모든 복망고를 불러왔습니다.
        </p>
        <button className="underline text-primary-normal">
          새로운 복망고를 만들어 볼까요?
        </button>
      </div>
    </div>
  );
};

export default ServiceGallery;
