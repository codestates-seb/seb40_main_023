import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BokPreview from "../../components/BokPreview";
import EditModal from "../../components/modals/EditModal";
import { Toast, notifyWarning, notifyError } from "../../components/util/Toast";
import { useFetch } from "../../fetch/useFetch";
import { useRecoilState } from "recoil";
import { memberIdState } from "../../recoil/memberId";
import { luckMgIdState } from "../../recoil/luckMgId";
import { useCookies } from "react-cookie";
import { userState } from "../../recoil/user";
import NotFound from "../404";

const Edit = () => {
  const [title, setTitle] = useState<string>("");
  const [greeting, setGreeting] = useState<string>("");
  const [bgUrl, setBgUrl] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [reveal, setReveal] = useState<boolean>(false);
  const [isValid, setIsValid] = useState("no");
  const [luckId, setLuckId] = useState<number>(0);
  const [luckMId, setLuckMId] = useState();
  const [existPage, setExistPage] = useState<boolean>(true);
  const [errorContent, setErrorContent] = useState<string>("");
  const [luckMgId, setLuckMgId] = useRecoilState<number>(luckMgIdState);
  const [cookies] = useCookies(["accessJwtToken"]);
  const [memberId, setMemberId] = useRecoilState(memberIdState);
  const [user, setUser] = useRecoilState(userState);
  const userlogin = user.login;
  const router = useRouter();

  const handleCheck = () => {
    setReveal(!reveal);
  };

  useEffect(() => {
    isFilledUpForm();
  }, [title, greeting, bgUrl]);

  const isFilledUpForm = () => {
    if (title === "" || greeting === "" || bgUrl === "") {
      setIsValid("no");
    } else if (greeting.length <= 15) {
      setIsValid("yet");
    } else {
      setIsValid("ok");
    }
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeGreeting = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGreeting(e.target.value);
  };

  const toggleModal = (flag: boolean) => {
    setModal(flag);
  };

  const onClickSubmit = () => {
    if (isValid === "no") {
      if (title === "") {
        notifyError({ message: "????????? ???????????????.", icon: "????" });
      } else if (greeting === "") {
        notifyError({
          message: "??? ???????????? ???????????? ???????????????\n?????? ????????? ???????????????.",
          icon: "????",
        });
      } else if (bgUrl === "") {
        notifyError({
          message: "????????? ?????? ????????????\n????????? ???????????? ????????? ?????????.",
          icon: "????",
        });
      }
    } else if (isValid === "yet") {
      notifyWarning({
        message: "??????~ ????????? ??? ????????? ?????????~",
        icon: "????",
      });
      setIsValid("ok");
    } else {
      toggleModal(true);
    }
  };

  const getLuckyMango = async (luckMangoId: number) => {
    const res = await useFetch(`/api/luckMango/${luckMangoId}`);
    if (res.status === 404) {
      setExistPage(false);
      setErrorContent("???????????? ???????????? ?????? ??? ?????????");
    } else if (res.data) {
      setExistPage(true);
      setTitle(res.data.title);
      setGreeting(res.data.mangoBody);
      setReveal(res.data.reveal);
      setLuckMId(res.data.member?.memberId);
      setLuckMgId(res.data.luckMangoId);
      setBgUrl(res.data.bgImage);
    }
  };

  const checkLogin = () => {
    const token = cookies.accessJwtToken;
    if (token === undefined || token === "") {
      setUser({ login: false });
      setMemberId({ memberId: 0 });
      localStorage.removeItem("recoil-persist");
      router.push("/");
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    const { luckMangoId } = router.query;
    getLuckyMango(Number(luckMangoId));
    setLuckId(Number(luckMangoId));
  }, [router.isReady]);

  useEffect(() => {
    if (memberId.memberId !== luckMId && luckMId) {
      setExistPage(false);
      setErrorContent("????????? ??? ?????? ???????????????");
    }
  }, [luckMId]);

  useEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (!userlogin) router.replace("/");
  }, [userlogin]);

  return (
    <div>
      <Header />
      <main id="scrollTop" className="pt-[58px]">
        {existPage ? (
          <div className="w-full mg-layout">
            <div className="mb-6 text-center mg-layout-row">
              <h1 className="my-6 text-5xl font-HSS">
                ?????? <span className="text-primary-normal">?????????</span> ?????????
              </h1>
            </div>
            <div className="mg-layout-row">
              <div className="py-3 text-base font-medium">
                <span className="mg-required-input">
                  ????????? ????????? ????????? ?????????.
                </span>
              </div>
              <input
                placeholder="??????????????? ????????? ??????"
                className="w-full mb-3 mg-default-input"
                value={title}
                onChange={e => onChangeTitle(e)}
                maxLength={16}
                size={16}
              />
              <div className="mg-info-normal">
                <i></i>?????? 16????????? ????????? ??? ????????????.
              </div>
            </div>
            <div className="mg-layout-row">
              <div className="py-3 text-base font-medium">
                <span className="mg-required-input">
                  ?????? ???????????? ????????? ?????? ????????? ????????? ?????????.
                </span>
              </div>
              <textarea
                placeholder="??????????????? ????????? ???????????? ????????? ?????????."
                value={greeting}
                maxLength={626}
                onChange={e => onChangeGreeting(e)}
                rows={3}
                className="mg-default-input mg-default-textarea"
              />
            </div>
            <div className="mg-layout-row">
              <div className="flex flex-row flex-nowrap">
                <div className="flex items-center py-3 mr-4 text-base font-medium">
                  <span className="mr-3">????????????</span>
                  <div className="mg-info-normal">
                    <i></i>??? ????????? ????????? ??? ?????? ?????????! ???
                  </div>
                </div>
              </div>
              <BokPreview
                edit={true}
                bgUrl={bgUrl}
                setBgUrl={setBgUrl}
                greeting={greeting}
              />
              <div className="w-full mt-3 mb-2 mg-checkbox-group">
                <input
                  id="checkIsPublic"
                  type="checkbox"
                  className="hidden"
                  checked={reveal}
                />
                <label htmlFor="checkIsPublic" onClick={handleCheck}>
                  <span className="mr-2"></span>?????? ?????? ???????????? ????????????
                  ????????????
                </label>
              </div>
              <div className="mg-info-normal">
                <i></i>????????? ???????????? ????????? ?????????! ????????? ?????? ??? ?????????.
                ????????
              </div>
            </div>
            <Link
              href={isValid === "ok" ? "#" : "/create#scrollTop"}
              className={`mg-primary-button w-[230px] mt-6${
                isValid !== "no" ? "" : " disabled"
              }`}
              scroll={isValid === "ok" ? false : true}
              onClick={onClickSubmit}
            >
              ??????!
            </Link>
          </div>
        ) : (
          <NotFound message={errorContent} />
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
            reveal={reveal}
          />
        )}

        <Toast />
      </main>
      <Footer />
    </div>
  );
};

export default Edit;
