/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { mediaUp } from "../../utils/mediaQueries";
import { baseButtonStyles } from "../../GlobalStyles";
import { Button } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

const containerStyles = css({
  width: "100%",
  padding: "2rem 0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "6rem",
  [mediaUp("md")]: {
    padding: "2rem 1rem",
  },
});

const summaryContainerStyles = css({
  width: "100%",
  backgroundColor: "#00000099",
  borderRadius: "10px",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1.5rem",
  [mediaUp("md")]: {
    height: "10rem",
    flexDirection: "row",
    gap: "0",
    alignItems: "unset",
  },
});

const circularDataContainer = css({
  position: "relative",
  width: "10rem",
  aspectRatio: "1/1",
  background: "#6DCF98aa",
  borderRadius: "50%",
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [mediaUp("md")]: {
    height: "14rem",
    width: "auto",
    top: "50%",
    transform: "translateY(-50%)",
  },
});

const middleCircularDataContainer = css({
  width: "8.5rem",
  aspectRatio: "1/1",
  background: "#ffffffcf",
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  [mediaUp("md")]: {
    height: "12.5rem",
    width: "auto",
  },
});

const circularDataDisplay = css({
  width: "7rem",
  aspectRatio: "1/1",
  background: "#2AB670",
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "nowrap",
  borderRadius: "50%",
  color: "#ffffff",
  span: {
    fontSize: "4rem",
    color: "#ffffff",
  },
  [mediaUp("md")]: {
    height: "11rem",
    width: "auto",
  },
});

const quizNameContainerStyles = css({
  fontSize: "1rem",
  paddingRight: "1rem",
  color: "#ffffff",
  flex: "1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [mediaUp("md")]: {
    paddingRight: "2rem",
    fontSize: "1.4rem",
    justifyContent: "flex-start",
    textAlign: "left",
  },
});

const scoreContainerStyles = css({
  fontSize: "1rem",
  paddingLeft: "1rem",
  color: "white",
  flex: "1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [mediaUp("md")]: {
    fontSize: "1.4rem",
    paddingLeft: "2rem",
    justifyContent: "flex-end",
    textAlign: "right",
  },
});

type EndingPageProps = {
  score: number;
  totalQuestions: number;
  quizName: string;
};

const EndingPage: FC<EndingPageProps> = (props) => {
  const { score, totalQuestions, quizName } = props;

  return (
    <div css={containerStyles}>
      <div css={summaryContainerStyles}>
        <div css={quizNameContainerStyles}>{quizName}</div>
        <div css={circularDataContainer}>
          <div css={middleCircularDataContainer}>
            <div css={circularDataDisplay}>
              <span>{parseInt(((score / totalQuestions) * 100).toString())}</span>%
            </div>
          </div>
        </div>
        <div
          css={scoreContainerStyles}
        >{`Udzielono ${score} poprawnych odpowiedzi na ${totalQuestions} pytania!`}</div>
      </div>

      <Link to="/quizes">
        <Button sx={baseButtonStyles}>Zakończ Quiz</Button>
      </Link>
    </div>
  );
};

export default EndingPage;
