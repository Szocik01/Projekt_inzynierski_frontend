/** @jsxImportSource @emotion/react */

import { Button } from "@mui/material";
import ContentContainer from "./ContentContainer";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import { baseButtonStyles } from "../../GlobalStyles";
import { mediaUp } from "../../utils/mediaQueries";

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

const AddQuizRedirectSection = () => {
  return (
    <ContentContainer
      customStyles={contentContainerCustomStyles}
      title="Stwórz quiz"
    >
      <div css={textContainerStyles}>
        Ten prosty w obsłudze generator, pozwoli utworzyć ci swój własny
        oryginalny quiz! Kliknij w “+” i zaczynaj zabawę!
      </div>
      <Link to="/add-quiz" css={{width:"fit-content"}}>
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

export default AddQuizRedirectSection;
