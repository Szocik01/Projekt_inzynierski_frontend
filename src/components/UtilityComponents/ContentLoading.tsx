/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { CircularProgress } from "@mui/material";
import {css} from "@emotion/react";

type ContentLoadingProps = {
  coverParent?: boolean,
  blurOverlay?: boolean
}

const loadingContainerStyles = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  inset: 0,
  zIndex: 5,
});

const coverParentStyles = css({
  position: "absolute",
})

const blurOverlayStyles = css({
  backgroundColor: "rgb(222, 221, 221, 0.15)",
  backdropFilter: "blur(1px)",
  webkitBackdropFilter: "blur(1px)"
})

const ContentLoading: FC<ContentLoadingProps> = (props) => {
  const {coverParent, blurOverlay} = props;
  return (
    <div css={[loadingContainerStyles, coverParent && coverParentStyles, blurOverlay && blurOverlayStyles]} >
      <CircularProgress sx={{ color: "black" }} />
    </div>
  );
}


export default ContentLoading;