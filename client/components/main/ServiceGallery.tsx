import React from "react";
import GalleryItem from "./GalleryItem";

const ServiceGallery = () => {
  const count = 12;

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
      <div className="grid w-full mb-[20px] grid-flow-row grid-cols-2 gap-4 tablet:grid-cols-3">
        {Array.from({ length: count }).map((el, idx) => (
          <GalleryItem key={idx} />
        ))}
      </div>
      <div className="text-center flex py-4 flex-col items-center">
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
