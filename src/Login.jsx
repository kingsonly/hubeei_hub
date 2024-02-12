import { CircularProgress, Typography } from "@mui/material";
import * as React from "react";
import ActionButton from "./ActionButton";
import TextInput from "./TextInput";

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

export default function Login(props) {
  const {
    setLoginEmail,
    handleLogin,
    setLoginPassword,
    settings,
    loading,
    displaySignup,
  } = props;

  return (
    <div className="flex w-[100%]  justify-center h-[100%] items-center">
      <div className="sm:w-[60%] w-[100%] px-4">
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
            label="Email"
            inputProps={{
              style: { fontFamily: "Arial", color: "white" },
            }}
            style={{ color: "white" }}
            maxRows={10}
            onChange={(e) => setLoginEmail(e.target.value)}
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
            label="Password"
            type="password"
            inputProps={{
              style: { fontFamily: "Arial", color: "white" },
            }}
            style={{ color: "white" }}
            maxRows={10}
            onChange={(e) => setLoginPassword(e.target.value)}
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
        <div className="flex flex-col-reverse sm:flex-row sm:justify-between mt-4">
          <div>
            <ActionButton handleClick={displaySignup} withBorder={true}>
              Sign Up
            </ActionButton>
          </div>
          <div className="">
            <ActionButton handleClick={handleLogin} withBG={true}>
              <div className="flex justify-between">
                <div>Login</div>
                <div>
                  {loading ? (
                    <CircularProgress size={20} style={{ color: "#000" }} />
                  ) : null}
                </div>
              </div>
            </ActionButton>
            <div style={{ color: settings.category }}>forgoten password</div>
          </div>
        </div>
      </div>
    </div>
  );
}
