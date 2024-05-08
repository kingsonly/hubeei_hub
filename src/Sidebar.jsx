import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import Modal from "@mui/material/Modal";
import { Box, Input, IconButton, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import logo from "./Images/logo.png";

function SideIcons({
  handleSearch,
  searchIcon,
  setSearchIcon,
  setSearchIconClose,
  loaderStatus,
  goHome,
  goToLiked,
  settings,
  defaultLocation = false,
  searchItem,
  setSearchItem,
  activeIcon,
}) {
  const [loginStatus, setLoginStatus] = useState(localStorage.getItem("token"));
  const [active, setActive] = useState();

  useEffect(() => {
    setActive(activeIcon);
  }, [activeIcon]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    p: 4,
    overflow: "auto",
    outline: "none",
  };

  const onHandleSearch = async () => {
    handleSearch(searchItem);
  };
  const logout = async () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onHandleSearch();
    }
  };

  const iconSize = "w-8 h-[4rem]";

  return (
    <div className="z-50">
      <Modal
        open={searchIcon}
        onClose={setSearchIconClose}
        aria-labelledby="search-modal"
        aria-describedby="search-modal-description"
        style={{ backdropFilter: "blur(5px)" }}
      >
        <Box style={style}>
          <div className="flex">
            <div>
              <Input
                type="text"
                placeholder="Search..."
                fullWidth
                autoFocus
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                onKeyPress={handleKeyPress}
                disableUnderline
                sx={{
                  backgroundColor: "#f0f0f0",
                  paddingLeft: 5,
                  borderTopLeftRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  height: 40,
                  marginRight: "0",
                  "@media (max-width:600px)": {
                    width: 300,
                  },

                  // Adjust styles for screens larger than or equal to 960px
                  "@media (min-width:960px)": {
                    width: 500,
                  },
                }}
              />
            </div>
            <div>
              <Button
                onClick={onHandleSearch}
                className="bg-[red]"
                sx={{
                  backgroundColor: "#000",
                  height: 40,
                  borderTopLeftRadius: "0",
                  borderBottomLeftRadius: "0",
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px",
                  color: "#DCD427",
                }}
              >
                {loaderStatus ? (
                  <CircularProgress
                    sx={{
                      color: "#DCD427",
                    }}
                    size={20}
                  />
                ) : (
                  "Search"
                )}
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      {!defaultLocation ? (
        <div className="">
          <div className=" w-[50px] z-60 bg-[#000]/80 rounded">
            <div className={`${iconSize}`} onClick={() => goHome()}>
              <HomeIcon
                className="cursor-pointer ml-2 mt-3"
                style={{
                  color:
                    active == "home" ? settings.content : settings.category,
                }}
              />
            </div>
            {settings.search == 1 ? (
              <div className={`${iconSize}`}>
                <SearchIcon
                  className={` cursor-pointer ml-2 mt-2 ${
                    searchIcon ? "active" : ""
                  }`}
                  onClick={setSearchIcon}
                  style={{
                    color:
                      active == "search" ? settings.content : settings.category,
                  }}
                />
              </div>
            ) : null}
            <div className={`${iconSize}`} onClick={() => goToLiked()}>
              <FavoriteBorderIcon
                className=" cursor-pointer ml-2 mt-2"
                style={{
                  color:
                    active == "liked" ? settings.content : settings.category,
                }}
              />
            </div>
            {settings.registration == 1 && loginStatus != null ? (
              <div className={`${iconSize}`}>
                <AccountCircleIcon
                  className="cursor-pointer ml-2 mt-2"
                  style={{
                    color:
                      active == "account"
                        ? settings.content
                        : settings.category,
                  }}
                />
              </div>
            ) : null}
            {settings.registration == 1 && loginStatus != null ? (
              <div className={`${iconSize}`} onClick={logout}>
                <ExitToAppRoundedIcon className="text-white cursor-pointer ml-2 mt-2" />
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div>
          <div className="lg:mb-[180px] lg:h-[80px] h-[300px] ">
            <div
              style={{ color: settings.category }}
              className="lg:px-[50px] font-roboto text-[18px] lg:flex lg:w-[48%] lg:h-[100%] lg:justify-between lg:items-center"
            >
              <div
                onClick={() => goHome()}
                className="lg:block flex justify-center"
              >
                <img src={logo} className="lg:w-[200px] w-[250px]" />
              </div>
              {/* <div className="lg:w-[100%] flex justify-around mt-4">
                <div className="cursor-pointer" onClick={() => goHome()}>
                  Home
                </div>
                <div onClick={() => goToLiked()} className="cursor-pointer">
                  Favorite
                </div>
                <div onClick={setSearchIcon} className="cursor-pointer">
                  Search
                </div>
              </div> */}
            </div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SideIcons;
