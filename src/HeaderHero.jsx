import React, { useState } from "react";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Images from "./Images/logo.png";
import { Settings } from "@mui/icons-material";

function HeaderHero(props) {
  const { imageUrl, handleOpen, id, data, settings } = props;
  const [more, setMore] = useState(false);
  const cardStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "100% 100%",
  };
  //   const logoSrc = "./Images/logo.jpg";

  const handleOpenHere = () => {
    handleOpen(1);
  };
  const toggleMore = () => {
    if (more == true) {
      setMore(false);
    } else {
      setMore(true);
    }
  };
  const buttonStyle = {
    boxShadow: "3px 0px 25px 11px #ccc",
  };
  return (
    <div
      className=" bg-no-repeat  w-[100%] h-[90vh] flex items-center z-50"
      style={cardStyle}
    >
      <div className="sm:ml-[200px]   h-[70%] w-[100%]  ">
        <div className="h-[100%] w-[80%] sm:w-[100%]  mx-auto">
          <div className="h-[60%] ">
            <div className="mb-[4%] sm:w-[15%]  h-[40%] relative z-50 ">
              <img src={Images} alt="" className="w-full h-full z-50" />
            </div>
            <div mb-8 className=" w-[50%] h-[50%] relative z-50">
              <div className=" relative z-50">
                <h3 className=" uppercase" style={{ color: settings.category }}>
                  {data.name}
                </h3>
                {/* <p className="truncate">{data.content_description}</p> */}
                <div
                  className=" max-h-[100px]  overflow-auto "
                  style={{ color: settings.content }}
                >
                  <span
                    className="text-pretty  "
                    style={
                      !more
                        ? {
                            color: settings.content,
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            WebkitLineClamp: 2,
                          }
                        : {
                            color: settings.content,
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }
                    }
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between w-[100%] sm:w-[270px] z-50 ">
            <div
              className="flex items-center justify-center h-[50px] cursor-pointer rounded text-[] text-[16px] font-bold w-[100px] h-[50px] cursor-pointer bg-[#DCD427] text-[red]  z-50  "
              style={buttonStyle}
            >
              <div onClick={handleOpenHere}>
                <PlayArrowRoundedIcon className="text-[black]" /> Go
              </div>
            </div>
            <div
              onClick={() => toggleMore()}
              className="flex items-center justify-center h-[50px] cursor-pointer rounded bg-[#fff]/70 text-[#DCD427] text-[16px] font-bold w-[140px] z-50"
              style={buttonStyle}
            >
              <div>
                <InfoOutlinedIcon /> More info
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderHero;
