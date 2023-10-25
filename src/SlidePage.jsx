import React from 'react';
import { CCarouselItem } from '@coreui/react'
import { CCarousel } from '@coreui/react';
import { CImage } from '@coreui/react';
import HeaderHero from './HeaderHero';
import '@coreui/coreui/dist/css/coreui.min.css'



function Slide({ handleOpen }) {
    return (
        <div>
            <div>
                <CCarousel >
                    <CCarouselItem>
                        <HeaderHero imageUrl={require('./Images/couple.jpg')} handleOpen={handleOpen}/>
                    </CCarouselItem>
                    <CCarouselItem>
                        <HeaderHero imageUrl={require('./Images/life.jpg')} handleOpen={handleOpen}/>
                    </CCarouselItem>
                    <CCarouselItem>
                        <HeaderHero imageUrl={require('./Images/Building-4.jpg')} handleOpen={handleOpen}/>
                    </CCarouselItem>
                </CCarousel>


            </div>



        </div>

    )
}


export default Slide