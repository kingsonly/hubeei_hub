import React, { useState, useEffect } from "react";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ShareDialog from "./ShareIcons";
import axios from "axios";
import RankIcon from "./RankIcon";

const Cards = ({
  title,
  imageUrl,
  id,
  handleClose,
  handleOpen,
  liked,
  type = false,
  Rank,
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
    <div className="w-[100%]">
      {type ? (
        <div className="flex  text-[] w-[350px] mb-4 h-[100%]">
          <div className="w-[50%] h-[40%]">
            <RankIcon Rank={Rank} width="200px" height="200px" />
          </div>
          <div className="w-[70%]">
            <div
              onClick={handleCardClick}
              className={`relative h-[100%] bg-no-repeat group cursor-pointer overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:z-10  mb-4 ml-0`}
              style={cardStyle}
            >
              <div>
                <div className=" h-10px">
                  <div className="relative">
                    <div className="relative top-0 right-0">
                      <div className="w-[82px]">
                        <h3 className="text-amber-400">Icons</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" absolute bottom-0 right-0 mb-6  mr-4">
                  {!shareIcon ? (
                    <div className="bg-slate-600 w-[100%]  flex flex justify-between rounded-lg ">
                      <div className="ml-1 mt-2 mr-2 mb-2">
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

                      <div className="ml-1 mt-2 mr-2 mb-2 rounded-lg ">
                        <div className="bg-[white] rounded-md ">
                          <ShareRoundedIcon onClick={openShareDialog} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <ShareDialog close={closeShareDialog} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <div
              onClick={handleCardClick}
              className={`relative h-[200px] bg-no-repeat  border  w-[300px] group cursor-pointer overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:z-10 border-fuchsia-800  border-2 border-blue mb-4`}
              style={cardStyle}
            >
              <div>
                <div className="w-6px h-10px">
                  <div className="relative">
                    <div className="relative top-0 right-0">
                      <div className="w-[82px]">
                        <h3 className="text-amber-400">Icons</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" absolute bottom-0 right-0 mb-6 w-6px mr-4">
                  {!shareIcon ? (
                    <div className="bg-slate-600 w-[100%]  flex flex justify-between rounded-lg ">
                      <div className="ml-1 mt-2 mr-2 mb-2">
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

                      <div className="ml-1 mt-2 mr-2 mb-2 rounded-lg ">
                        <div className="bg-[white] rounded-md ">
                          <ShareRoundedIcon onClick={openShareDialog} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <ShareDialog close={closeShareDialog} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cards;
