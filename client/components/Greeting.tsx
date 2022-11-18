import React, { useState } from "react";

type GreetingProps = {
  content: string;
};

const Greeting = (props: GreetingProps) => {
  const [active, setActive] = useState(false);
  const handleGreeting = () => {
    setActive(!active);
  };
  return (
    <>
      <div
        className={
          active
            ? "z-10 relative break-keep w-4/6 h-auto p-4 text-sm border-white mg-border-2 bg-[#FFFFFFCC]"
            : "line-clamp-3 z-10 overflow-hidden break-keep text-ellipsis relative  w-4/6 h-[75.99px] p-3 text-sm border-white mg-border-2 bg-[#FFFFFFCC]"
        }
      >
        {props.content}
        <button
          className="absolute font-bold text-black top-5 right-1"
          onClick={handleGreeting}
        >
          {">"}
        </button>
      </div>
    </>
  );
};

export default Greeting;
