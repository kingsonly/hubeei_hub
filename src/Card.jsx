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

  const [imageUrlSize, setImageUrlSize] = useState("");
  const [imageUrlSizeHalf, setImageUrlSizeHalf] = useState("");

  useEffect(() => {
    // Define image URLs for different screen sizes
    const smallImageUrl = "150x100_";
    const largeImageUrl = "300x200_";

    const smallImageUrlHalf = "75x100_";
    const largeImageUrlHalf = "150x200_";

    // Function to update image URL based on screen size
    const updateImageUrl = () => {
      const screenSize = window.innerWidth;

      console.log("i am screen size", screenSize);
      setImageUrlSize(screenSize <= 768 ? smallImageUrl : largeImageUrl);
      setImageUrlSizeHalf(
        screenSize <= 768 ? smallImageUrlHalf : largeImageUrlHalf
      );
    };

    // Update image URL on component mount and window resize
    updateImageUrl();
    window.addEventListener("resize", updateImageUrl);
    return () => window.removeEventListener("resize", updateImageUrl);
  }, []);

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

  // const cardStyle = {
  //   backgroundImage: `url(${imageUrl})`,
  //   backgroundSize: "100% 100%",
  // };
  const [none, folder1, folder2, image] = imageUrl.split("/");

  const cardStyle = {
    backgroundSize: "contain", // Default background size
    backgroundImage: `url(https://api.hubeei.skillzserver.com/public/${folder1}/${folder2}/${imageUrlSize}${image})`,
  };

  const cardStyleHalf = {
    backgroundSize: "contain", // Default background size
    backgroundImage: `url(https://api.hubeei.skillzserver.com/public/${folder1}/${folder2}/${imageUrlSizeHalf}${image})`,
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
        <div className=" md:w-[200px] md:h-[130px] flex lg:w-[350px] mb-4 h-[100%] w-[150px]">
          <div className="md:w-[50%] lg:w-[50%] md:h-[100%] md:flex md:justify-end">
            <RankIcon
              className="w-[80px] h-[100px] md:w-[90px] md:h-[120px] lg:w-[100px] lg:h-[120px] "
              Rank={Rank}
              width="60px"
              height="100px"
            />
          </div>
          <div className="md:w-[50%] lg:w-[50%]">
            <div
              onClick={handleCardClick}
              className={`relative h-[100%] bg-no-repeat group cursor-pointer overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:z-10  mb-2 ml-0`}
              style={cardStyleHalf}
            >
              <div>
                <div className=" h-10px">
                  <div className="relative">
                    <div className="relative top-0 right-0">
                      <div className="w-[82px]">
                        <img src={logo} className="md:w-[20px] w-[10px]" />
                      </div>
                    </div>
                  </div>
                </div>
                {!shareIcon ? (
                  <div className="px-2 rounded-lg flex items-center justify-center absolute bg-slate-600 h-[40px] bottom-0 right-0 lg:mb-6 w-[90%] lg:mr-4 lg:w-[80px]">
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
                  <div className="px-2 rounded-lg flex items-center justify-center absolute h-[40px] bottom-0 right-0 lg:mb-6 w-[100%]  ">
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
              className={`md:w-[200px] md:h-[130px] lg:h-[200px] lg:w-[300px] w-[150px] h-[100px]  relative  bg-no-repeat   group cursor-pointer overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:z-10   mb-2`}
              style={cardStyle}
            >
              <div>
                <div className="w-6px h-10px">
                  <div className="relative">
                    <div className="relative top-0 right-0">
                      <div className="w-[82px]">
                        <img src={logo} className="md:w-[20px] w-[10px]" />
                      </div>
                    </div>
                  </div>
                </div>
                {!shareIcon ? (
                  <div className="px-2 rounded-lg flex items-center justify-center absolute bg-slate-600 h-[40px] bottom-0 right-0 lg:mb-6 w-[50%] lg:mr-4 lg:w-[80px]">
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
                  <div className="px-2 rounded-lg flex items-center justify-center absolute h-[40px] bottom-0 right-0 lg:mb-6 w-[100%]  ">
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
