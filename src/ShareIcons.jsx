import React from 'react';
import { EmailIcon, EmailShareButton } from "react-share";
import { WhatsappIcon, WhatsappShareButton } from 'react-share';
import { TwitterIcon, TwitterShareButton } from "react-share";
import { FacebookIcon, FacebookShareButton } from 'react-share';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';




const ShareDialog = ({ close }) => {
    const handleClose = (e) => {
        e.stopPropagation(); // Stop event propagation
        close();
    };

    const handleShareClick = (e) => {
        e.stopPropagation();
    };

    return (

        <div className=" bg-slate-600 share-options share-dialog flex  space-x-4 w-[100%] me-8 rounded " onClick={handleShareClick}>
            <div className='mt-1 ml-1'>
                <WhatsappShareButton url='test.com'>
                    <WhatsappIcon size={30} round={true} />
                </WhatsappShareButton>
            </div>

            <div className='mt-1'>
                <TwitterShareButton url='test.com'>
                    <TwitterIcon size={30} round={true} />
                </TwitterShareButton>
            </div>
            <div className='mt-1'>
                <EmailShareButton url='test.com'>
                    <EmailIcon size={30} round={true} className="custom-email-icon" />
                </EmailShareButton>
            </div>
            <div className='mt-1'>
                <FacebookShareButton url="test.com">
                    <FacebookIcon size={30} round={true} />
                </FacebookShareButton>
            </div>
            <div className='mt-1'>
                <ContentCopyOutlinedIcon style={{ color: 'yellow', fontSize: 30 }} />
            </div>

            <div className='cursor-pointer text-yellow-500 w-[0px] mt-1' onClick={handleClose} >
                <ClearOutlinedIcon sx={{ fontSize: 30 }} />
            </div>

        </div>
    );
};

export default ShareDialog;