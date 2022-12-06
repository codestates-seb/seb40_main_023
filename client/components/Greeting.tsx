import React, { useState } from "react";

type GreetingProps = {
  content: string;
  edit: boolean;
};

const Greeting = ({ content, edit }: GreetingProps) => {
  const [active, setActive] = useState<boolean>(false);

  const handleGreeting = () => {
    setActive(!active);
  };

  return (
    <div
      className={`w-[90%] ${
        !edit
          ? active
            ? "mg-greet-message border-white"
            : "mg-greet-message border-white"
          : active
          ? "mg-greet-message border-dashed border-mono-borderNormal"
          : "mg-greet-message border-dashed border-mono-borderNormal"
      }`}
    >
      <p
        className={
          !edit
            ? active
              ? "h-auto break-keep"
              : "line-clamp-2 h-[2.5rem]"
            : active
            ? "h-auto break-keep"
            : "line-clamp-2 h-[2.5rem]"
        }
      >
        {content}
      </p>
      <button
        className={active ? "mg-greet-dropdown open" : "mg-greet-dropdown"}
        onClick={handleGreeting}
      ></button>
    </div>
  );
};

export default Greeting;
