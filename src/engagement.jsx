import axios from "axios";
import React, { useState, useEffect } from "react";
import EngagementDisplay from "./EngagementDisplay";
import EngagementSkeleton from "./EngagementSkeleton";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { styled } from "@mui/material/styles";

function Engagement({ content }) {
  const [data, setData] = useState([]);
  const [currentEngagement, setCurrentEngagement] = useState(0);
  const [background, setBackground] = useState("#000");
  const [color, setColor] = useState("#fff");
  const [pageLoader, setPageLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [displayWhat, setDisplayWhat] = useState(false);
  const [selectedTab, setSelectedTab] = React.useState("1");

  const AntTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: "none",
      minWidth: 0,
      [theme.breakpoints.up("sm")]: {
        minWidth: 0,
      },
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(1),
      color: background,
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:hover": {
        color: color,
        opacity: 1,
      },
      "&.Mui-selected": {
        color: color,
        fontWeight: theme.typography.fontWeightMedium,
      },
      "&.Mui-focusVisible": {
        backgroundColor: background,
      },
    })
  );
  useEffect(() => {
    getEngagment(content.id);
  }, []);

  const handleSelection = (optionId, index) => {
    let totalData = data[currentEngagement];
    let newData = [...data];

    if (totalData.answer_type == "single") {
      if (totalData.selected[index] > 0) {
        totalData.selected[index] = 0;
      } else {
        totalData.selected.map((item, i) => {
          totalData.selected[i] = 0;
        });
        totalData.selected[index] = optionId;
      }
    } else {
      if (totalData.selected[index] > 0) {
        totalData.selected[index] = 0;
      } else {
        totalData.selected[index] = optionId;
      }
    }

    newData[currentEngagement] = totalData;
    setData(newData);
  };

  const switchTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const showButton = () => {
    if (data.length - 1 == currentEngagement) {
      return (
        <div
          className="cursor-pointer w-[80px] h-8 flex items-center justify-center uppercase rounded-lg"
          style={{ background: background, color: color }}
          onClick={() => submit()}
        >
          submit
        </div>
      );
    } else {
      return (
        <div
          className="cursor-pointer w-[80px] h-8 flex items-center justify-center uppercase rounded-lg"
          style={{ background: background, color: color }}
          onClick={() => next()}
        >
          next
        </div>
      );
    }
  };

  const next = () => {
    setMessage("");
    //check if an option was selected
    let status = false;
    data[currentEngagement].selected.map((item) => {
      if (item > 0) {
        status = true;
      }
    });
    if (status) {
      let currentEngagementStatus = currentEngagement;
      currentEngagementStatus += 1;
      setCurrentEngagement(currentEngagementStatus);
    } else {
      setMessage("Please you must select an option");
    }
  };

  const submit = () => {
    let status = false;
    data[currentEngagement].selected.map((item) => {
      if (item > 0) {
        status = true;
      }
    });
    if (status) {
      // rearrage data in a new array
      let serverData = [];
      data.map((item) => {
        item.selected.map((item2) => {
          if (item2 > 0) {
            let newDataObject = { engagment_id: item.id, option_id: item2 };
            serverData.push(newDataObject);
          }
        });
      });

      // post to server
      let user = localStorage.getItem("user");
      let answers = JSON.stringify(serverData);
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_API}/api/content/respond-to-engagment/${user}`,
          { answers }
        )
        .then((response) => {
          if (response.data.status == "success") {
            // call the original function which loads the entire info from the live server
            getEngagment(content.id);
          } else {
          }
        })
        .catch((error) => {});
    } else {
      setMessage("Please you must select an option");
    }
  };

  const getEngagment = async (id) => {
    // set button colors
    let backeground = localStorage.getItem("category");
    let color = localStorage.getItem("content");
    setBackground(backeground);
    setColor(color);

    // show loader
    setPageLoader(true);
    // fetch engagement
    const user = localStorage.getItem("user");
    let headers = { user: user };
    await axios
      .get(
        `${process.env.REACT_APP_BACKEND_API}/api/content/engagmet-view/${id}`,
        {
          headers,
        }
      )
      .then(async (response) => {
        response.data.data.map(async (item, index) => {
          let totalOption = item.options.length;
          response.data.data[index].selected = new Array(totalOption).fill(0);
        });
        setData(response.data.data);
        let userAnswer = await response.data.data[0].user_answer.length;
        if (userAnswer > 0) {
          setDisplayWhat(true);
        }

        setPageLoader(false);
      })
      .catch((error) => {});
  };

  const renderAllResponse = (type) => {
    let newData = data.map((item) => (
      <EngagementDisplay
        data={item}
        type={type}
        background={background}
        color={color}
      />
    ));
    return newData;
  };

  const render = () => {
    if (data.length > 0) {
      if (!displayWhat) {
        if (!pageLoader && data.length > 0) {
          return (
            <div>
              <div className="text-[red] uppercase font-roboto text-[20]">
                {message}
              </div>
              <EngagementDisplay
                data={data[currentEngagement]}
                handleSelection={handleSelection}
                background={background}
                color={color}
              />
              <div className="cursor-pointer flex justify-end pr-2 mt-4 mb-4">
                {showButton()}
              </div>
            </div>
          );
        } else {
          return (
            <div>
              <EngagementSkeleton />
            </div>
          );
        }
      } else {
        // show engagment inside of tab to show users answer and general response starts
        return (
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={selectedTab}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={switchTab}
                  textColor="secondary"
                  indicatorColor="secondary"
                  sx={{ color: "red" }}
                >
                  <AntTab value="1" label="Your Answer" />
                  <AntTab value="2" label="General" />
                </TabList>
              </Box>
              <TabPanel value="1">{renderAllResponse("yours")}</TabPanel>
              <TabPanel value="2">{renderAllResponse("general")}</TabPanel>
            </TabContext>
          </Box>
        );
      }
    } else {
      return (
        <div>
          <EngagementSkeleton />
        </div>
      );
    }
  };

  return <div>{render()}</div>;
}

export default Engagement;
