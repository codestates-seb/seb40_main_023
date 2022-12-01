import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BokPreview from "../../components/BokPreview";
import EditModal from "../../components/modals/EditModal";
import { Toast, notifyWarning, notifyError } from "../../components/util/Toast";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user";

const create = () => {
  const [title, setTitle] = useState("");
  const [greeting, setGreeting] = useState("");
  const [bgUrl, setBgUrl] = useState("");
  const [reveal, setReveal] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const userlogin = user.login;
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [isValidState, setIsValidState] = useState("no");

  const handleCheck = () => {
    setReveal(!reveal);
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    isFilledUpForm();
  };

  const onChangeGreeting = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGreeting(e.target.value);
    isFilledUpForm();
  };

  const isFilledUpForm = () => {
    if (title === "" || greeting === "" || bgUrl === "") {
      setIsValidState("no");
    } else {
      if (greeting.length <= 15) {
        setIsValidState("yet");
      } else {
        setIsValidState("ok");
      }
    }
  };

  const toggleModal = (flag: boolean) => {
    setModal(flag);
  };

  const onClickSubmit = () => {
    if (isValidState === "no") {
      if (title === "") {
        notifyError({ message: "제목은 필수입니다.", icon: "📍" });
      } else if (greeting === "") {
        notifyError({
          message: "내 복망고를 찾아오는 친구들에게\n새해 인사를 남겨보세요.",
          icon: "🥹",
        });
      } else if (bgUrl === "") {
        notifyError({
          message: "사진을 넣어 개성있는\n나만의 복망고를 만들어 보세요.",
          icon: "🎨",
        });
      }
    } else if (isValidState === "yet") {
      notifyWarning({
        message: "에이~ 조금만 더 작성해 주세요~",
        icon: "🙏",
      });
      setIsValidState("ok");
    } else {
      console.log(isValidState);
      toggleModal(true);
    }
  };

  useEffect(() => {
    isFilledUpForm();
  }, [bgUrl]);

  useEffect(() => {
    if (!userlogin) router.replace("/");
  }, [userlogin]);

  return (
    <div>
      <Header />
      <main id="scrollTop" className="pt-[58px]">
        <div className="w-full mg-layout">
          <div className="mb-6 text-center mg-layout-row">
            <h1 className="my-6 text-5xl font-HSS">
              새해 <span className="text-primary-normal">복망고</span> 만들기
            </h1>
            <div className="text-xl">
              초간단! 나만의 복망고를 생성해 보세요!
            </div>
          </div>
          <div className="mg-layout-row">
            <div className="py-3 text-base font-medium">
              <span className="mg-required-input">
                복망고 제목을 입력해 주세요.
              </span>
            </div>
            <input
              placeholder="친구들에게 보내는 카드"
              className="w-full mb-3 mg-default-input"
              value={title}
              onChange={e => {
                onChangeTitle(e);
              }}
              maxLength={16}
              size={16}
            />
            <div className="mg-info-normal">
              <i></i>최대 16자까지 입력할 수 있습니다.
            </div>
          </div>
          <div className="mg-layout-row">
            <div className="py-3 text-base font-medium">
              <span className="mg-required-input">
                받는 사람에게 보여질 새해 인사를 입력해 주세요.
              </span>
            </div>
            <textarea
              placeholder="친구들에게 보여질 메세지를 입력해 주세요."
              value={greeting}
              maxLength={626}
              onChange={e => {
                onChangeGreeting(e);
              }}
              rows={3}
              className="mg-default-input mg-default-textarea"
            />
          </div>
          <div className="mg-layout-row">
            <div className="flex flex-row flex-nowrap">
              <div className="flex items-center py-3 mr-4 text-base font-medium">
                <span className="mr-3">미리보기</span>
                <div className="mg-info-normal">
                  <i></i>내 사진을 넣으면 더 멋질 거에요! ✨
                </div>
              </div>
            </div>
            <BokPreview greeting={greeting} edit={true} setBgUrl={setBgUrl} />
            <div className="w-full mt-3 mb-2 mg-checkbox-group">
              <input id="checkIsPublic" type="checkbox" className="hidden" />
              <label htmlFor="checkIsPublic" onClick={handleCheck}>
                <span className="mr-2"></span>내가 만든 복망고를 모두에게
                자랑하기
              </label>
            </div>
            <div className="mg-info-normal">
              <i></i>메인에 게시하고 자랑해 보세요! 추천을 받을 수 있어요. 🤟😎
            </div>
          </div>
          <Link
            href={isValidState === "Ok" ? "/create" : "/create#scrollTop"}
            className={`mg-primary-button w-[230px] mt-6${
              isValidState === "Ok" ? "" : " disabled"
            }`}
            scroll={isValidState === "Ok" ? false : true}
            onClick={onClickSubmit}
          >
            완성!
          </Link>

          {modal && (
            <EditModal
              setModal={toggleModal}
              greeting={greeting}
              title={title}
              bgUrl={bgUrl}
              reveal={reveal}
            />
          )}
        </div>
        <Toast />
      </main>
      <Footer />
    </div>
  );
};

export default create;
