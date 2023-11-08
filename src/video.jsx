import React from "react";


function Video() {
    return  (
        <div>
          <h1>Display Video in React</h1>
          <video width="640" height="360" controls>
            <source src="/myvideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
}


export default Video