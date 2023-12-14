/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import {
  Button,
  FormControl,
  Radio,
  RadioGroup,
} from "@mui/material";
import { FC, useState } from "react";
import { baseButtonStyles } from "../../../GlobalStyles";
import { mediaUp } from "../../../utils/mediaQueries";
import { PlayQuizAnswerData } from "../../../types/QuizesTypes";
import SelectableAnswerQuestionDisplay from "../SelectableAnswerQuestionDisplay";

const dataContainerStyles = css({
  width: "100%",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  [mediaUp("sm")]: {
    padding: "2rem",
  },
});

const answerStyles = css({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: "0.6rem",
  gap: "0.5rem",
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  cursor: "pointer",
  [mediaUp("sm")]: {
    padding: "1rem",
  },
});

const selectedStyles = css({
  border: "2px solid blue",
});

const correctStyles = css({
  border: "2px solid lightgreen",
});

const wrongStyles = css({
  border: "2px solid red",
});

const answerDataContainerStyles = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.5rem",
  flexGrow: "1",
});

const answerImageStyles = css({
  width: "100%",
  maxWidth: "45rem",
  borderRadius: "10px",
  objectFit: "cover",
  objectPosition: "center",
  [mediaUp("sm")]: {
    borderRadius: "20px",
  },
});

const questionTextStyles = css({
  fontSize: "0.9rem",

  [mediaUp("sm")]: {
    fontSize: "1.2rem",
  },
});

type QuestionPageProps = {
  question: string;
  questionLinkImage: string;
  quizLength: number;
  questionNumber: number;
  getResult: (isAnsweredCorrectly: boolean) => void;
  onChangeQuestion: () => void;
  answers: PlayQuizAnswerData[];
};

const SingleAnswer: FC<QuestionPageProps> = (props) => {
  const {
    question,
    questionLinkImage,
    quizLength,
    questionNumber,
    getResult,
    answers,
    onChangeQuestion,
  } = props;

  const [isQuestionSaved, setQuestionSaved] = useState(false);
  const [selectedAnswerId, setSelectedAnswerId] = useState("");

  function saveQuestionHandler() {
    const answerArray = answers.filter(
      (answer) => answer.id === selectedAnswerId
    );
    if (answerArray.length === 0) {
      return;
    }
    getResult(answerArray[0].answer_type);
    setQuestionSaved(true);
  }

  function redirectToNextQuestionHandler() {
    setQuestionSaved(false);
    onChangeQuestion();
  }

  function changeAnswerHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedAnswerId(event.target.value);
  }

  return (
    <div css={dataContainerStyles}>
      <SelectableAnswerQuestionDisplay
        question={question}
        questionNumber={questionNumber}
        quizLenght={quizLength}
        linkImage={questionLinkImage}
      />
      <FormControl>
        <RadioGroup
          name="single-answer-group"
          onChange={changeAnswerHandler}
          value={selectedAnswerId}
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {answers.map((answer) => {
            return (
              <div
                key={answer.id}
                css={[
                  answerStyles,
                  selectedAnswerId === answer.id && selectedStyles,
                  isQuestionSaved && answer.answer_type && correctStyles,
                  isQuestionSaved &&
                    selectedAnswerId === answer.id &&
                    !answer.answer_type &&
                    wrongStyles,
                ]}
              >
                <Radio value={answer.id} />
                <div css={answerDataContainerStyles}>
                  {answer.text && <p css={questionTextStyles}>{answer.text}</p>}
                  {answer.link_image && (
                    <img
                      css={answerImageStyles}
                      src={answer.link_image}
                      alt="answer"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </RadioGroup>
      </FormControl>
      <Button
        sx={[baseButtonStyles, { width: "fit-content", alignSelf: "center" }]}
        onClick={
          isQuestionSaved ? redirectToNextQuestionHandler : saveQuestionHandler
        }
      >
        {isQuestionSaved ? "Następne pytanie" : "Zapisz odpowiedź"}
      </Button>
    </div>
  );
};

export default SingleAnswer;
