import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";

function Audio({ audioFileUrl }) {
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
        url="https://www.youtube.com/watch?v=7obHF1k7T0c&list=PLoSOlLr0Y36nb0fH8X0tXeRQ_zAAY71sD"  // Replace with the URL of your audio
        controls={true}
        width="100%"
        height="500px" 
        onPlay={handlePlay}
        onPause={handlePause}
      />
     
    </div>
  );
}

export default Audio;