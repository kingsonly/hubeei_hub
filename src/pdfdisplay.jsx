import React from "react";

function Pdfdisplay({ data }) {
  return (
    <div>
      <iframe
        title="Embedded PDF"
        src="https://research.google.com/pubs/archive/44678.pdf" // Replace with the URL to your PDF file
        width="100%"
        height="600px"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default Pdfdisplay;
