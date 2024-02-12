import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

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

export default function AppModal(props) {
  const { open, handleClose, children, removeX = false } = props;

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {!removeX ? (
            <div
              className=" fixed cursor-pointer text-red-500  top-[6px] left-[-1px] font-roboto  "
              onClick={handleClose}
            >
              <ClearOutlinedIcon style={{ fontSize: 30 }} />
              <span>Close</span>
            </div>
          ) : null}
          <div style={{ overflow: "auto", width: "100%", height: "100%" }}>
            {children}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
