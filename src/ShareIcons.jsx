import React from 'react';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import CloseIcon from '@mui/icons-material/Close';


const ShareDialog = ({ close }) => {
    const handleClose = (e) => {
        e.stopPropagation(); // Stop event propagation
        close();
    };
    return (
        <div className="share-dialog">
            <div className="share-options">
                <ContentCopyRoundedIcon />
                <FacebookIcon />
                <TwitterIcon />
                <EmailIcon />
                <CloseIcon onClick={(e)=> handleClose(e)} />
                
            </div>
            
        </div>
    );
};

export default ShareDialog;