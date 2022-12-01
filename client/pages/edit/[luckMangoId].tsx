import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BokPreview from "../../components/BokPreview";
import EditModal from "../../components/modals/EditModal";
import { Toast } from "../../components/util/Toast";
import { useFetch } from "../../fetch/useFetch";
import { useRecoilValue } from "recoil";
import { memberIdState } from "../../recoil/memberId";
import NotFound from "../404";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [greeting, setGreeting] = useState("");
  const [modal, setModal] = useState(false);
  const [bgUrl, setBgUrl] = useState("");
  const [reveal, setReveal] = useState(false);
  const [luckId, setLuckId] = useState(0);
  const [luckMId, setLuckMId] = useState();
  const [existPage, setExistPage] = useState(true);
  const memberId = useRecoilValue(memberIdState);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleGreetingChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGreeting(e.target.value);
  };

  const handleModal = () => {
    setModal(!modal);
  };

  const handleCheck = () => {
    setReveal(!reveal);
    console.log(reveal);
  };

  const getLuckyMango = async (luckMangoId: number) => {
    const res = await useFetch(`/api/luckMango/${luckMangoId}`);
    if (res.status === 404) {
      setExistPage(false);
    } else if (res.data) {
      setExistPage(true);
      setTitle(res.data.title);
      setGreeting(res.data.mangoBody);
      setReveal(res.data.reveal);
      setLuckMId(res.data.member?.memberId);
    }
  };

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const { luckMangoId } = router.query;
    getLuckyMango(Number(luckMangoId));
    setLuckId(Number(luckMangoId));
  }, [router.isReady]);

  useEffect(() => {
    if (memberId !== luckMId && luckMId) {
      setExistPage(false);
    }
  }, [luckMId]);

  return (
    <div className="w-full h-full mg-layout">
      {existPage ? (
        <>
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
              maxLength={626}
              onChange={e => {
                handleGreetingChange(e);
              }}
              className="py-3 text-sm resize-none h-18 mb-7 mg-input"
            />
            <BokPreview greeting={greeting} edit={true} setBgUrl={setBgUrl} />
          </div>
          <label className="mt-5 mg-flex-center mg-width-size">
            <input
              type="checkbox"
              className="mx-2 font-medium"
              checked={reveal ? true : false}
              onClick={handleCheck}
            />
            <div>내가 만든 복망고를 모두에게 자랑하기</div>
          </label>
          <button className="mt-8 mg-primary-button" onClick={handleModal}>
            완성!
          </button>
        </>
      ) : (
        <NotFound />
      )}
      {modal && (
        <EditModal
          modal={modal}
          setModal={setModal}
          greeting={greeting}
          title={title}
          bgUrl={bgUrl}
          editMode={true}
          luckId={luckId}
        />
      )}
      <Toast />
    </div>
  );
};

export default Edit;
