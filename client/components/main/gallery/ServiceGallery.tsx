import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import GalleryItem from "./GalleryItem";
import Loading from "../../util/Loading";
import FetchError from "../../util/FetchError";
import { useFetchInfinite } from "../../../fetch/useGallery";
import { GalleryDataProps } from "../../../types/main";

export default function ServiceGallery() {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const { cards, loading, error, hasMore, isEmpty } = useFetchInfinite(
    query,
    page,
  );

  useEffect(() => {
    if (inView && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  }, [inView]);

  const toggleOrderHandle = (e: any) => {
    if (`${e.target.dataset.type}` === query) return;
    setQuery(`${e.target.dataset.type}`);
    setPage(1);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full my-4">
      <ul className="mg-gallery-filter">
        <li className={`rounded-l-full ${query === "" && "active"}`}>
          <button
            className="min-w-[100px]"
            onClick={toggleOrderHandle}
            data-type=""
          >
            최신순
          </button>
        </li>
        <li className={`rounded-r-full ${query === "/like" && "active"}`}>
          <button
            className="min-w-[100px]"
            onClick={toggleOrderHandle}
            data-type="/like"
          >
            추천순
          </button>
        </li>
      </ul>
      <div
        className={
          "relative grid w-full justify-items-center mb-[20px] grid-flow-row grid-cols-2 max-w-[500px] gap-6"
        }
      >
        {cards.map((card: GalleryDataProps) => (
          <GalleryItem key={card.luckMangoId} {...card} />
        ))}
      </div>
      <div className="relative min-h-[100px] text-center my-4">
        {loading ? <Loading /> : error && <FetchError />}
        {isEmpty ? (
          <p className="mb-1 text-mono-textDisabled">
            공개된 복망고가 없습니다. 🥹
          </p>
        ) : hasMore ? (
          <div className="opacity-0" ref={ref}>
            intersection observer marker
          </div>
        ) : (
          <div
            className={`flex flex-col items-center py-4 text-center grid-col-1 ${
              loading === false && hasMore === false ? "visible" : "invisible"
            }`}
          >
            <p className="mb-1 text-mono-textDisabled">
              모든 복망고를 불러왔습니다. 😎
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
    </div>
  );
}
