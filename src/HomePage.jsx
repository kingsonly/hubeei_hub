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
  const [open, setOpen] = useState(false);
  const [searchIcon, setSearchIcon] = useState(false);
  const [searchLoaderStatus, setSearchLoaderStatus] = useState(false);
  const [selectedContent, setSelectedContent] = useState();
  const [category, setCategory] = useState([]);
  const [work, setWork] = useState(0);
  const [image, setImage] = useState(null);
  const [topContent, setTopContent] = useState([]);

  useEffect(() => {
    createNewUser();
    fetchAPI();
    fetchImage();
    fetchTopContent();
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
    try {
      const response = await axios.get(
        "https://api.hubeei.skillzserver.com/api/content/get-top-ten-views/4"
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
    setSearchLoaderStatus(true);
    try {
      const response = await fetch(
        "https://api.hubeei.skillzserver.com/api/content/search/4",
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
    await axios
      .get("https://api.hubeei.skillzserver.com/api/category-content/4", {
        headers,
      })
      .then((response) => {
        let data = response.data;
        if (data.status == "success") {
          setCategory(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const fetchImage = async () => {
    await axios
      .get(
        "https://api.hubeei.skillzserver.com/api/content/get-spotlight-content/4"
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

  return (
    <div className="bg-black border-2 border-yellow-500 h-[100%]">
      <AppModal open={open} handleClose={handleClose}>
        {selectedContent != null ? (
          <div className="fixed inset-0 flex flex-col items-center justify-center   space-y-[20px] h-[100%] w-[100%] mt-4">
            <div className=" p-8 rounded-lg shadow-lg  w-[80%]">
              <h2 className="text-center">
                {selectedContent ? selectedContent.name : "Loading..."}
              </h2>
            </div>

            <div
              className=" p-8 rounded-lg shadow-lg w-[100%] h-[100%]"
              style={{ overflowY: "auto" }}
            >
              <div className="text-center w-[70%] h-[100%]  mr-[15] border-2 border-rose-500">
                <Contents data={selectedContent} />
              </div>

              <div className=" p-8 rounded-lg shadow-lg w-[70%] border-2 border-yellow-500 ">
                <div className="text-yellow-400  border-2 border-yellow-500 flex flex-col items-start flex flex justify-between">
                  <h1>Description</h1>
                  <h3 className="text-white text-left">
                    {selectedContent.content_description !== null
                      ? selectedContent.content_description
                      : "No Description"}
                  </h3>
                  <div className="">
                    <h1>hjfjj </h1>
                  </div>
                </div>
              </div>

              <div className=" p-8 rounded-lg shadow-lg w-[80%] ">
                <h2 className="text-center">Engagement</h2>
              </div>
              <div className=" p-8 rounded-lg shadow-lg w-[80%] h-[40%]">
                <h2 className="text-center">Things and Things</h2>
              </div>
            </div>
          </div>
        ) : null}
      </AppModal>
      <div className="  ">
        <Slide handleOpen={handleOpen} data={image} />
      </div>
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 rounded z-20 ">
        <SideIcons
          handleSearch={handleSearch}
          searchIcon={searchIcon}
          setSearchIcon={setSearchIconUpdate}
          setSearchIconClose={setSearchIconClose}
          loaderStatus={searchLoaderStatus}
        />
      </div>
      <div className=" relative z-10 w-[100%]">
        <div className="">
          <div className="ml-10">
            <div className="">
              <Carousel
                responsive={responsive}
                infinite={true}
                keyBoardControl={true}
              >
                {topContent.map((value, i, f) => (
                  <div>
                    {console.log("Hi this na so we su", i)}
                    <Card
                      type={true}
                      Rank={i + 1}
                      handleOpen={() => handleOpen(value)}
                      content={value.name}
                      id={value.id}
                      imageUrl={`https://api.hubeei.skillzserver.com/public${value.thumbnail}`}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
        <div className=" w-[86%]" style={{ margin: "-20px auto" }}>
          {category.length > 0
            ? category.map((categoryItems) => {
                return (
                  <div>
                    <h1 className="text-white">{categoryItems.name} </h1>
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
                          />
                        );
                      })}
                    </Carousel>
                  </div>
                );
              })
            : console.log("khkh", category)}
        </div>
      </div>
    </div>
  );
}

export default Main;
