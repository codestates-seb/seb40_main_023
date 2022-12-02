import React, { useEffect } from "react";
import Image from "next/image";

const LetterModal = ({
  letterModal,
  setLetterModal,
  bag,
  setBag,
  bagList,
  luckyBagId,
}: any) => {
  useEffect(() => {
    if (bagList) {
      setBag(bagList.filter((el: any) => el.luckBagId === luckyBagId)[0]);
    }
  }, [bagList, luckyBagId]);

  const handleModal = () => {
    setLetterModal(!letterModal);
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 bg-black/10">
      <div className="w-[356px] h-[503px] absolute top-[50%] left-[50%] bg-[url(/images/content/img-letter.png)] rounded-xl -translate-x-2/4 -translate-y-2/4 p-2 z-999 box-border shadow-context">
        <header className="flex justify-end w-full hover:cursor-pointer">
          <Image
            src="/images/ico/ico-modal-close.svg"
            width={30}
            height={30}
            alt="close button"
            onClick={handleModal}
          />
        </header>
        <div className="m-auto">
          <main className="flex-col gap-3 mg-flex-center">
            <div className="w-full leading-[2.28rem] px-[1.5rem] mt-[90px] overflow-hidden break-words">
              {bag.luckBagBody}
            </div>
          </main>
        </div>
        <div className="absolute bottom-10 left-8">- {bag.writer} -</div>
      </div>
    </div>
  );
};

export default LetterModal;
