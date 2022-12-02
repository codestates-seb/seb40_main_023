import React, { useRef } from "react";
import { useQRCode } from "next-qrcode";
import Image from "next/image";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import { notifySuccess, Toast } from "../util/Toast";

const QrModal = ({ shareQr, link }: any) => {
  const { Canvas } = useQRCode();
  const downloadRef = useRef<HTMLInputElement | null>(null);
  const downloadBtn = () => {
    if (!downloadRef.current) {
      return;
    }
    let btn = downloadRef.current;
    domtoimage.toPng(btn).then(blob => {
      saveAs(blob, "BokQrcode.png");
    });
    notifySuccess({ message: "큐알코드 이미지가 저장됐습니다.", icon: "🧑‍💻" });
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50">
      <div className="bg-white w-[356px] h-[356px] absolute top-[50%] left-[50%] rounded-xl -translate-x-2/4 -translate-y-2/4 p-2 z-999 box-border shadow-context">
        <header className="flex justify-end w-full hover:cursor-pointer">
          <Image
            src="/images/ico/ico-modal-close.svg"
            width={30}
            height={30}
            alt="close button"
            onClick={shareQr}
          />
        </header>
        <div>
          <main className="mt-[1.5rem] flex-col mg-flex-center">
            <span ref={downloadRef}>
              <Canvas
                text={link ? link : window.document.location.href}
                options={{
                  level: "M",
                  margin: 3,
                  scale: 4,
                  width: 200,
                  color: {
                    dark: "#111",
                    light: "#fff",
                  },
                }}
              />
            </span>
            <button
              className="my-[1.5rem] rounded-full mg-primary-button"
              onClick={downloadBtn}
            >
              저장
            </button>
          </main>
        </div>
      </div>
      <Toast />
    </div>
  );
};

export default QrModal;
