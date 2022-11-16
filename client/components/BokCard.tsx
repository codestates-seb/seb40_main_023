import React, { useState } from "react";
import Image from "next/image";
import User1 from "../public/dummy/user1.png";

const BokCard = ({ data }: any) => {
  return (
    <>
      <div className="relative overflow-hidden mg-default-card hover:scale-105 hover:opacity-80">
        <Image src={User1} alt="user profile picture" />
        <div>이름이름이름</div>
      </div>
      <div className="relative overflow-hidden mg-default-card hover:bg-primary-hover hover:opacity-80 bg-[url(/dummy/user1.png)] flex bg-no-repeat">
        <div className="absolute top-40 left-40">덕담덕담</div>
      </div>
    </>
  );
};

export default BokCard;
