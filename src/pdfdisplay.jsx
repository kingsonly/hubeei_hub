import React, { useState } from "react";
import { Document, Page } from "react-pdf";

function Pdfdisplay({ data }) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  function onDocumentLoadSuccess(numPages) {
    setNumPages(numPages);
  }
  return (
    <div>
      <Document file="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdfhttps://drive.google.com/file/d/0B1HXnM1lBuoqMzVhZjcwNTAtZWI5OS00ZDg3LWEyMzktNzZmYWY2Y2NhNWQx/view?hl=en&resourcekey=0-5DqnTtXPFvySMiWstuAYdA">
        <Page pageNumber={pageNumber} />
      </Document>
      {/* <object
        title="Embedded PDF"
        type="application/pdf"
        data={
          "https://api.hubeei.skillzserver.com/public/images/application/1710084270.pdf"
        } // Replace with the URL to your PDF file
        width="100%"
        height="600px"
        allowFullScreen
      >
        
      </object> */}
    </div>
  );
}

export default Pdfdisplay;
