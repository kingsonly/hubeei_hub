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
import Engagement from "./engagement";
import Login from "./Login";
import Signup from "./Signup";

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
    items: 2,
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
  const [image, setImage] = useState([]);
  const [topContent, setTopContent] = useState([]);
  const [hubSettings, setHubSettings] = useState();
  const [loginPassword, setLoginPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupName, setSignupName] = useState("");
  const [mustLogin, setMustLogin] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

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

  const saveHubSettings = (data) => {
    let settings = { name: data.name };

    data.settings.map((item) => {
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
          if (item.value == 1) {
            // check that token key is null
            if (localStorage.getItem("token") == null) {
              setMustLogin(true);
            }
          }
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
          // save the hub id to to local storage
          localStorage.setItem("hub", data.data.id);
          localStorage.setItem("hubName", data.data.name);
          saveHubSettings(data.data);
          createNewUser();
          fetchAPI();
          await fetchImage();
          fetchTopContent();
          if (sharedLinkStatus.length === 2) {
            loadModalForSharedLink(sharedLinkStatus[1]);
          } else {
            setInitLoader(true);
          }
        } else {
          console.log("something weant wrong");
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
    endViewing();
    setOpen(false);
  };
  const updateViwsCounts = (id) => {
    let user = localStorage.getItem("user");
    let userType = "user";
    if (user.split("_").length > 1) {
      userType = "guest";
    } else {
      userType = "user";
    }
    let data = {
      user_id: user,
      content_id: id,
      user_type: userType,
    };

    axios
      .post("https://api.hubeei.skillzserver.com/api/content/save-views", data)
      .then((response) => {
        console.log(response);
        localStorage.setItem("viewing", response.data.data.id);
      })
      .catch((error) => {});
  };

  const endViewing = () => {
    let viewingId = localStorage.getItem("viewing");
    axios
      .get(
        `https://api.hubeei.skillzserver.com/api/content/update-content-views/${viewingId}`
      )
      .then((response) => {
        localStorage.removeItem("viewing");
        console.log(response.data);
      })
      .catch(() => {});
  };
  const handleOpen = (items) => {
    let works = work;
    setWork(works + 1);
    setSelectedContent(items);
    //create the link for total views
    updateViwsCounts(items.id);
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

  const setLoginEmailFunction = (e) => {
    setLoginEmail(e);
  };

  const handleLoginFunction = () => {
    setLoginLoading(true);
    let data = {
      hub_id: localStorage.getItem("hub"),
      email: loginEmail,
      password: loginPassword,
    };
    axios
      .post("https://api.hubeei.skillzserver.com/api/subscription/login", data)
      .then((response) => {
        if (response.data.status == "success") {
          let responseData = response.data.data;
          localStorage.setItem("token", responseData.token);
          localStorage.setItem("user", responseData.id);
          setLoginLoading(false);
          setMustLogin(false);
          // close modal
        }
      })
      .catch((error) => {
        setLoginLoading(false);
      });
  };
  const setLoginPasswordFunction = (e) => {
    setLoginPassword(e);
  };
  const showSignupModalFunction = () => {
    setShowSignupModal(true);
  };

  const closeSignupModalFunction = () => {
    setShowSignupModal(false);
  };

  const setSignupEmailFunction = (e) => {
    setSignupEmail(e);
  };
  const setSignupPasswordFunction = (e) => {
    setSignupPassword(e);
  };

  const setSignupNameFunction = (e) => {
    setSignupName(e);
  };

  const handleSignupFunction = () => {
    setLoginLoading(true);
    let data = {
      hub_id: localStorage.getItem("hub"),
      email: signupEmail,
      password: signupPassword,
      name: signupName,
    };
    axios
      .post(
        "https://api.hubeei.skillzserver.com/api/subscription/register",
        data
      )
      .then((response) => {
        if (response.data.status == "success") {
          setLoginLoading(false);
          closeSignupModalFunction();
          // close modal
        }
      })
      .catch((error) => {
        setLoginLoading(false);
      });
  };

  return (
    <>
      {initLoader ? (
        <div
          className={`pb-10 min-h-[100vh] h-100% overflow-auto`}
          style={{ backgroundColor: hubSettings.background }}
        >
          <AppModal
            open={showSignupModal}
            style={{ backdropFilter: "blur(1px)" }}
            handleClose={closeSignupModalFunction}
          >
            <Signup
              setSignupName={setSignupNameFunction}
              setSignupEmail={setSignupEmailFunction}
              handleSignup={handleSignupFunction}
              setSignupPassword={setSignupPasswordFunction}
              settings={hubSettings}
              loading={loginLoading}
            />
          </AppModal>

          <AppModal
            open={mustLogin}
            removeX={true}
            style={{ backdropFilter: "blur(1px)" }}
          >
            <Login
              setLoginEmail={setLoginEmailFunction}
              handleLogin={handleLoginFunction}
              setLoginPassword={setLoginPasswordFunction}
              settings={hubSettings}
              loading={loginLoading}
              displaySignup={showSignupModalFunction}
            />
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
                    <h2
                      style={{ color: hubSettings.category }}
                      className="text-[50px] text-[#DCD427] uppercase"
                    >
                      {selectedContent.name}
                    </h2>
                  </div>
                  <div className="max-h-[600px]">
                    <Contents data={selectedContent} />
                  </div>
                  <div className="flex justify-end mt-2">
                    <div className="flex px-2 justify-between rounded-full border-2 border-[#DCD427] min-w-[70px]">
                      <div>
                        <VisibilityIcon className="text-[#DCD427]" />
                      </div>
                      <div className="text-[#fff]">
                        {selectedContent.views.length}
                      </div>
                    </div>
                    <div className="flex px-2 justify-between rounded-full border-2 border-[#DCD427] min-w-[70px] mx-4  ">
                      <div>
                        <FavoriteIcon className="text-[#DCD427]" />
                      </div>
                      <div className="text-[#fff]">0</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div>
                      <h1
                        style={{ color: hubSettings.category }}
                        className="mt-2 text-[#DCD427] text-[28px] font-roboto uppercase"
                      >
                        Description
                      </h1>
                    </div>
                    <div
                      style={{ color: hubSettings.content }}
                      className="text-[22px] text-[#fff] font-roboto"
                    >
                      {selectedContent.content_description}
                    </div>
                  </div>
                  <div>
                    {selectedContent.with_engagement == 1 ? (
                      <Contents data={selectedContent} withEngagmnet={true} />
                    ) : null}
                  </div>
                </div>
              ) : null}
            </Box>
          </AppModal>
          <div className="  ">
            {hubSettings.sportlight == 1 ? (
              image.length > 0 ? (
                <div className="">
                  <div className="sm:ml-[200px] absolute top-8 left-0 sm:mb-[4%] sm:w-[15%]  h-[20%]  z-50 ">
                    <img
                      src={logo}
                      alt=""
                      className="max-w-full max-h-full z-50"
                    />
                    <h2
                      className="w-[100%] text-center mt-2"
                      style={{ color: hubSettings.category }}
                    >
                      {hubSettings.name}
                    </h2>
                  </div>
                  <Slide
                    handleOpen={handleOpen}
                    data={image}
                    settings={hubSettings}
                  />
                </div>
              ) : (
                <div>
                  <SideIcons
                    handleSearch={handleSearch}
                    searchIcon={searchIcon}
                    setSearchIcon={setSearchIconUpdate}
                    setSearchIconClose={setSearchIconClose}
                    loaderStatus={searchLoaderStatus}
                    goHome={fetchAPI}
                    goToLiked={getUsersLikedContent}
                    settings={hubSettings}
                    defaultLocation={true}
                  />
                </div>
              )
            ) : (
              <div>
                <SideIcons
                  handleSearch={handleSearch}
                  searchIcon={searchIcon}
                  setSearchIcon={setSearchIconUpdate}
                  setSearchIconClose={setSearchIconClose}
                  loaderStatus={searchLoaderStatus}
                  goHome={fetchAPI}
                  goToLiked={getUsersLikedContent}
                  settings={hubSettings}
                  defaultLocation={true}
                />
              </div>
            )}
          </div>
          <div className="fixed left-0 top-1/2 transform -translate-y-1/2 rounded z-50 ">
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
          <div className=" relative z-40 w-[90%] mx-auto">
            <div className="">
              <div className=" mt-[-130px] ">
                <div className="">
                  <h3
                    className={`  uppercase font-roboto `}
                    style={{ color: hubSettings.category }}
                  >
                    Most Viewed
                  </h3>
                  <Carousel responsive={responsive} keyBoardControl={true}>
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
              <div className=" w-[100%]">
                {category.length > 0
                  ? category.map((categoryItems) => {
                      return categoryItems.content.length > 0 ? (
                        <div className="mt-4">
                          <h3
                            className={`uppercase font-roboto`}
                            style={{ color: hubSettings.category }}
                          >
                            {categoryItems.name}{" "}
                          </h3>
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
                        <div className="mt-4">
                          <h3
                            className={` uppercase font-roboto`}
                            style={{ color: hubSettings.category }}
                          >
                            {categoryItems.name}{" "}
                          </h3>
                        </div>
                      );
                    })
                  : console.log("khkh", category)}
              </div>
            ) : (
              <div className=" w-[86%]" style={{ margin: "-20px auto" }}>
                <h3 className="text-white font-roboto">Liked Content </h3>
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
