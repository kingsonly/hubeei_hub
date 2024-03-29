import React, { useState } from "react";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { Settings } from "@mui/icons-material";

function HeaderHero(props) {
  const { imageUrl, handleOpen, id, data, settings } = props;
  const [more, setMore] = useState(false);
  const [moreText, setMoreText] = useState("More Info");
  const cardStyle = {
    backgroundImage: `url(${imageUrl})`,
  };
  //   const logoSrc = "./Images/logo.jpg";

  const handleOpenHere = () => {
    handleOpen(1);
  };
  const toggleMore = () => {
    if (more == true) {
      setMore(false);
      setMoreText("More Info");
    } else {
      setMore(true);
      setMoreText("Hide Info");
    }
  };
  const buttonStyle = {
    boxShadow: "3px 0px 25px 11px #ccc",
  };
  return (
    <div
      className=" bg-no-repeat lg:bg-[cover] bg-[contain]   w-[100%] h-[90vh] flex  z-50"
      style={cardStyle}
    >
      <div className="md:ml-[100px] lg:ml-[200px] mt-10 lg:mt-4  h-[100%] w-[100%]  ">
        <div className="h-[100%] w-[80%] lg:w-[100%]  lg:mx-auto ">
          <div className="h-[40%] ">
            <div className="lg:mb-[4%] lg:w-[15%]  h-[30%] relative z-50 "></div>
            <div className="w-[100%]  lg:w-[50%] h-[20%] relative z-50  ">
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
                    {data.content_description}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex lg:mt-4 justify-between w-[100%] lg:w-[270px] z-50 ">
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
              <div className="z-[60]">
                <InfoOutlinedIcon /> {moreText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderHero;
