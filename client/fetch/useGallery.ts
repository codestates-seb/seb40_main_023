import { ReviewDataProps } from "./../types/main";
import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchInfinite = (query: string, page: number) => {
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    setCards([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel: any;
    axios({
      method: "GET",
      url: `/api/luckMango/public?reveal=true&page=${page}&size=9&sort=${query}`,
      cancelToken: new axios.CancelToken(c => (cancel = c)),
    })
      .then(res => {
        setCards(prevCards => {
          return [...prevCards, ...res.data.data];
        });

        console.log(
          "currentPage/totalPage: ",
          res.data.pageInfo.page,
          res.data.pageInfo.totalPages,
        );

        console.log("totalElement: ", res.data.pageInfo.totalElements);

        if (res.data.pageInfo.totalElements === 0) {
          setIsEmpty(true);
        } else {
          setIsEmpty(false);
        }

        if (res.data.pageInfo.page < res.data.pageInfo.totalPages) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }

        setLoading(false);
      })
      .catch(e => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, page]);

  return { loading, error, cards, hasMore, isEmpty };
};

export const useFetchLikes = (luckMangoId: number, likeCount: number) => {
  const token = process.env.NEXT_PUBLIC_TOKEN;

  const res = axios({
    method: "PATCH",
    url: `/api/luckMango/${luckMangoId}`,
    data: {
      luckMangoId,
      likeCount,
      reveal: true,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => {
      return res.data.data;
    })
    .catch(error => {
      console.warn(error.data);
      return error.response;
    });

  return res;
};
