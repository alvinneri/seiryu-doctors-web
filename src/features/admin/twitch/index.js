import React, { useEffect, useState } from "react";
import ReactTwitchEmbedVideo from "react-twitch-embed-video";

const Twitch = () => {
  return (
    <div>
      <ReactTwitchEmbedVideo
        channel="jovian"
        chat={"undefined"}
        layout={"video"}
        width={"100%"}
        autoplay={true}
        height={"650px"}
      />
    </div>
  );
};

export default Twitch;