import React from "react";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Images from './Images/logo.jpg';

function HeaderHero(props) {
    const { imageUrl, handleOpen, id, } = props
    const cardStyle = {
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: '100% 100%',
    };
    const logoSrc = './Images/logo.jpg';

    const handleOpenHere = ()=>{
        handleOpen(1)
    }
    const buttonStyle = {
        boxShadow: '3px 0px 25px 11px #ccc',
    };
    return (
        <div className=" bg-no-repeat  w-[100%] h-[90vh] flex items-center " style={cardStyle}>
            <div className="ml-[200px]  h-[70%] w-[100%] mt-[] ">
                <div className="h-[60%] ">
                    <div className="mb-[4%] w-[15%]  h-[40%] ">
                        <img src={Images} alt="" className="w-full h-full"/>
                    </div>
                    <div mb-8>
                        <div className=" ">
                            <h1>Fantasy Football</h1>
                        </div>
                        <div>
                            <h3>Title</h3>
                            <p>Description</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between w-[270px] ">
                    <div className="flex items-center justify-center h-[50px] cursor-pointer rounded text-[#DCD427] text-[16px] font-bold w-[100px] h-[50px] cursor-pointer bg-[#DCD427] text-[red]   " style={buttonStyle} >
                        <div onClick={handleOpenHere}>
                            <PlayArrowRoundedIcon className="text-[black]" /> Go
                        </div>
                    </div>
                    <div className="flex items-center justify-center h-[50px] cursor-pointer rounded bg-[#fff]/70 text-[#DCD427] text-[16px] font-bold w-[140px]" style={buttonStyle}>
                        <div>
                            <InfoOutlinedIcon /> More info
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default HeaderHero;
