import React, { useState, useEffect } from "react";
import Image from "next/image";
import { LUCKBAG_OPTION } from "../../constants/luckBagOpt";
import { notifyInfo } from "../util/Toast";
import CheckModal from "./CheckModal";
import { LongModalProps } from "../../types/lucky";

const LongModal = ({
  modal,
  setModal,
  completeModal,
  setCompleteModal,
  luckMgId,
  luckMg,
}: LongModalProps) => {
  const [luckContent, setLuckContent] = useState("");
  const [writer, setWriter] = useState("");
  const [money, setMoney] = useState("");
  const [moneyNum, setMoneyNum] = useState(0);
  const [bagType, setBagType] = useState(1);
  const [confirmModal, setConfirmModal] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const data = {
    luckContent: luckContent,
    writer: writer,
    money: moneyNum,
    bagType: bagType,
  };

  useEffect(() => {
    isFilledUpForm();
  }, [luckContent, writer, money]);

  useEffect(() => {
    if (money) {
      setMoneyNum(+money.split(",").join(""));
    }
  }, [money]);

  const isFilledUpForm = () => {
    if (
      luckContent === "" ||
      moneyNum > 10000000 ||
      moneyNum <= 0 ||
      writer === ""
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  const handleModal = () => {
    setModal(!modal);
  };

  const onClickSubmit = () => {
    if (isValid) {
      setConfirmModal(!confirmModal);
    }
  };

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLuckContent(e.target.value);
  };

  const onChangeMoney = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(+e.target.value)) {
      notifyInfo({ message: "숫자만 입력할 수 있어요", icon: "💵" });
      setMoney("");
    } else if (+e.target.value > 10000000) {
      notifyInfo({
        message: "마음은 감사하지만,\n 최대 금액입니다.",
        icon: "💵",
      });
      setMoney("10000000");
    } else {
      setMoney(e.target.value);
    }
  };

  const onBlurMoeny = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(+e.target.value)) {
      notifyInfo({ message: "숫자만 입력할 수 있어요", icon: "💵" });
      setMoney("");
    } else {
      setMoney(Number(money).toLocaleString());
    }
  };

  const onFocusMoney = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMoney(e.currentTarget.value.split(",").join(""));
  };

  const onChangeLuckBag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBagType(Number(e.target.value));
  };

  const handleWriter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWriter(e.target.value);
    isFilledUpForm();
  };

  return (
    <div className="mg-modal-container">
      <div className="overflow-y-auto mg-modal-panel">
        <button
          className="mg-modal-close"
          onClick={handleModal}
          aria-label="모달 닫기"
        ></button>
        <div className="max-w-[440px] mobile:max-w-none w-full">
          <div className="px-2">
            <div className="justify-center mb-6 text-xl mg-modal-title">
              {luckMg?.member.name}님에게 보낼 덕담을 입력해 주세요
            </div>
          </div>
          <div className="px-2">
            <div className="w-full mg-flex-center">
              <div className="mg-modal-title">
                <p className="mr-3 mg-required-input">보내실 덕담</p>
              </div>
            </div>
          </div>
          <div className="px-2 mb-4">
            <textarea
              className="p-3 w-full mg-modal-input h-[220px] resize-none"
              maxLength={188}
              onChange={e => onChangeContent(e)}
              placeholder="덕담을 입력해 주세요. (필수)"
            />
          </div>
          <div className="px-2">
            <div className="w-full mg-flex-center">
              <div className="mg-modal-title">
                <p className="mr-3 mg-required-input">보내는 사람</p>
              </div>
            </div>
          </div>
          <div className="px-2 mb-4">
            <input
              maxLength={15}
              size={15}
              placeholder="15자까지 입력할 수 있어요"
              className="p-3 mg-modal-input"
              value={writer}
              onChange={e => handleWriter(e)}
            />
          </div>
          <div className="px-2">
            <div className="flex-row items-center mg-flex-center">
              <div className="mg-modal-title">
                <p className="mr-3 mg-required-input">세뱃돈</p>
              </div>
              <div className="mb-2 mg-info-normal">
                <i></i>실제 금액이 아닌 마음만 전달해요
              </div>
            </div>
          </div>
          <div className="px-2 mb-4">
            <input
              className="w-full mg-modal-input"
              placeholder="1 ~ 10,000,000 숫자만 입력해 주세요."
              type="text"
              value={money}
              onChange={e => onChangeMoney(e)}
              onFocus={e => onFocusMoney(e)}
              onBlur={e => onBlurMoeny(e)}
            />
          </div>
          <div className="px-2">
            <div className="flex-row items-center mg-flex-center">
              <div className="mg-modal-title">
                <p className="mr-3">주머니 선택</p>
              </div>
              <div className="mb-2 mg-info-normal">
                <i></i>색상은 랜덤으로 적용됩니다.
              </div>
            </div>
          </div>

          <div className="flex-col gap-3 mg-flex-center">
            <form className="w-full gap-6 justify-evenly mg-flex-center">
              {LUCKBAG_OPTION.map(idx => {
                return (
                  <div key={idx} className="w-full mt-3 mb-2 mg-radio-group">
                    <input
                      id={`radioIsPublic${idx}`}
                      type="radio"
                      className="hidden"
                      onChange={e => onChangeLuckBag(e)}
                      name="radioIsPublic"
                      defaultChecked={idx === 1 ? true : false}
                      value={idx}
                    />
                    <label htmlFor={`radioIsPublic${idx}`}>
                      <Image
                        priority={true}
                        src={`/images/content/img-bok${idx}-1.svg`}
                        alt={`luckbag${idx}`}
                        width={65}
                        height={79}
                        className="cursor-pointer h-[74px] mb-4"
                      />
                      <span></span>
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
          <div className="flex justify-around p-2 mt-3">
            <button
              className="rounded-full mg-primary-button"
              onClick={onClickSubmit}
              disabled={isValid ? false : true}
            >
              덕담 보내기
            </button>
          </div>
        </div>
      </div>
      {confirmModal && (
        <CheckModal
          confirmModal={confirmModal}
          setConfirmModal={setConfirmModal}
          Yesbutton="덕담 보내기"
          firstP="덕담은 수정할 수 없습니다."
          secondP="보내시겠어요?"
          create={true}
          data={data}
          setModal={setModal}
          completeModal={completeModal}
          setCompleteModal={setCompleteModal}
          luckMgId={luckMgId}
        />
      )}
    </div>
  );
};

export default LongModal;
