import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import Modal from "@mui/material/Modal";
import { Box, Input, IconButton, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

function SideIcons({
  handleSearch,
  searchIcon,
  setSearchIcon,
  setSearchIconClose,
  loaderStatus,
  goHome,
  goToLiked,
}) {
  const [searchItem, setSearchItem] = useState("");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "black",
    p: 4,
    height: 400,
    overflow: "auto",
  };

  const onHandleSearch = async () => {
    handleSearch(searchItem);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onHandleSearch();
    }
  };

  const iconSize = "w-8 h-[4rem]";

  return (
    <div className="">
      <div className=" w-[50px] z-30 bg-[#000]/80 rounded">
        <div className={iconSize} onClick={() => goHome()}>
          <HomeIcon className="text-white cursor-pointer ml-2 mt-3" />
        </div>
        <div className={iconSize}>
          <SearchIcon
            className={`text-white cursor-pointer ml-2 mt-2 ${
              searchIcon ? "active" : ""
            }`}
            onClick={setSearchIcon}
          />
        </div>
        <div className={iconSize} onClick={() => goToLiked()}>
          <FavoriteBorderIcon className="text-white cursor-pointer ml-2 mt-2" />
        </div>
        <div className={iconSize}>
          <AccountCircleIcon className="text-white cursor-pointer ml-2 mt-2" />
        </div>
        <div className={iconSize}>
          <ExitToAppRoundedIcon className="text-white cursor-pointer ml-2 mt-2" />
        </div>

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
                    width: 500, // Adjusted width to leave space for the button
                    marginRight: "0",
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
      </div>
    </div>
  );
}

export default SideIcons;
