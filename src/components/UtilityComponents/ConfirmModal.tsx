/** @jsxImportSource @emotion/react */

import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import React, { FC } from "react";
import { css } from "@emotion/react";

const modalStyles = css({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "500px",
  boxShadow: "24",
  padding: "1.5rem",
    borderRadius: "5px",
    backgroundColor: "white",
});

const titleStyles = css({
    borderBottom: "2px solid gray",
    marginBottom: "1rem",
});

const descriptionStyles = css({
    marginBottom: "1.5rem",
});

const buttonContainerStyles = css({
    display: "flex",
    flexDirection: "row",
    gap:"1rem",
});

type ConfirmModalProps = {
  isVisible: boolean;
  title: string;
  description: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onCancel: () => void;
  onClose: () => void;
};

const ConfirmModal: FC<ConfirmModalProps> = (props) => {
  const {
    isVisible,
    title,
    description,
    onConfirm,
    onCancel,
    onClose,
    cancelButtonText,
    confirmButtonText,
  } = props;

  return (
    <div>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={isVisible}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isVisible}>
          <div css={modalStyles}>
            <h4 id="modal-title" css={titleStyles}>{title}</h4>
            <div id="modal-description" css={descriptionStyles}>
              {description}
            </div>
            <div css={buttonContainerStyles}>
              <Button variant="contained" color="success" onClick={onConfirm}>{confirmButtonText}</Button>
              <Button variant="contained" color="error" onClick={onCancel}>{cancelButtonText}</Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ConfirmModal;