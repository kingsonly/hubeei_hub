import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";

function Audio({ data }) {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div>
      {isPlaying ? <p>Audio is currently playing.</p> : <p>Audio is not playing.</p>}
      <ReactPlayer
        ref={playerRef}
        url={data.content}  // Replace with the URL of your audio
        controls={true}
        width="70%"
        height="500px"
        onPlay={handlePlay}
        onPause={handlePause}
      />

    </div>
  );
}

export default Audio;