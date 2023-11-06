/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { CircularProgress } from "@mui/material";
import {css} from "@emotion/react";

type ContentLoadingProps = {
  coverParent?: boolean
}

const loadingContainerStyles = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100dvh",
  width: "100%"
});

const blurOverlayStyles = css({
  height: "100%",
  backgroundColor: "rgb(222, 221, 221, 0.15)",
  position: "absolute",
  inset: 0,
  zIndex: 5,
  backdropFilter: "blur(1px)",
  webkitBackdropFilter: "blur(1px)"
})

const ContentLoading: FC<ContentLoadingProps> = (props) => {
  const {coverParent} = props;
  return (
    <div css={[loadingContainerStyles, coverParent && blurOverlayStyles]} >
      <CircularProgress sx={{ color: "black" }} />
    </div>
  );
}


export default ContentLoading;