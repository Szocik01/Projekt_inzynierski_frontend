/** @jsxImportSource @emotion/react */

import { Button } from "@mui/material";
import ContentContainer from "./ContentContainer";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import { baseButtonStyles } from "../../GlobalStyles";
import { mediaUp } from "../../utils/mediaQueries";
import { FC } from "react";

const contentContainerCustomStyles = css({
  ".innerContainer": {
    flexDirection: "column",
    alignItems: "center",
  },
  [mediaUp("xl")]: {
    ".innerContainer": {
      flexDirection: "row",
      gap: "1rem",
    },
  },
});

const textContainerStyles = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#FFFFFFaa",
  padding: "0.4rem",
  fontSize: "0.9rem",
  borderRadius: "20px",
  textAlign: "center",
});

const addMarkStyles = css({
  width: "1.8rem",
  height: "3px",
  borderRadius: "10px",
  backgroundColor: "white",
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%,-50%)",
  "&:first-of-type": {
    transform: "translate(-50%,-50%) rotate(90deg)",
  },
});

type SideRedirectSectionElementProps = {
  redirectionLink: string;
  text: string;
  title: string;
};

const SideRedirectSectionElement:FC<SideRedirectSectionElementProps> = (props) => {

  const { redirectionLink, text, title } = props;

  return (
    <ContentContainer
      customStyles={contentContainerCustomStyles}
      title={title}
    >
      <div css={textContainerStyles}>
        {text}
      </div>
      <Link to={redirectionLink} css={{width:"fit-content"}}>
        <Button
          type="button"
          sx={[baseButtonStyles, { position: "relative", height: "3rem" }]}
        >
          <div css={addMarkStyles}></div>
          <div css={addMarkStyles}></div>
        </Button>
      </Link>
    </ContentContainer>
  );
};

export default SideRedirectSectionElement;
