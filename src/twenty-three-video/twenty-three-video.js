import React, { useEffect, useState } from "react";
import { ThemeStyles } from "../slide-util";
import GlobalStyles from "../GlobalStyles";

/**
 * TwentyThreeVideo component.
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {boolean} props.run Whether or not the slide should start running.
 * @param {Function} props.slideDone Function to invoke when the slide is done playing.
 * @returns {object} The component.
 */
function TwentyThreeVideo({ slide, content = {}, run, slideDone }) {
  console.log("🚀 ~ file: twenty-three-video.js ~ line 16 ~ TwentyThreeVideo ~ content", content)
  console.log("🚀 ~ file: twenty-three-video.js ~ line 16 ~ TwentyThreeVideo ~ slide", slide)
  // Content from content
  const { videoList = "" } = content;

  // This fix normal typing errors and cleans the array for empty items
  const formattedVideoList = videoList
    .replaceAll(".", ",")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [videoId, setVideoId] = useState(formattedVideoList[currentVideoIndex]);

  function videoEndedEvent(e) {
    // EventListener function for player:video:ended message
    if (e.data.includes("player:video:ended")) {
      console.log("player:video:ended");
      // check if there is a next video id in formatted Video List
      if (formattedVideoList[currentVideoIndex + 1] === undefined) {
        slideDone(slide)
        return
      }
      setCurrentVideoIndex(currentVideoIndex + 1)
    }
  }

  useEffect(() => {
    window.addEventListener(
      "message",
      videoEndedEvent,
      false
    );

    // This activate player:video:ended message
    setTimeout(() => {
      document.getElementById("myAppIframe")?.contentWindow.postMessage(
        JSON.stringify({
          f: "bind",
          args: ["player:video:ended"],
        }),
        "*"
      );
    }, 1000);

    return function cleanup() {
      window.removeEventListener("message", videoEndedEvent);
    };
  }, [videoId]);



  useEffect(() => {
    setVideoId(
      formattedVideoList[currentVideoIndex]
    );
  }, [currentVideoIndex])


  // ADMIN stuff start here
  const rootClasses = ["template-twenty-three-video"];

  // Styling objects
  const rootStyle = {};

  const Video23 = ({ videoId }) => {
    if (!videoId) return <div className="">No ID</div>;
    return (
      <iframe
        id="myAppIframe"
        src={`https://video.kk.dk/v.ihtml/player.html?source=site&photo%5fid=${videoId}&showDescriptions=0&autoPlay=1&hideBigPlay=1&showLogo=0&socialSharing=0showBrowse=0&showTray=1`}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        frameBorder={0}
        border={0}
        scrolling="no"
        mozallowfullscreen={1}
        webkitallowfullscreen={1}
        allowFullScreen={1}
        allow="autoplay; fullscreen"
      />
    );
  };

  return (
    <>
      <div className={rootClasses.join(" ")} style={rootStyle}>
        <Video23 videoId={videoId} />
      </div>
      <ThemeStyles
        name="template-twenty-three-video"
        css={slide?.themeData?.css}
      />
      <GlobalStyles />
    </>
  );
}

export default TwentyThreeVideo;
