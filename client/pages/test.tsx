import React, { useState } from "react";
import DefaultModal from "../components/DefaultModal";

const test = () => {
  const [on, setOn] = useState(false);
  const handleModal = () => {
    setOn(!on);
  };
  return (
    <div>
      <button className="bg-black" onClick={handleModal}>
        adadsdadadsdasdasasdas
      </button>
      {on && <DefaultModal />}
    </div>
  );
};

export default test;
