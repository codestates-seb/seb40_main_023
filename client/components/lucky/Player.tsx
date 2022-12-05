import React from "react";
import AudioPlayer from "react-h5-audio-player";

const Player = ({bgmOn}: any) => {
  return (
    <>
      {bgmOn ? (
        <AudioPlayer
          autoPlay={true}
          src="https://drive.google.com/uc?export=download&id=15LBIIpBxK2khB5-Mpn2uDzmjqXzZP2Z1"
          volume={0.3}
          loop={true}
          className="hidden"
        ></AudioPlayer>
      ) : null}
    </>
  );
};

export default Player;
