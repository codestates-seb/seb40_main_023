import React from "react";
import Image from "next/image";

const LetterModal = ({ letterModal, setLetterModal, bag, bagList }: any) => {
  const handleModal = () => {
    setLetterModal(!letterModal);
  };
  // const content = `안녕ㅋㅋㅋ 22년 진짜 빨리 지나갔다. 힘든 한 해 였는데, 덕분에 잘 이겨낼 수 있었던 것 같아. 아프지말고 23년도 잘 지내보자! 힘들면 언제든지 얘기해 P.S. 에어팟 갖고와 이자식아ㅋㅋㅋㅋㅋ빠잉`;

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50">
      <div className="w-[356px] h-[503px] absolute top-[50%] left-[50%] bg-[url(/images/content/img-letter.png)] rounded-xl -translate-x-2/4 -translate-y-2/4 p-2 z-999 box-border">
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
        <div className="absolute bottom-10 left-8">
          - {bag.writer}
          {bag.luckBagId} -
        </div>
      </div>
    </div>
  );
};

export default LetterModal;
