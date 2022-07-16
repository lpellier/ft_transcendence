import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import FaceIcon from "@mui/icons-material/Face";
import Modal from "@mui/material/Modal";
import { ModalChooseAvatar } from "../../../styles/tsxStyles/Settings/Avatar";
import { IconStyle } from "../../../styles/tsxStyles/AppBar/PongMenu";
import { styled } from "@mui/material/styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { toastThatError } from "../../../App";
import { useAuth } from "components/AuthProvider";
import React from "react";
import { Chip, Typography } from "@mui/material";

const Input = styled("input")({
  display: "none",
});

function NoButton(props: { onClick: any }) {
  return (
    <Button variant="contained" color="error" onClick={props.onClick}>
      Change my mind!
    </Button>
  );
}

function YesButton(props: { onClick: any }) {
  return (
    <Button variant="contained" onClick={props.onClick} color="success">
      Let's go!
    </Button>
  );
}

function UploadButton(props: { setOpen: any }) {
  const [selectedFile, setSelectedFile] = useState<any>();
  let auth = useAuth();

  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  function handleSubmit() {
    const formData = new FormData();
    formData.append("avatar", selectedFile);

    if (selectedFile.size > 1048576) {
      toastThatError("Avatar size too big! Maximum is 1024KB.");
    } else {
      axios
        .put(
          process.env.REACT_APP_BACK_URL + "/users/upload-avatar",
          formData,
          {
            withCredentials: true,
          }
        )
        .then(res => {
          console.log("Put avatar request success");
          props.setOpen(false);
          auth.updateAvatar();
        })
        .catch(err => {
          toastThatError("Avatar upload failed");
        });
    }
  }

  function closeModal() {
    props.setOpen(false);
  }

  return (
    <div>
      <label htmlFor="icon-button-file">
        <Chip
          icon={<PhotoCamera />}
          color="secondary"
          label="Choose file"
          clickable
        />
        <Input
          type="file"
          id="icon-button-file"
          name="file"
          onChange={changeHandler}
        />
      </label>
      {selectedFile ? (
        <Stack spacing={2} sx={{ margin: "20px" }}>
          <Typography variant="body2">Filename: {selectedFile.name}</Typography>
          <Typography variant="body2">Filetype: {selectedFile.type}</Typography>
          <Typography variant="body2">
            Size: {Math.round(selectedFile.size / 1024)}KB
          </Typography>
        </Stack>
      ) : (
        <Stack spacing={2} sx={{ margin: "20px" }}>
          <Typography variant="body2">No file selected yet</Typography>
        </Stack>
      )}

      <Stack direction="row" spacing={3}>
        <YesButton
          onClick={() => {
            handleSubmit();
          }}
        />
        <NoButton onClick={closeModal} />
      </Stack>
    </div>
  );
}

export default function AvatarList() {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="secondary"
        //   style={ButtonModalStyle}
      >
        <FaceIcon sx={IconStyle} />
        Choose avatar
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={ModalChooseAvatar}>
          <UploadButton setOpen={setOpen} />
        </Box>
      </Modal>
    </React.Fragment>
  );
}
