import React, { useState, useEffect } from 'react';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ShareDialog from './ShareIcons';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';




const Cards = ({ title, imageUrl, id, handleClose,
    handleOpen,liked }) => {
    const [shareIcon, setShareIcon] = useState(false);
    const [isLiked, setIsLiked] = useState(liked);

 

    const postUserToServer = async () => {
        const user = localStorage.getItem('user');
        const headers = {
            'user': user,
        };

        try {
            const response = await axios.get('https://api.hubeei.skillzserver.com/api/content/like-un-like/' + id, { headers });
            if (response.data.status == 'success') {
                return true
            }
        } catch (error) {
            console.error('Error posting user to server:', error);
            return false
        }
    };

    const toggleLike = async (e) => {


        e.stopPropagation();

        const data = await postUserToServer()
        if (data) {

            setIsLiked(true);

        }


    };

    const toggleUnLike = async (e) => {


        e.stopPropagation();

        const data = await postUserToServer()
        if (data) {

            setIsLiked(false);

        }


    };

    const cardStyle = {
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: '100% 100%',
    };

    const openShareDialog = (e) => {
        e.stopPropagation();
        setShareIcon(true);

    };

    const closeShareDialog = () => {
        setShareIcon(false);
    };



    const handleCardClick = (e) => {
        e.stopPropagation();
        if (shareIcon) {
            closeShareDialog()
        } else {
            handleOpen(id);
        }
    }


    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };



    return (
        <div className=''>

            <div onClick={handleCardClick} className={`relative h-[200px] bg-no-repeat  border  w-[300px] group cursor-pointer overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:z-10 border-fuchsia-800  border-2 border-blue`} style={cardStyle}>

                <div   >
                    <div className='w-6px h-10px ' >
                        <div className='relative '>
                            <div className='relative top-0 right-0 '>
                                <div className=' w-[82px]'>
                                    Icons
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=' absolute bottom-0 right-0 mb-6 w-6px mr-4'>
                        {!shareIcon ? (
                            <div className='bg-slate-600 w-[100%]  flex flex justify-between rounded-lg '>
                                <div className='ml-1 mt-2 mr-2 mb-2'>
                                    <div className=''>
                                        {
                                            isLiked ? <FavoriteRoundedIcon onClick={(e) => toggleUnLike(e)} style={{ color: 'yellow' }} /> : <FavoriteRoundedIcon onClick={(e) => toggleLike(e)} style={{ color: isLiked ? 'yellow' : 'inherit' }} />
                                        }

                                    </div>
                                </div>

                                <div className='ml-1 mt-2 mr-2 mb-2 rounded-lg '>
                                    <div className='bg-[white] rounded-md '><ShareRoundedIcon onClick={openShareDialog} /></div>
                                </div>
                            </div>
                        ) : (
                            <ShareDialog close={closeShareDialog} />
                        )}
                    </div>
                </div>

            </div>
            <div className='text-[#fff]'>{title}</div>

        </div>
    );
};

export default Cards;