import React, { useState } from "react";
import { EmailIcon, EmailShareButton } from "react-share";
import { WhatsappIcon, WhatsappShareButton } from "react-share";
import { TwitterIcon, TwitterShareButton } from "react-share";
import { FacebookIcon, FacebookShareButton } from "react-share";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

const ShareDialog = ({ close, id }) => {
  const [link, setLink] = useState(window.location.href);
  const handleClose = (e) => {
    e.stopPropagation(); // Stop event propagation
    close();
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
  };

  const copy = async () => {
    const textArea = document.createElement("textarea");
    textArea.value = `${link}?${id}`;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  };

  return (
    <div
      className=" sm:flex-row sm:items-center flex flex-col-reverse overflow-auto   justify-between items-end    w-[100%]  rounded "
      onClick={handleShareClick}
    >
      <div className="">
        <WhatsappShareButton url={`${link}?${id}`}>
          <WhatsappIcon
            className="sm:w-[30px] w-[20px] sm:h-[30px] h-[20px]"
            round={true}
          />
        </WhatsappShareButton>
      </div>

      <div className="">
        <TwitterShareButton url={`${link}?${id}`}>
          <TwitterIcon
            className="sm:w-[30px] w-[20px] sm:h-[30px] h-[20px]"
            round={true}
          />
        </TwitterShareButton>
      </div>
      <div className="">
        <EmailShareButton url={`${link}?${id}`}>
          <EmailIcon
            className="sm:w-[30px] w-[20px] sm:h-[30px] h-[20px]"
            round={true}
          />
        </EmailShareButton>
      </div>
      <div className="">
        <FacebookShareButton url={`${link}?${id}`}>
          <FacebookIcon
            className="sm:w-[30px] w-[20px] sm:h-[30px] h-[20px]"
            round={true}
          />
        </FacebookShareButton>
      </div>
      <div className="" onClick={() => copy()}>
        <ContentCopyOutlinedIcon className="sm:w-[30px] w-[20px] text-yellow-500 sm:h-[30px] h-[20px]" />
      </div>

      <div className="cursor-pointer text-red-500 " onClick={handleClose}>
        <ClearOutlinedIcon className="sm:w-[30px] w-[20px] sm:h-[30px] h-[20px]" />
      </div>
    </div>
  );
};

export default ShareDialog;
