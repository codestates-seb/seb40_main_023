import React, { useEffect, useState } from "react";

const Countdown: React.FC = () => {
  const [validTime, setValidTime] = useState<boolean>(true);
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const target = new Date("12/31/2022 23:59:59");

    const interval = setInterval(() => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setDays(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);

      if (d < 0 && h < 0 && m < 0 && s < 0) {
        setValidTime(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mg-main-countdown">
      {validTime
        ? `2023년 새해까지 ${days === 0 ? "" : `${days}일`} ${
            hours === 0 ? "" : `${hours}시`
          } ${
            minutes === 0 ? "" : `${minutes}분`
          } ${`${seconds}초`} 남았습니다.`
        : "Happy New Year!"}
    </div>
  );
};

export default Countdown;
