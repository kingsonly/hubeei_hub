import React, { useState, useEffect } from "react";
import Slide from "./SlidePage";
import SideIcons from "./Sidebar";
import Card from "./Card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import AppModal from "./AppModal";
import Contents from "./contents";
import axios from "axios";
import RankIcon from "./RankIcon";
import StarRateIcon from "@mui/icons-material/StarRate";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import logo from "./Images/logo.png";

import {
  Box,
  Input,
  IconButton,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import RegistrationForm from "./Registration";


const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function Main({ Rank, height, width }) {
  const [defaultContent, setDefaultContent] = useState(false);
  const [initLoader, setInitLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchIcon, setSearchIcon] = useState(false);
  const [searchLoaderStatus, setSearchLoaderStatus] = useState(false);
  const [selectedContent, setSelectedContent] = useState();
  const [category, setCategory] = useState([]);
  const [work, setWork] = useState(0);
  const [image, setImage] = useState(null);
  const [topContent, setTopContent] = useState([]);
  const [hubSettings, setHubSettings] = useState();
  const [login, setLogin] = useState(false);

  useEffect(() => {
    getHubSelected();
  }, []);

  const setSearchIconUpdate = () => {
    setSearchIcon(true);
  };

  const setSearchIconClose = () => {
    setSearchIcon(false);
  };

  const createNewUser = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      localStorage.setItem("user", UniqueId());
    }
  };

  const fetchTopContent = async () => {
    let hub = localStorage.getItem("hub");
    try {
      const response = await axios.get(
        `https://api.hubeei.skillzserver.com/api/content/get-top-ten-views/${hub}`
      );
      if (response.data.status == "success") {
        setTopContent(response.data.data);
        console.log("Top Content Data:", response.data);
      }
    } catch (error) {
      console.error("Error fetching top content:", error);
    }
  };

  const handleSearch = async (searchItem) => {
    let hub = localStorage.getItem("hub");
    setSearchLoaderStatus(true);
    try {
      const response = await fetch(
        `https://api.hubeei.skillzserver.com/api/content/search/${hub}`,
        {
          method: "POST",
          headers: {},
          body: JSON.stringify({ query: searchItem }),
        }
      );

      const data = await response.json();

      if (data.status == "success") {
        setCategory(data.data);
        setSearchLoaderStatus(false);
        setSearchIcon(false);
      } else {
        console.error(`API request failed: ${response.statusText}`);
        setSearchLoaderStatus(false);
        setSearchIcon(false);
      }
    } catch (error) {
      console.error(`Error during API request:, ${error}`);
      setSearchLoaderStatus(false);
      setSearchIcon(false);
    }
  };

  const saveHubSettings = async (data) => {
    let settings = {};
    data.map((item) => {
      switch (item.name) {
        case "logo":
          localStorage.setItem("logo", item.value);
          settings.logo = item.value;
          break;
        case "menu":
          localStorage.setItem("menu", item.value);
          settings.menu = item.value;
          break;
        case "sportlight":
          localStorage.setItem("sportlight", item.value);
          settings.sportlight = item.value;
          break;
        case "search":
          localStorage.setItem("search", item.value);
          settings.search = item.value;
          break;
        case "content":
          localStorage.setItem("content", item.value);
          settings.content = item.value;
          break;
        case "category":
          localStorage.setItem("category", item.value);
          settings.category = item.value;
          break;
        case "backgound":
          localStorage.setItem("backeground", item.value);
          settings.background = item.value;
          break;
        case "registration":
          localStorage.setItem("registration", item.value);
          settings.registration = item.value;
          break;
      }
    });
    setHubSettings(settings);
  };
  const getHubSelected = async () => {
    // check if its a shared link
    let sharedLinkStatus = window.location.href.split("?");

    let currentUrl = window.location.href;
    let hub = currentUrl.split(".")[0].split("://")[1];
    // make an axos call to server to get the id of the hub, and also get hub settings
    await axios
      .get(
        `https://api.hubeei.skillzserver.com/api/hub/get-users-hubs-by-hub-name/${hub}`
      )
      .then(async (response) => {
        let data = response.data;
        if (data.status == "success") {
          // save the hub id to  local storage
          localStorage.setItem("hub", data.data.id);
          await saveHubSettings(data.data.settings);
          createNewUser();
          fetchAPI();
          await fetchImage();
          data.data.settings.map((item) => {
            if (item.name == "registration") {
              if (item.value == 1) {

                let Token = localStorage.getItem("token")
                if (Token == null) {
                  setLogin(true)
                  console.log("This", Token)
                }
              }
            }
          })

          fetchTopContent();
          if (sharedLinkStatus.length === 2) {
            loadModalForSharedLink(sharedLinkStatus[1]);
          } else {
            setInitLoader(true);
          }
        } else {
          console.log("something went wrong");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const loadModalForSharedLink = async (id) => {
    // fetch data fron the server
    let hub = localStorage.getItem("hub");
    let headers = { hub: hub };
    axios
      .get(`https://api.hubeei.skillzserver.com/api/content/view/${id}`, {
        headers,
      })
      .then((response) => {
        if (response.data.status == "success") {
          let data = response.data.data;
          setSelectedContent(data);
          setOpen(true);
          setInitLoader(true);
        } else {
          setInitLoader(true);
        }
      })
      .catch((error) => {
        setInitLoader(true);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (items) => {
    let works = work;
    setWork(works + 1);
    setSelectedContent(items);
    setOpen(true);
  };

  const fetchAPI = async () => {
    const user = localStorage.getItem("user");
    const headers = {
      user: user,
    };
    let hub = localStorage.getItem("hub");
    await axios
      .get(`https://api.hubeei.skillzserver.com/api/category-content/${hub}`, {
        headers,
      })
      .then((response) => {
        let data = response.data;
        if (data.status == "success") {
          setCategory(response.data.data);
          setDefaultContent(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const getUsersLikedContent = async () => {
    const user = localStorage.getItem("user");
    const headers = {
      user: user,
    };
    await axios
      .get(`https://api.hubeei.skillzserver.com/api/content/liked/${user}`, {
        headers,
      })
      .then((response) => {
        let data = response.data;
        if (data.status == "success") {
          setCategory(response.data.data);
          setDefaultContent(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const fetchImage = async () => {
    let hub = localStorage.getItem("hub");
    await axios
      .get(
        `https://api.hubeei.skillzserver.com/api/content/get-spotlight-content/${hub}`
      )
      .then((response) => {
        let data = response.data;
        if (data.status == "success") {
          setImage(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const UniqueId = () => {
    return "guest_" + Date.now();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",

    p: 4,
    height: 400,
    overflow: "auto",
  };

  return (
    <>
      {initLoader ? (
        <div
          className={`pb-10`}
          style={{ backgroundColor: hubSettings.background }}
        >
          <AppModal
            open={login}
            style={{ backdropFilter: "blur(1px)" }}
          >
            <div className="flex items-center justify-center h-full w-[90%]">
              <RegistrationForm />
            </div>

          </AppModal>

          <AppModal
            open={open}
            handleClose={handleClose}
            style={{ backdropFilter: "blur(1px)" }}
          >
            <Box>
              {selectedContent != null ? (
                <div className="w-[100%]">
                  <div className="w-[100%] text-center mb-4">
                    <h2 className="text-[50px] text-[#DCD427] uppercase">
                      {selectedContent.name}
                    </h2>
                  </div>
                  <div className="h-[600px]">
                    <Contents data={selectedContent} />
                  </div>
                  <div className="flex justify-end mt-2">
                    <div className="flex px-2 justify-between rounded-full border-2 border-[#DCD427] min-w-[70px]">
                      <div>
                        <VisibilityIcon className="text-[#DCD427]" />
                      </div>
                      <div className="text-[#fff]">{selectedContent.views}</div>
                    </div>
                    <div className="flex px-2 justify-between rounded-full border-2 border-[#DCD427] min-w-[70px] mx-4  ">
                      <div>
                        <FavoriteIcon className="text-[#DCD427]" />

                      </div>
                      <div className="text-[#fff]">0</div>
                    </div>
                    {selectedContent.sportlight > 0 ?? (
                      <div>
                        <StarRateIcon className="text-[#DCD427]" />
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <div>
                      <h1 className="mt-2 text-[#DCD427] text-[28px] font-roboto uppercase">
                        Description
                      </h1>
                    </div>
                    <div className="text-[22px] text-[#fff] font-roboto">
                      {selectedContent.content_description}
                    </div>
                  </div>

                  <div>list of likes</div>
                  <div>engagement</div>
                </div>
              ) : null}
            </Box>
          </AppModal>
          <div className="  ">
            {hubSettings.sportlight == 1 ? (
              image.length > 0 ? (
                <Slide
                  handleOpen={handleOpen}
                  data={image}
                  settings={hubSettings}
                />
              ) : (
                <div>the other header goes here too</div>
              )
            ) : (
              <div>the other header goes here</div>
            )}
          </div>
          <div className="fixed left-0 top-1/2 transform -translate-y-1/2 rounded z-20 ">
            <SideIcons
              handleSearch={handleSearch}
              searchIcon={searchIcon}
              setSearchIcon={setSearchIconUpdate}
              setSearchIconClose={setSearchIconClose}
              loaderStatus={searchLoaderStatus}
              goHome={fetchAPI}
              goToLiked={getUsersLikedContent}
              settings={hubSettings}
            />
          </div>
          <div className=" relative z-40 w-[100%] ">
            <div className="">
              <div className="ml-10 mt-[-130px]">
                <div className="">
                  <h1
                    className={`pl-20 text-[${hubSettings.category}] uppercase`}
                  >
                    Most Viewed
                  </h1>
                  <Carousel
                    responsive={responsive}
                    infinite={true}
                    keyBoardControl={true}
                  >
                    {topContent.map((value, i, f) => (
                      <div>
                        <Card
                          type={true}
                          Rank={i + 1}
                          handleOpen={() => handleOpen(value)}
                          content={value.name}
                          id={value.id}
                          imageUrl={`https://api.hubeei.skillzserver.com/public${value.thumbnail}`}
                          settings={hubSettings}
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>
              </div>
            </div>
            {defaultContent ? (
              <div className=" w-[86%]" style={{ margin: "-20px auto" }}>
                {category.length > 0
                  ? category.map((categoryItems) => {
                    return categoryItems.content.length > 0 ? (
                      <div>
                        <h1
                          className={`text-[${hubSettings.category}] uppercase`}
                        >
                          {categoryItems.name}{" "}
                        </h1>
                        <Carousel
                          responsive={responsive}
                          infinite={true}
                          keyBoardControl={true}
                        >
                          {categoryItems.content.map((items, i) => {
                            return (
                              <Card
                                handleOpen={() => handleOpen(items)}
                                title={items.name}
                                id={items.id}
                                imageUrl={`https://api.hubeei.skillzserver.com/public${items.thumbnail}`}
                                liked={items.like}
                                settings={hubSettings}
                              />
                            );
                          })}
                        </Carousel>
                      </div>
                    ) : (
                      <div>
                        <h1
                          className={`text-[${hubSettings.category}] uppercase`}
                        >
                          {categoryItems.name}{" "}
                        </h1>
                        <h2 className={`text-[${hubSettings.content}]`}>
                          {" "}
                          No Available Content For this Category
                        </h2>
                      </div>
                    );
                  })
                  : console.log("khkh", category)}
              </div>
            ) : (
              <div className=" w-[86%]" style={{ margin: "-20px auto" }}>
                <h1 className="text-white">Liked Content </h1>
                <Carousel
                  responsive={responsive}
                  infinite={true}
                  keyBoardControl={true}
                >
                  {category.map((items, i) => {
                    return (
                      <Card
                        handleOpen={() => handleOpen(items)}
                        title={items.name}
                        id={items.id}
                        imageUrl={`https://api.hubeei.skillzserver.com/public${items.thumbnail}`}
                        liked={items.like}
                        settings={hubSettings}
                      />
                    );
                  })}
                </Carousel>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-[#000] w-[100%] h-[100vh] flex justify-center items-center">
          <div className="w-[60%] flex justify-center h-[60%] items-center">
            <div>
              <div className="flex justify-center mb-24">
                <img src={logo} className="w-[250px]" />
              </div>
              <div className="mb-8">
                <Typography variant="h5" className="text-white">
                  Seamlessly white-label your Netflix-style content hub as part
                  of your brand. Boost audience engagement and brand awareness
                  instantly.
                </Typography>
              </div>
              <div className="text-[#DCD427]">
                <Typography variant="h5">
                  Loading Hub ....{" "}
                  <CircularProgress size={28} sx={{ color: "#DCD427" }} />
                </Typography>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Main;