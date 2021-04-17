import React, { useEffect, useState } from "react";
import ReactTwitchEmbedVideo from "react-twitch-embed-video";
import { db } from "../../../firebase/config";

const Twitch = () => {
  const [id, setId] = useState("");
  const [twitchChannel, setTwitchChannel] = useState("");

  const getAppSettings = async () => {
    const appSettingRef = db.collection("app_settings");
    const unsubscribe = appSettingRef.onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        setTwitchChannel(doc.data().sabongTwitchChannel);
        setId(doc.id);
      });
    });

    return unsubscribe;
  };

  useEffect(() => {
    getAppSettings();
  }, []);

  return (
    <div>
      <ReactTwitchEmbedVideo
        channel={twitchChannel} // should be dynamic
        chat={"undefined"}
        layout={"video"}
        width={"100%"}
        // height={"auto"}
        height={"250px"}
        autoplay={true}
      />
    </div>
  );
};

export default Twitch;
