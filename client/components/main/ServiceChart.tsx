import React from "react";
import LineChart from "./Chart";

const ServiceChart = () => {
  return (
    <div>
      <div className="grid grid-cols-1 text-center mobile:text-left mobile:grid-cols-2">
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
        <div className="p-4 mobile:pr-20">
          <div className="h-full border-2 rounded-lg bg-primary-normal/80 border-primary-normal aspect-[4/3]">
            {/* <LineChart /> */}
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="font-semibold text-secondary-darker">
          2022.11.11 22:00:00 기준
        </p>
        <p className="text-mono-textDisabled">
          1시간 간격으로 업데이트되고 있습니다
        </p>
      </div>
    </div>
  );
};

export default ServiceChart;
