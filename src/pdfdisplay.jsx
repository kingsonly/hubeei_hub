import React from "react";



function Pdfdisplay() {

    return (
        <div>
            <iframe
                title="Embedded PDF"
                src="https://research.google.com/pubs/archive/44678.pdf" // Replace with the URL to your PDF file
                width="90%"
                height="600"
                allowFullScreen
            ></iframe>
        </div>
    )
}



export default  Pdfdisplay