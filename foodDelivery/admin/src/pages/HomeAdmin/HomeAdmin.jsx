import React from "react";
import video from "../../assets/video/video.mp4";

const HomeAdmin = () => {
  return (
    <div>
      <h1>PLATED</h1>
      <video
        src={video}
        muted
        autoPlay
        loop
        type="video/mp4"
        width="800"
        height="450"
      ></video>
    </div>
  );
};

export default HomeAdmin;
