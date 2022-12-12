import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "../components/util/cookie";

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
      url: `/api/luckMango/public${query}?reveal=true&page=${page}&size=9`,
      cancelToken: new axios.CancelToken(c => (cancel = c)),
    })
      .then(res => {
        setLoading(false);

        setCards(prevCards => {
          return [...prevCards, ...res.data.data];
        });

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
      })
      .catch(e => {
        if (axios.isCancel(e)) return;
        setLoading(false);
        setError(true);
      });
    return () => cancel();
  }, [query, page]);

  return { loading, error, cards, hasMore, isEmpty };
};

export const usePatchLikes = (luckMangoId: number, likeCount: number) => {
  const res = axios({
    method: "PATCH",
    url: `/api/luckMango/${luckMangoId}`,
    data: {
      luckMangoId,
      likeCount: likeCount + 1,
      reveal: true,
    },
    headers: {
      Authorization: `Bearer ${getCookie("accessJwtToken")}`,
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
