import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    setCurrentTime(getCurrentTime());
  }, []);

  return (
    <div>
      <div className="grid w-full grid-cols-1 text-center mobile:text-left mobile:grid-cols-2">
        <div className="flex flex-col p-4 pt-8 mobile:pl-[6rem]">
          <dl className="py-2 mb-3">
            <dt>누적 복망고 수</dt>
            <dd className="text-2xl text-primary-normal">12,578</dd>
          </dl>
          <dl className="py-2">
            <dt>누적 덕담 메세지 수</dt>
            <dd className="text-2xl text-secondary-normal">123,456,789</dd>
          </dl>
        </div>
        <div className="p-4 mobile:pr-10">
          <div className="relative h-full border-2 rounded-l border-mono-borderLight aspect-[4/2]">
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
