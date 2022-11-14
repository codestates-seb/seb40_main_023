import React, { useState } from "react";
import Image from "next/image";
import User1 from "../public/dummy/user1.png";

const BokCard = ({ data }: any) => {
  const [hover, setHover] = useState(false);

  return (
    <>
      <div
        className="mg-default-card"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Image src={User1} alt="user profile picture" />
        <div className="flex flex-col p-2 text-end gap-y-2">
          <div className="text-bo">선화주택아이들에게 보내는 카드</div>
          <div>13,245개의 덕담을 받았어요!!</div>
        </div>
      </div>
      {hover ? <div className="hover:bg-primary-hover">asdas</div> : null}
    </>
  );
};

export default BokCard;
