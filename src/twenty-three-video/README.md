# TwentyThreeVideo

## Link to see url parameters

[see twentythree documentation ](https://www.twentythree.com/help/embedding-your-videos)

## Player EventListener

To be able to add listeners to the player in iframe we will normally use [GlueFrame](https://github.com/23/GlueFrame) but we can not make it work when we use remote components

That is why we have made this solution without [GlueFrame](https://github.com/23/GlueFrame)

```
 useEffect(() => {
    window.addEventListener(
      "message",
      function (e) {
        console.log(e);
        if (e.data.includes("player:video:ended")) {
          if (lastVideoInPlaylist) return setVideoId(videoList[0]);
          setVideoId(videoList[videoList.indexOf(videoId) + 1]);
        }
      },
      false
    );

    setTimeout(() => {
      document.getElementById("myAppIframe").contentWindow.postMessage(
        JSON.stringify({
          f: "bind",
          args: ["player:video:ended"],
          cbId: "myCallbackId", // not needed
          triggerQueue: false, // not needed
        }),
        "*"
      );
    }, 1000);
  }, [videoId]);
```

Here is a list of EventListeners

- player:video:play
- player:video:pause
- player:video:end
- player:video:timeupdate

[Found in this repo](https://gist.github.com/steffentchr/3d57fa1a15a25b4c29af)
