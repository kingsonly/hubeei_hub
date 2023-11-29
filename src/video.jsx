import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";

function Video({ data }) {
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
       {isPlaying ? <p>Video is currently playing.</p> : <p>video is not playing.</p>}
      <ReactPlayer
        ref={playerRef}
        url={data.content}  // Replace with the URL of your Video
        controls={true}
        width="100%"
        height="500px" 
        onPlay={handlePlay}
        onPause={handlePause}
      />
     
    </div>
  );
}

export default Video;