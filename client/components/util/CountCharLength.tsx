import React, { useState, useEffect } from "react";

type CountCharProps = {
  current: number;
  limit: number;
};

const CountCharLength = ({ current, limit }: CountCharProps) => {
  const [isSizeValid, setIsSizeValid] = useState(true);

  useEffect(() => {
    if (current > limit) setIsSizeValid(false);
    else setIsSizeValid(true);
  }, [current]);

  return (
    <div className="text-sm text-mono-textDisabled">
      <span className={isSizeValid ? "" : "text-danger-normal"}>{current}</span>
      /{limit}
    </div>
  );
};

export default CountCharLength;
