/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { CircularProgress } from "@mui/material";
import {SerializedStyles, css} from "@emotion/react";

type ContentLoadingProps = {
  coverParent?: boolean,
  blurOverlay?: boolean
  customCss?: SerializedStyles
}

const loadingContainerStyles = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  inset: 0,
  zIndex: 1500,
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
  const {coverParent, blurOverlay, customCss} = props;
  return (
    <div css={[loadingContainerStyles, coverParent && coverParentStyles, blurOverlay && blurOverlayStyles, customCss]} >
      <CircularProgress sx={{ color: "black" }} />
    </div>
  );
}


export default ContentLoading;