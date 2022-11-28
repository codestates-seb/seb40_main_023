import React from "react";
import Image from "next/image";

const LuckBags = ({ letterModal, setLetterModal, setLuckyBagId }: any) => {
  const handleLetterModal = () => {
    setLetterModal(!letterModal);
  };
  return (
    <>
      <div
        onClick={() => handleLetterModal()}
        className={`bg-[url(/images/content/img-bok2-4.svg)] cursor-pointer absolute top-[-10px] left-12 w-[65px] h-[80px] bg-no-repeat bg-contain`}
      />
      <div
        onClick={handleLetterModal}
        className={`bg-[url(/images/content/img-bok2-3.svg)] cursor-pointer absolute top-[-30px] left-32 w-[65px] h-[80px] bg-no-repeat bg-contain`}
      />
      <div
        onClick={handleLetterModal}
        className={`bg-[url(/images/content/img-bok2-2.svg)] cursor-pointer absolute top-6 left-24 w-[65px] h-[80px] bg-no-repeat bg-contain`}
      />
      <div
        onClick={handleLetterModal}
        className={`bg-[url(/images/content/img-bok2-1.svg)] cursor-pointer absolute top-[-25px] right-28 w-[65px] h-[80px] bg-no-repeat bg-contain`}
      />
      <div
        onClick={handleLetterModal}
        className={`bg-[url(/images/content/img-bok1-3.svg)] cursor-pointer absolute top-[16px] right-40 w-[65px] h-[80px] bg-no-repeat bg-contain`}
      />
      <div
        onClick={handleLetterModal}
        className={`bg-[url(/images/content/img-bok1-2.svg)] cursor-pointer absolute top-[-20px] right-12 w-[65px] h-[80px] bg-no-repeat bg-contain`}
      />
      <div
        onClick={handleLetterModal}
        className={`bg-[url(/images/content/img-bok3-1.svg)] cursor-pointer absolute top-5 right-20 w-[65px] h-[80px] bg-no-repeat bg-contain`}
      />
    </>
  );
};

export default LuckBags;

// img: "img-bok2-3",
// yPos: "top-[16px]",
// xPos: "right-40",
// },
// {
// img: "img-bok2-5",
// yPos: "top-[-20px]",
// xPos: "right-12",
// },
// {
// img: "img-bok1-1",
// yPos: "top-5",
// xPos: "right-20",
// },
// ];
