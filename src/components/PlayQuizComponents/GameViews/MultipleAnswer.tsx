/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { Button, FormControl, Checkbox } from "@mui/material";
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
  border: "2px solid #03C03C",
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
  maxWidth: "35rem",
  borderRadius: "10px",
  objectFit: "cover",
  objectPosition: "center",
  [mediaUp("sm")]: {
    borderRadius: "20px",
  },
});

const questionTextStyles = css({
  fontSize: "0.9rem",
  wordBreak: "break-word",

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

const MultipleAnswer: FC<QuestionPageProps> = (props) => {
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
  const [selectedAnswerIdArray, setSelectedAnswerIdArray] = useState<string[]>(
    []
  );

  function saveQuestionHandler() {
    if(selectedAnswerIdArray.length === 0) {
      return;
    }
    const correctAnswersIdArray = answers.filter((answer) => {
      return answer.answer_type === true;
    });
    let trueAnswerIdArray: string[] = [];
    selectedAnswerIdArray.forEach((answerId) => {
      const selectedAnswer = answers.filter(
        (answer) => answer.id === answerId && answer.answer_type === true
      );
      if (selectedAnswer.length > 0) {
        trueAnswerIdArray.push(selectedAnswer[0].id);
      }
    });

    const answerType =
      trueAnswerIdArray.length === correctAnswersIdArray.length &&
      selectedAnswerIdArray.length === correctAnswersIdArray.length;

    getResult(answerType);
    setQuestionSaved(true);
  }

  function redirectToNextQuestionHandler() {
    setQuestionSaved(false);
    setSelectedAnswerIdArray([]);
    onChangeQuestion();
  }

  function selectAnswerHandler(
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) {
    if (checked) {
      setSelectedAnswerIdArray((prevState) => {
        return [...prevState, event.target.value];
      });
    } else {
      setSelectedAnswerIdArray((prevState) => {
        return prevState.filter((answerId) => answerId !== event.target.value);
      });
    }
  }

  return (
    <div css={dataContainerStyles}>
      <SelectableAnswerQuestionDisplay
        question={question}
        questionNumber={questionNumber}
        quizLenght={quizLength}
        linkImage={questionLinkImage}
      />
      <FormControl
        sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {answers.map((answer) => {
          const isSelected = selectedAnswerIdArray.includes(answer.id);
          return (
            <label
              key={answer.id}
              css={[
                answerStyles,
                isSelected && selectedStyles,
                isQuestionSaved && answer.answer_type && correctStyles,
                isQuestionSaved &&
                  isSelected &&
                  !answer.answer_type &&
                  wrongStyles,
              ]}
            >
              <Checkbox onChange={selectAnswerHandler} value={answer.id} disabled={isQuestionSaved}/>
              <div css={answerDataContainerStyles}>
                {answer.text && (
                  <p css={questionTextStyles}>{answer.text}</p>
                )}
                {answer.link_image && (
                  <img
                    css={answerImageStyles}
                    src={answer.link_image}
                    alt="answer"
                  />
                )}
              </div>
            </label>
          );
        })}
      </FormControl>
      <Button
        sx={[baseButtonStyles, { width: "fit-content", alignSelf: "center" }]}
        disabled={selectedAnswerIdArray.length === 0}
        onClick={
          isQuestionSaved ? redirectToNextQuestionHandler : saveQuestionHandler
        }
      >
        {isQuestionSaved ? "Następne pytanie" : "Zapisz odpowiedź"}
      </Button>
    </div>
  );
};

export default MultipleAnswer;
