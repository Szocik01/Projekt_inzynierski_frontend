/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { FC } from "react";
import { mediaUp } from "../../utils/mediaQueries";

const containerStyles = css({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
});

const quizLengthIndicatorContainerStyles = css({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  alignItems: "center",
  gap: "1rem",
  padding: "0 0.5rem",
  borderRadius: "20px",
  backgroundColor: "#ffffff55",
});

const quizLengthIndicatorStyles = css({
  width: "100%",
  height: "0.6rem",
  borderRadius: "10px",
  backgroundColor: "#ffffff",
  position: "relative",
  overflow: "hidden",
  padding: "0.1rem",
});

const indicatorStyles = css({
  position: "absolute",
  width: "100%",
  height: "100%",
  left: "0",
  top: "0",
  transformOrigin: "left",
  borderRadius: "10px",
  backgroundColor: "#2AB670aa",
  transform: "scaleX(0)",
  transition: "transform 0.3s ease-out",
});

const questionContentContainerStyles = css({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1.5rem",
  borderRadius: "20px",
});

const questionContentStyles = css({
  fontSize: "1.1rem",
  textAlign: "center",
  width: "100%",
  [mediaUp("sm")]: {
    fontSize: "1.4rem",
  },
});

const questionImageStyles = css({
  width: "100%",
  maxWidth: "50rem",
  borderRadius: "20px",
  objectFit: "cover",
  objectPosition: "center",
});

type SelectableAnswerQuestionDisplayProps = {
  question: string;
  questionNumber: number;
  quizLenght: number;
  linkImage: string;
};

const SelectableAnswerQuestionDisplay: FC<
  SelectableAnswerQuestionDisplayProps
> = (props) => {
  const { question, questionNumber, quizLenght, linkImage } = props;

  return (
    <div css={containerStyles}>
      <div css={quizLengthIndicatorContainerStyles}>
        <div css={quizLengthIndicatorStyles}>
          <div
            css={indicatorStyles}
            style={{ transform: `scaleX(${questionNumber / quizLenght})` }}
          ></div>
        </div>
        <span>
          {questionNumber}/{quizLenght}
        </span>
      </div>
      <div css={questionContentContainerStyles}>
        {question && <div css={questionContentStyles}>Pytanie {questionNumber}: {question}</div>}
        {linkImage && (
          <img css={questionImageStyles} src={linkImage} alt="question" />
        )}
      </div>
    </div>
  );
};

export default SelectableAnswerQuestionDisplay;
