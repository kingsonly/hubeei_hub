import React, { useState, useEffect } from "react";
import { EmailIcon, EmailShareButton } from "react-share";
import { WhatsappIcon, WhatsappShareButton } from "react-share";
import { TwitterIcon, TwitterShareButton } from "react-share";
import { FacebookIcon, FacebookShareButton } from "react-share";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

const ShareDialog = ({ close, id }) => {
  const [link, setLink] = useState(window.location.href);

  useEffect(() => {
    checkLocal();
  }, []);

  const checkLocal = () => {
    let hubUrl = window.location.href.split(".")[0];
    let local = window.location.href.split(".")[1].split(":")[0];
    if (local == "localhost") {
      setLink(`${hubUrl}.${window.location.href.split(".")[1].split("?")[0]}`);
    } else {
      setLink(`${hubUrl}.${process.env.REACT_APP_SHARE_LINK}`);
    }
    console.log("i am local ", local);
  };
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
      className=" lg:flex-row lg:items-center flex flex-col-reverse md:flex-row overflow-auto   justify-between items-end    w-[100%]  rounded "
      onClick={handleShareClick}
    >
      <div className="">
        <WhatsappShareButton url={`${link}?${id}`}>
          <WhatsappIcon
            className="lg:w-[30px] w-[20px] lg:h-[30px] h-[20px]"
            round={true}
          />
        </WhatsappShareButton>
      </div>

      <div className="">
        <TwitterShareButton url={`${link}?${id}`}>
          <TwitterIcon
            className="lg:w-[30px] w-[20px] lg:h-[30px] h-[20px]"
            round={true}
          />
        </TwitterShareButton>
      </div>
      <div className="">
        <EmailShareButton url={`${link}?${id}`}>
          <EmailIcon
            className="lg:w-[30px] w-[20px] lg:h-[30px] h-[20px]"
            round={true}
          />
        </EmailShareButton>
      </div>
      <div className="">
        <FacebookShareButton url={`${link}?${id}`}>
          <FacebookIcon
            className="lg:w-[30px] w-[20px] lg:h-[30px] h-[20px]"
            round={true}
          />
        </FacebookShareButton>
      </div>
      <div className="" onClick={() => copy()}>
        <ContentCopyOutlinedIcon className="lg:w-[30px] w-[20px] text-yellow-500 lg:h-[30px] h-[20px]" />
      </div>

      <div className="cursor-pointer text-red-500 " onClick={handleClose}>
        <ClearOutlinedIcon className="lg:w-[30px] w-[20px] lg:h-[30px] h-[20px]" />
      </div>
    </div>
  );
};

export default ShareDialog;
