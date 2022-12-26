import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "../components/util/cookie";
import { luckMgType } from "./../types/lucky";
import { NewMessageType } from "../types/main";

export const useAlert = ({ memberId }: { memberId: number }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMango, setHasMango] = useState(true);

  useEffect(() => {
    if (memberId !== 0) {
      setData([]);
      setLoading(true);
      setError(false);
      let cancel: any;
      axios({
        method: "GET",
        url: `/api/luckMango/member?memberId=${memberId}&page=1&size=20`,
        cancelToken: new axios.CancelToken(c => (cancel = c)),
        headers: {
          Authorization: `Bearer ${getCookie("accessJwtToken")}`,
        },
      })
        .then(res => {
          setLoading(false);
          const newMsgs: NewMessageType[] = [];

          if (res.data && res.data.data.length) {
            res.data.data.map((el: luckMgType) => {
              if (el.newLuckBag > 0) {
                console.log(el.newLuckBag);
                newMsgs.push({
                  mgTitle: el.title,
                  mgCount: el.newLuckBag,
                  mgId: el.luckMangoId,
                });
              }
            });
            setData(newMsgs);
          } else {
            setHasMango(false);
          }
        })
        .catch(e => {
          console.log(e);
          if (axios.isCancel(e)) return;
          setLoading(false);
          setError(true);
        });
      return () => cancel();
    } else {
      setError(true);
    }
  }, [memberId]);

  return { data, loading, error, hasMango };
};
