import React, { useEffect, useState } from "react";
import ReactTwitchEmbedVideo from "react-twitch-embed-video";

const Twitch = () => {
  return (
    <div>
      <ReactTwitchEmbedVideo
        channel="TapL" // should be dynamic
        chat={"undefined"}
        layout={"video"}
        width={"100%"}
        autoplay={true}
      />
    </div>
  );
};

export default Twitch;
