import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';


function SideIcons() {
    const cardStyle = {
        boxShadow: '3px 0px 25px 11px #000',
      };
    
      const iconSize = "w-8 h-[4rem]";
    
      return (
        <div className="" style={cardStyle}>
          <div className='fixed top-24 left-0 right-0 w-[50px] z-30 bg-[#000]/80 rounded'>
            <div className={iconSize}><HomeIcon className='text-white cursor-pointer ml-2 mt-3' /></div>
            <div className={iconSize}><SearchIcon className='text-white cursor-pointer ml-2 mt-2' /></div>
            <div className={iconSize}><FavoriteBorderIcon className='text-white cursor-pointer ml-2 mt-2' /></div>
            <div className={iconSize}><NotificationsNoneIcon className='text-white cursor-pointer ml-2 mt-2' /></div>
            <div className={iconSize}><AccountCircleIcon className='text-white cursor-pointer ml-2 mt-2' /></div>
            <div className={iconSize}><ExitToAppRoundedIcon className='text-white cursor-pointer ml-2 mt-2' /></div>
          </div>
        </div>
      );
    }
    
    export default SideIcons;