/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mediaUp } from "../utils/mediaQueries";

const PageNotFoundContainerStyles = css({
  width: "100%",
  height: "50vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative"
})

const numberStyles = css({
  position: "absolute",
  zIndex: "0",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontSize: "10rem",
  fontWeight: "bold",
  color: "rgb(227, 227, 227)",
  [mediaUp("md")]:{
    fontSize: "15rem"
  }
})

const textStyles=css({
  fontSize: "2rem",
  color: "rgb(36, 36, 36)",
  fontWeight: "bold",
  position: "relative",
  zIndex: 1,
  textAlign: "center",
  [mediaUp("md")]:{
    fontSize: "2.5rem"
  }
})

export default function PageNotFound() {
  return (
    <>
      <div css={PageNotFoundContainerStyles}>
        <span css={numberStyles}>404</span>
        <span css={textStyles} >PAGE NOT FOUND</span>
      </div>
    </>
  );
}
