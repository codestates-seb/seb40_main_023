import React, { useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";

type formProps = {
  onSubmit: (form: { name: string; password: string }) => void;
};

const userModify = () => {
  const [text, setText] = useState("");

  const handleTextField = (e: any) => {
    setText(e.target.value);
  };
  return (
    <div className="relative max-w-[500px] flex w-full flex-col">
      <h1 className="">회원정보 수정</h1>
      <div className="flex items-center justify-center rounded-full w-36 h-36 bg-primary-400">
        이미지
      </div>
      <div className="absolute top-[100px] left-[120px] flex items-center justify-center w-8 h-8 rounded-full bg-mono-500 hover:cursor-pointer">
        <BsFillPencilFill />
      </div>
      <form>
        <input name="name" onChange={handleTextField} />
      </form>
    </div>
  );
};

export default userModify;
