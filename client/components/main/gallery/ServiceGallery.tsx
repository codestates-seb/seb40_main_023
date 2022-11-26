import React, { useState, useEffect, ComponentElement } from "react";
import { useInView, InView } from "react-intersection-observer";
import { GalleryDataProps } from "../../../types/main";
import GalleryItem from "./GalleryItem";
import { useFetch } from "../../../api/useFetch";
import FetchError from "../../util/FetchError";
import Loading from "../../util/Loading";
import Link from "next/link";

const ServiceGallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [gFetchState, setGFetchState] = useState("loading");
  const [orderState, setOrderState] = useState("newest");
  const [pageSize, setPageSize] = useState(1);
  const [isInfinityEnd, setIsInfinityEnd] = useState(false);
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  const getGallery = async (sorting: string, page: number | undefined = 1) => {
    const res = await useFetch(
      `/api/luckMango/public?reveal=true&page=${page}&size=12${sorting}`,
    );

    if (res && res.status <= 201) {
      setGalleryData(res.data);
      setGFetchState("ok");
    } else {
      setGFetchState("error");
    }
  };

  useEffect(() => {
    console.log(inView);
    console.log(entry);

    const ordering = orderState === "newest" ? "" : "&sort=likeCount";

    getGallery(ordering, pageSize);
  }, [orderState, inView]);

  return (
    <div className="flex flex-col items-center justify-center my-4">
      <ul className="mg-gallery-filter">
        <li className={`rounded-l-full ${orderState === "newest" && "active"}`}>
          <button
            className="min-w-[100px]"
            onClick={() => setOrderState("newest")}
          >
            최신순
          </button>
        </li>
        <li
          className={`rounded-r-full ${orderState === "likeCount" && "active"}`}
        >
          <button
            className="min-w-[100px]"
            onClick={() => setOrderState("likeCount")}
          >
            추천순
          </button>
        </li>
      </ul>
      <div className="relative grid w-full mb-[20px] grid-flow-row grid-cols-2 gap-6 tablet:grid-cols-3 min-h-[140px]">
        {gFetchState === "ok" ? (
          galleryData &&
          galleryData.map((gallery: GalleryDataProps, idx: number) => {
            return <GalleryItem key={idx} {...gallery} />;
          })
        ) : gFetchState === "loading" ? (
          <Loading />
        ) : (
          <FetchError />
        )}
        <div className="" ref={ref}></div>
      </div>
      {isInfinityEnd && (
        <div className="flex flex-col items-center py-4 text-center">
          <p className="mb-1 text-mono-textDisabled">
            모든 복망고를 불러왔습니다.
          </p>
          <Link
            href="/create"
            className="underline text-primary-normal hover:text-primary-hover"
          >
            새로운 복망고를 만들어 볼까요?
          </Link>
        </div>
      )}
    </div>
  );
};

export default ServiceGallery;
