import React, { useState } from "react";
import BokPreview from "../../components/BokPreview";
import EditModal from "../../components/Modal/EditModal";

const create = () => {
  const [title, setTitle] = useState("");
  const [greeting, setGreeting] = useState("");
  const [modal, setModal] = useState(false);
  const [bgUrl, setBgUrl] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleGreetingChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGreeting(e.target.value);
  };

  const handleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="w-full h-full mg-layout">
      <h1 className="leading-[47px] text-4xl font-bold">
        새해 <span className="text-[#F6911B]">복망고</span> 만들기
      </h1>
      <div className="mt-4 mb-8">
        초간단! 나만의 복망고 페이지를 생성해 보세요!
      </div>
      <div className="justify-center mg-width-size mg-flex">
        <div className="mg-flex-center">
          <div className="py-3 font-semibold text-s">
            복망고 제목을 입력해 주세요.
          </div>
          <span className="ml-3 text-xs text-danger-normal">
            * 최대 16자까지 입력할 수 있습니다.
          </span>
        </div>
        <input
          placeholder="친구들에게 보내는 카드"
          className="h-10 mb-5 text-sm mg-input"
          value={title}
          onChange={e => {
            handleTitleChange(e);
          }}
          maxLength={16}
          size={16}
        ></input>
        <div className="py-3 font-semibold text-s">
          받는 사람에게 보여질 새해 인사를 입력해 주세요.
        </div>
        <textarea
          placeholder="얘들아! 2023년에도 잘 부탁해~ 정말 고생 많았고, 우리 
오래오래 보자!"
          value={greeting}
          onChange={e => {
            handleGreetingChange(e);
          }}
          className="py-3 text-sm resize-none h-18 mb-7 mg-input"
        />
        <BokPreview greeting={greeting} edit={true} setBgUrl={setBgUrl} />
      </div>
      <button className="mt-8 mg-primary-button" onClick={handleModal}>
        완성!
      </button>
      {modal && (
        <EditModal
          modal={modal}
          setModal={setModal}
          greeting={greeting}
          title={title}
          bgUrl={bgUrl}
        />
      )}
    </div>
  );
};

export default create;
