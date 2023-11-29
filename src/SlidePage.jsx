import React from 'react';
import { CCarouselItem } from '@coreui/react'
import { CCarousel } from '@coreui/react';
import { CImage } from '@coreui/react';
import HeaderHero from './HeaderHero';
import '@coreui/coreui/dist/css/coreui.min.css'

//after:bottom-10 after:h-[300px] after:z-20 after:z-20 after:block  after:-inset-1  after:bg-gradient-to-b after:from-transparent after:to-black after:to-black

function Slide({ handleOpen, data }) {
    
    return (
        <div className='after:absolute after:top-[900px] after:h-[200px] after:z-10  after:block  after:-inset-1  after:bg-gradient-to-b after:from-transparent after:to-transparent
         before:z-10 before:w-[60%] before:bg-gradient-to-r before:from-black before:via-transparent before:to-transparent before:block before:absolute before:-inset-1  '>
            <CCarousel>
                {data?.length > 0 ? (
                    data.map(item => (
                        <CCarouselItem key={item.id}>
                            <HeaderHero imageUrl={`https://api.hubeei.skillzserver.com/public${item.thumbnail}`} handleOpen={handleOpen} data={item} />
                        </CCarouselItem>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </CCarousel>
        </div>
    )
}


export default Slide