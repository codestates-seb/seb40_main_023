import React, { useRef, useState } from "react";
import Image from "next/image";
import { LUCKBAG_OPTION } from "../../constants/luckBagOpt";
import { createBag } from "../../fetch/lucky";
import DefaultModal from "./DefaultModal";

const LongModal = ({ modal, setModal }: any) => {
  const [luckContent, setLuckContent] = useState("");
  const [writer, setWriter] = useState("");
  const [money, setMoney] = useState(0);
  const [bagType, setBagType] = useState(1);
  const [confirmModal, setConfirmModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };

  const handleConModal = () => {
    setConfirmModal(!confirmModal);
  };

  const handleMoney = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMoney(Number(e.target.value));
  };

  const handleLuckContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLuckContent(e.target.value);
  };

  const handleLuckBag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBagType(Number(e.target.value));
  };

  const handleWriter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWriter(e.target.value);
  };

  const createLuckBag = async () => {
    const res = await createBag("/api/luckBag", {
      luckMangoId: 2,
      body: luckContent,
      writer: writer,
      bagStyle: bagType,
      bagColor: 2,
      NYMoney: money,
    });
    console.log(res);
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 bg-mono-400 ">
      <div className="w-[356px] h-[756px] absolute top-[50%] left-[50%] bg-white border rounded-xl -translate-x-2/4 -translate-y-2/4 p-2 z-999 box-border">
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
            <div className="mg-modal-title">
              홍다희님에게 보낼 덕담을 입력해 주세요
            </div>
            <textarea
              className="p-3 mg-modal-input h-[226px] resize-none"
              maxLength={188}
              onChange={e => handleLuckContent(e)}
            />
            <div className="mg-modal-title">보내는 사람</div>
            <input
              maxLength={15}
              size={15}
              placeholder="15자까지 입력할 수 있어요"
              className="p-3 mg-modal-input"
              value={writer}
              onChange={e => handleWriter(e)}
            />
            <div className="mg-flex-center w-[303px]">
              <div className="flex-1 mg-modal-title">세뱃돈</div>
              <div className="text-xs pr-14 flex-2 text-secondary-hover">
                실제 금액이 아닌 마음만 전달해요
              </div>
            </div>
            <input
              className=" mg-modal-input"
              placeholder="1원 ~ 100,000원"
              type="number"
              min={1}
              max={100000}
              maxLength={6}
              size={6}
              onChange={e => handleMoney(e)}
            />
            <div className="mg-flex-center w-[303px]">
              <div className="flex-1 mg-modal-title">주머니 선택</div>
              <div className="pr-20 text-xs text-danger-normal flex-2">
                * 색상은 랜덤으로 적용돼요
              </div>
            </div>
            <form className="w-full gap-6 justify-evenly mg-flex-center">
              {LUCKBAG_OPTION.map(el => {
                return (
                  <label
                    key={el}
                    className="flex-col justify-center gap-2 mg-flex-center"
                  >
                    <Image
                      priority={true}
                      src={`/images/content/img-bok${el}-1.svg`}
                      alt="luckbag"
                      width={65}
                      height={79}
                      className="cursor-pointer h-[74px]"
                    />
                    <input
                      name="luckbag"
                      type="radio"
                      value={el}
                      onChange={e => handleLuckBag(e)}
                    />
                  </label>
                );
              })}
            </form>
          </main>
          <div className="flex justify-around p-2 mt-3">
            <button
              className="rounded-full mg-primary-button"
              onClick={handleConModal}
            >
              덕담 보내기
            </button>
          </div>
        </div>
      </div>
      {confirmModal && (
        <DefaultModal
          title="덕담은 수정할 수 없습니다."
          contents="보내시겠어요?"
          Yesbutton="덕담 보내기"
        />
      )}
    </div>
  );
};

export default LongModal;
