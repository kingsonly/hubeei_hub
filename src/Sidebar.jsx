import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import Modal from '@mui/material/Modal';
import { Box, Input, IconButton, } from '@mui/material';


function SideIcons({handleSearch}) {
  const [searchIcon, setSearchIcon] = useState(false);
  const [searchItem, setSearchItem] = useState('');

  const handleSearchIcon = () => {
    setSearchIcon(!searchIcon);
  };

  const onHandleSearch = async () => {
    handleSearch(searchItem)
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onHandleSearch();
    }
  };

  const iconSize = "w-8 h-[4rem]";

  return (
    <div className="" >
      <div className=' w-[50px] z-30 bg-[#000]/80 rounded'>
        <div className={iconSize}><HomeIcon className='text-white cursor-pointer ml-2 mt-3' /></div>
        <div className={iconSize}><SearchIcon
          className={`text-white cursor-pointer ml-2 mt-2 ${searchIcon ? 'active' : ''}`}
          onClick={handleSearchIcon}
        /></div>
        <div className={iconSize}><FavoriteBorderIcon className='text-white cursor-pointer ml-2 mt-2' /></div>
        <div className={iconSize}><AccountCircleIcon className='text-white cursor-pointer ml-2 mt-2' /></div>
        <div className={iconSize}><ExitToAppRoundedIcon className='text-white cursor-pointer ml-2 mt-2' /></div>

        <Modal
          open={searchIcon}
          onClose={handleSearchIcon}
          aria-labelledby="search-modal"
          aria-describedby="search-modal-description"
          className="m-[15%]"
        >
          <Box className="search-bar p-4 mx-auto rounded-lg" style={{ width: '800px', height: '60px' }}>
            <div className="flex items-center">
              <Input
                type="text"
                placeholder="Search..."
                fullWidth
                autoFocus
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                onKeyPress={handleKeyPress}
                sx={{
                  backgroundColor: '#f0f0f0',
                  boxShadow: ' ',
                  borderRadius: '20px 0 0 20px', // Rounded corners on the left
                  border: '2px solid yellow',
                  height: '100%',
                  width: 'calc(70% - 40px)', // Adjusted width to leave space for the button
                  marginRight: '0',
                }}
              />
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default SideIcons;