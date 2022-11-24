import React from "react";
import { useQRCode } from "next-qrcode";
import Image from "next/image";

const QrModal = ({ qrCode, setQrCode }: any) => {
  const { Canvas } = useQRCode();

  const handleModal = () => {
    setQrCode(!qrCode);
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50">
      <div className="bg-white w-[356px] h-[356px] absolute top-[50%] left-[50%] rounded-xl -translate-x-2/4 -translate-y-2/4 p-2 z-999 box-border">
        <header className="flex justify-end w-full hover:cursor-pointer">
          <Image
            src="/images/ico/ico-modal-close.svg"
            width={30}
            height={30}
            alt="close button"
            onClick={handleModal}
          />
        </header>
        <div>
          <main className="mt-[1.5rem] flex-col mg-flex-center">
            <Canvas
              text={"https://github.com/bunlong/next-qrcode"}
              options={{
                level: "M",
                margin: 3,
                scale: 4,
                width: 200,
                color: {
                  dark: "#010599FF",
                  light: "#FFBF60FF",
                },
              }}
            />
            <a download>
              <button className="my-[1.5rem] rounded-full mg-primary-button">
                저장
              </button>
            </a>
          </main>
        </div>
      </div>
    </div>
  );
};

export default QrModal;
