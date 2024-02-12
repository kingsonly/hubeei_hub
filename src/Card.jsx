import React, { useState, useEffect } from "react";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ShareDialog from "./ShareIcons";
import axios from "axios";
import RankIcon from "./RankIcon";
import { Typography } from "@mui/material";
import logo from "./Images/logo_small.png";
const Cards = ({
  title,
  imageUrl,
  id,
  handleClose,
  handleOpen,
  liked,
  type = false,
  Rank,
  settings,
}) => {
  const [shareIcon, setShareIcon] = useState(false);
  const [isLiked, setIsLiked] = useState(liked);

  const postUserToServer = async () => {
    const user = localStorage.getItem("user");
    const headers = {
      user: user,
    };

    try {
      const response = await axios.get(
        "https://api.hubeei.skillzserver.com/api/content/like-un-like/" + id,
        { headers }
      );
      if (response.data.status === "success") {
        return true;
      }
    } catch (error) {
      console.error("Error posting user to server:", error);
      return false;
    }
  };

  const toggleLike = async (e) => {
    e.stopPropagation();
    setIsLiked(true);
    await postUserToServer();
  };

  const toggleUnLike = async (e) => {
    e.stopPropagation();
    setIsLiked(false);
    await postUserToServer();
  };

  const cardStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "100% 100%",
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
      closeShareDialog();
    } else {
      handleOpen(id);
    }
  };

  return (
    <div className="w-[100%] z-40">
      {type ? (
        <div className="flex   sm:w-[350px] mb-4 h-[100%] w-[150px]">
          <div className="sm:w-[50%] h-[40%]">
            <RankIcon
              className="w-[80px] h-[100px] sm:w-[200px] sm:h-[200px] "
              Rank={Rank}
              width="60px"
              height="100px"
            />
          </div>
          <div className="sm:w-[50%]">
            <div
              onClick={handleCardClick}
              className={`relative h-[100%] bg-no-repeat group cursor-pointer overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:z-10  mb-2 ml-0`}
              style={cardStyle}
            >
              <div>
                <div className=" h-10px">
                  <div className="relative">
                    <div className="relative top-0 right-0">
                      <div className="w-[82px]">
                        <img src={logo} className="sm:w-[20px] w-[10px]" />
                      </div>
                    </div>
                  </div>
                </div>
                {!shareIcon ? (
                  <div className="px-2 rounded-lg flex items-center justify-center absolute bg-slate-600 h-[40px] bottom-0 right-0 sm:mb-6 w-[90%] sm:mr-4 sm:w-[80px]">
                    <div className=" w-[100%]  flex justify-between  ">
                      <div className="">
                        <div className="">
                          {isLiked ? (
                            <FavoriteRoundedIcon
                              onClick={(e) => toggleUnLike(e)}
                              style={{ color: "yellow" }}
                            />
                          ) : (
                            <FavoriteRoundedIcon
                              onClick={(e) => toggleLike(e)}
                              style={{ color: isLiked ? "yellow" : "inherit" }}
                            />
                          )}
                        </div>
                      </div>

                      <div className="  ">
                        <div className="bg-[white] rounded-md ">
                          <ShareRoundedIcon onClick={openShareDialog} />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                {shareIcon ? (
                  <div className="px-2 rounded-lg flex items-center justify-center absolute h-[40px] bottom-0 right-0 sm:mb-6 w-[100%]  ">
                    <ShareDialog close={closeShareDialog} id={id} />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <div
              onClick={handleCardClick}
              className={`sm:h-[200px] sm:w-[300px] w-[150px] h-[100px]  relative  bg-no-repeat  border  group cursor-pointer overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:z-10 border-fuchsia-800  border-2 border-blue mb-2`}
              style={cardStyle}
            >
              <div>
                <div className="w-6px h-10px">
                  <div className="relative">
                    <div className="relative top-0 right-0">
                      <div className="w-[82px]">
                        <img src={logo} className="sm:w-[20px] w-[10px]" />
                      </div>
                    </div>
                  </div>
                </div>
                {!shareIcon ? (
                  <div className="px-2 rounded-lg flex items-center justify-center absolute bg-slate-600 h-[40px] bottom-0 right-0 sm:mb-6 w-[50%] sm:mr-4 sm:w-[80px]">
                    <div className=" w-[100%]  flex justify-between  ">
                      <div className="">
                        <div className="">
                          {isLiked ? (
                            <FavoriteRoundedIcon
                              onClick={(e) => toggleUnLike(e)}
                              style={{ color: "yellow" }}
                            />
                          ) : (
                            <FavoriteRoundedIcon
                              onClick={(e) => toggleLike(e)}
                              style={{ color: isLiked ? "yellow" : "inherit" }}
                            />
                          )}
                        </div>
                      </div>

                      <div className="  ">
                        <div className="bg-[white] rounded-md ">
                          <ShareRoundedIcon onClick={openShareDialog} />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                {shareIcon ? (
                  <div className="px-2 rounded-lg flex items-center justify-center absolute h-[40px] bottom-0 right-0 sm:mb-6 w-[100%]  ">
                    <ShareDialog close={closeShareDialog} id={id} />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div
            className="w-[100%] text-[18px] font-roboto uppercase truncate"
            style={{ color: settings.content }}
          >
            {title}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cards;
