import { CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ActionButton from "./ActionButton";
import TextInput from "./TextInput";
import axios from "axios";

const style = {
  backdropFilter: "blur(5px)",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  bgcolor: "black",
  boxShadow: 24,
  p: 4,
  outline: "none",
};

export default function Signup(props) {
  const {
    setSignupName,
    setSignupEmail,
    handleSignup,
    setSignupPassword,
    settings,
    loading,
    setCustomFieldsParent,
    onChangeCustomFields,
  } = props;

  const [customFields, setCustomFields] = useState([]);

  useEffect(() => {
    getRegistrationCustomFields();
  }, []);

  const getRegistrationCustomFields = async () => {
    let hubId = localStorage.getItem("hub");
    await axios
      .get(
        `${process.env.REACT_APP_BACKEND_API}/api/register-settings-view/${hubId}`
      )
      .then((res) => {
        console.log(
          "check this out",
          res.data.data.create_hub_registration_settings
            .hub_registration_setting_fields
        );
        setCustomFieldsParent(
          res.data.data.create_hub_registration_settings
            .hub_registration_setting_fields
        );
        setCustomFields(
          res.data.data.create_hub_registration_settings
            .hub_registration_setting_fields
        );
      })
      .catch((error) => {});
  };

  return (
    <div className="flex w-[100%]  justify-center h-[100%] items-center">
      <div className="w-[60%]">
        <div className="flex justify-center">
          <div style={{ color: settings.category }}>
            <Typography variant="h3" className="font-roboto">
              {settings.name}
            </Typography>
          </div>
        </div>
        <div className="mt-4">
          <TextInput
            id="outlined-multiline-flexible"
            label="FullName"
            inputProps={{
              style: { fontFamily: "Arial", color: "white" },
            }}
            style={{ color: "white" }}
            maxRows={10}
            onChange={(e) => setSignupName(e.target.value)}
            sx={{
              "& .MuiFormLabel-root": {
                color: "white",
              },
              "& .MuiFormLabel-root.Mui-focused": {
                color: "white",
              },
            }}
          />
        </div>
        <div className="mt-4">
          <TextInput
            id="outlined-multiline-flexible"
            label="Email"
            inputProps={{
              style: { fontFamily: "Arial", color: "white" },
            }}
            style={{ color: "white" }}
            maxRows={10}
            onChange={(e) => setSignupEmail(e.target.value)}
            sx={{
              "& .MuiFormLabel-root": {
                color: "white",
              },
              "& .MuiFormLabel-root.Mui-focused": {
                color: "white",
              },
            }}
          />
        </div>
        {customFields?.map((value, index) => (
          <div className="mt-4">
            <TextInput
              id="outlined-multiline-flexible"
              label={value.name}
              inputProps={{
                style: { fontFamily: "Arial", color: "white" },
              }}
              style={{ color: "white" }}
              maxRows={10}
              onChange={(e) => onChangeCustomFields(e.target.value, index)}
              sx={{
                "& .MuiFormLabel-root": {
                  color: "white",
                },
                "& .MuiFormLabel-root.Mui-focused": {
                  color: "white",
                },
              }}
            />
          </div>
        ))}
        <div className="mt-4">
          <TextInput
            id="outlined-multiline-flexible"
            label="Password"
            type="password"
            inputProps={{
              style: { fontFamily: "Arial", color: "white" },
            }}
            style={{ color: "white" }}
            maxRows={10}
            onChange={(e) => setSignupPassword(e.target.value)}
            sx={{
              "& .MuiFormLabel-root": {
                color: "white",
              },
              "& .MuiFormLabel-root.Mui-focused": {
                color: "white",
              },
            }}
          />
        </div>
        <div className="flex justify-end mt-4">
          <div>
            <ActionButton handleClick={handleSignup} withBG={true}>
              <div className="flex justify-between">
                <div>Signup</div>
                <div>
                  {loading ? (
                    <CircularProgress size={20} style={{ color: "#000" }} />
                  ) : null}
                </div>
              </div>
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
}
