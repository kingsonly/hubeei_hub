import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import pdffil from "./Images/cv-templates.pdf";

function Pdfdisplay({ data }) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  // function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
  //   setNumPages(numPages);
  // }

  function onDocumentLoadSuccess(data) {
    if (data && typeof data.numPages === "number") {
      setNumPages(data.numPages);
    } else {
      // Handle potential errors (optional)
      console.error("Invalid data received in onDocumentLoadSuccess");
    }
  }
  return (
    <div>
      {/* <Document file={pdffil} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={1} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p> */}

      <iframe
        type="application/pdf"
        src={`/pdfjs-4.0.379-dist/web/viewer.html?file=https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf`}
        // src={
        //   "https://api.hubeei.skillzserver.com/public/images/application/1710084270.pdf"
        // } // Replace with the URL to your PDF file
        width="100%"
        height="600px"
        allowFullScreen
      />
    </div>
  );
}

export default Pdfdisplay;
