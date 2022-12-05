import React, { useEffect, useState } from "react";
import { useInView, InView } from "react-intersection-observer";
import CountUp from "react-countup";
import LineChart from "./Chart";

const getCurrentTime = (): string => {
  const koDtf = new Intl.DateTimeFormat("ko", {
    dateStyle: "long",
    timeStyle: "medium",
  }).format(new Date());
  return koDtf;
};

const ServiceChart = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [countUp, setCountUp] = useState(false);
  const { ref, inView, entry } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    setCurrentTime(getCurrentTime());
  }, []);

  useEffect(() => {
    setCountUp(inView);
  }, [inView]);

  return (
    <div ref={ref}>
      <div className="grid w-full grid-cols-1 text-center mobile:text-left mobile:grid-cols-2">
        <div className="flex flex-col p-4 pt-8 mobile:pl-[6rem]">
          <dl className="py-2 mb-3">
            <dt>누적 복망고 수</dt>
            <dd className="text-2xl text-primary-normal">
              {countUp ? (
                <CountUp
                  start={0}
                  end={187892}
                  separator={","}
                  duration={1}
                  delay={0}
                />
              ) : (
                "0"
              )}
            </dd>
          </dl>
          <dl className="py-2">
            <dt>누적 덕담 메세지 수</dt>
            <dd className="text-2xl text-secondary-normal">
              {countUp ? (
                <CountUp
                  start={0}
                  end={267890}
                  separator={","}
                  duration={1}
                  delay={0}
                />
              ) : (
                "0"
              )}
            </dd>
          </dl>
        </div>
        <div className="p-4 mobile:pr-10">
          <div className="relative h-full w-full border-2 rounded-l border-mono-borderLight aspect-[2/1]">
            <LineChart />
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-mono-textDisabled">{currentTime} 기준</p>
      </div>
    </div>
  );
};

export default ServiceChart;
