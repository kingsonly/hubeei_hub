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
  overflow: "auto",
  outline: "none",
};

export default function AppModal(props) {
  const { open, handleClose, children } = props;

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            className="cursor-pointer text-red-500 absolute top-[1px] left-[-1px]  "
            onClick={handleClose}
          >
            {" "}
            <ClearOutlinedIcon style={{ fontSize: 50 }} />
          </div>
          {children}
        </Box>
      </Modal>
    </div>
  );
}
