import React from "react";

const LuckBags = ({
  currPage,
  setCurrPage,
  pageInfo,
  luckyBagList,
  handleLetterModal,
}: any) => {
  const onClickPage = (e: any) => {
    const role = e.target.dataset.role;
    if (role === "prev") {
      setCurrPage((prevPage: number) => prevPage - 1);
    } else if (role === "next") {
      setCurrPage((prevPage: number) => prevPage + 1);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full">
      <div className="mg-luckybag-wrapper">
        {!luckyBagList.length ? (
          <div className="mb-4 text-center">
            <p>받으신 덕담이 없습니다. 😔</p>
            <p>친구들에게 공유해 볼까요?</p>
          </div>
        ) : (
          luckyBagList.map((luckyBag: any, idx: number) => (
            <button
              key={luckyBag.luckBagId}
              data-index={luckyBag.luckBagId}
              data-type={luckyBag.bagStyle}
              data-color={luckyBag.bagColor}
              onClick={e =>
                handleLetterModal(
                  luckyBag.luckBagId,
                  luckyBag.bagStyle,
                  luckyBag.bagColor,
                )
              }
              className={`${luckyBag.viewed ? "" : "active"}`}
            />
          ))
        )}
      </div>
      <div className="mg-flex-center justify-center bottom-0 z-10 absolute rounded-full min-w-[14px] bg-[#0000004D] px-3 py-1 text-white">
        <div className="text-center">
          {currPage} /{" "}
          {pageInfo.totalElements === 0
            ? pageInfo.totalPages + 1
            : pageInfo.totalPages}
        </div>
      </div>
      {pageInfo.totalElements !== 0 && (
        <div className="absolute w-full h-full">
          <>
            <button
              className="scale-[-1] left-3 top-16 z-10 absolute mg-background bg-[url(/images/ico/ico-banner-arrow.svg)] rounded-full bg-[#0000004D] w-[34px] h-[34px]"
              onClick={onClickPage}
              data-role="prev"
              disabled={currPage === 1 || currPage === 0 ? true : false}
            ></button>
            <button
              className={
                "right-3 top-16 z-10 absolute mg-background bg-[url(/images/ico/ico-banner-arrow.svg)] rounded-full bg-[#0000004D] w-[34px] h-[34px]"
              }
              onClick={onClickPage}
              data-role="next"
              disabled={currPage === pageInfo.totalPages ? true : false}
            ></button>
          </>
        </div>
      )}
    </div>
  );
};

export default LuckBags;
