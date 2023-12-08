/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import InputsCard from "../UtilityComponents/InputsCard";
import {
  SelectableAnswerType,
  SelectableQuestionType,
} from "../../types/QuizesTypes";
import { Button } from "@mui/material";
import { baseButtonStyles } from "../../GlobalStyles";
import DeleteIcon from "@mui/icons-material/Delete";
import { mediaUp } from "../../utils/mediaQueries";
import { httpErrorStyles } from "../AuthComponents/AuthGlobalStyles";

const viewContainerStyles = css({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  rowGap: "2rem",
  alignItems: "flex-start",
  [mediaUp("sm")]: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});

const answersContainerStyles = css({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxHeight: "30rem",
  overflow: "auto",
  backgroundColor: "#FFFFFF88",
  padding: "1rem",
  borderRadius: "20px",
  gap: "1.5rem",
  ".drop-zone": {
    flexShrink: 0,
  },
});

const topAnswersContainerStyles = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1.5rem",
  width: "100%",
  [mediaUp("sm")]: {
    width: "50%",
  },
});

const questionContainerStyles = css({
  width: "100%",
  maxWidth: "42rem",
  padding: "1rem",
  backgroundColor: "#FFFFFF",
  borderRadius: "20px",
});

const topQuestionContainerStyles = css({
  width: "100%",
  display: "flex",
  justifyContent: "center",
});

const singleAnswerContainer = css({
  position: "relative",
  width: "100%",
  backgroundColor: "#FFFFFF",
  padding: "1.8rem 1rem",
  borderRadius: "20px",
});

type SelectableAnswersProps = {
  multipleAnswer: boolean;
  correctAnswers: SelectableAnswerType[];
  wrongAnswers: SelectableAnswerType[];
  question: SelectableQuestionType;
  onQuestionTextChange: (text: string) => void;
  onQuestionImageChange: (files: FileList) => void;
  onAnswerAdd: (answerType: boolean) => void;
  onAnswerRemove: (id?: string) => void;
  onAnswerTextChange: (text: string, id?: string) => void;
  onAnswerImageChange: (files: FileList, id?: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onQuestionFileRemove: () => void;
  onAnswerFileRemove: (id?: string) => void;
  canSubmit: boolean;
  fileErrors?: { [key: string]: string };
  httpError: string;
};

const SelectableAnswers = (props: SelectableAnswersProps) => {
  const {
    multipleAnswer,
    correctAnswers,
    wrongAnswers,
    question,
    onQuestionImageChange,
    onQuestionTextChange,
    onAnswerAdd,
    onAnswerImageChange,
    onAnswerRemove,
    onAnswerTextChange,
    onSubmit,
    onQuestionFileRemove,
    onAnswerFileRemove,
    canSubmit,
    fileErrors,
    httpError
  } = props;

  const correctAnswersElements = correctAnswers.map((answer, index) => {
    return (
      <div css={singleAnswerContainer} key={answer.id}>
        {onAnswerRemove && (
          <Button
            type="button"
            variant="contained"
            color="error"
            sx={{
              minWidth: "auto",
              width: "1.5rem",
              height: "1.5rem",
              padding: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: "3px",
              right: "3px",
              zIndex: 5,
            }}
            onClick={() => {
              onAnswerRemove(answer.id);
            }}
          >
            <DeleteIcon sx={{ width: "90%", height: "90%", color: "white" }} />
          </Button>
        )}
        <InputsCard
          cardId={answer.id}
          fieldsLabel={{
            textFieldLabel: multipleAnswer
              ? `Poprawna odpowiedź ${index + 1}`
              : "Poprawna odpowiedź",
          }}
          textFieldValue={answer.text}
          imagePreviewUrl={
            answer.file ? URL.createObjectURL(answer.file) : answer.linkImage
          }
          photoError={fileErrors && fileErrors[answer.id]}
          onTextFieldChange={(text, cardId) => {
            onAnswerTextChange(text, cardId);
          }}
          onFileChange={(files, cardId) => {
            onAnswerImageChange(files, cardId);
          }}
          onImageDelete={(cardId) => {
            onAnswerFileRemove(cardId);
          }}
        />
      </div>
    );
  });

  const wrongAnswersElements = wrongAnswers.map((answer, index) => {
    return (
      <div css={singleAnswerContainer} key={answer.id}>
        {onAnswerRemove && (
          <Button
            type="button"
            variant="contained"
            color="error"
            sx={{
              minWidth: "auto",
              width: "1.5rem",
              height: "1.5rem",
              padding: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: "3px",
              right: "3px",
              zIndex: 5,
            }}
            onClick={() => {
              onAnswerRemove(answer.id);
            }}
          >
            <DeleteIcon sx={{ width: "90%", height: "90%", color: "white" }} />
          </Button>
        )}
        <InputsCard
          cardId={answer.id}
          textFieldValue={answer.text}
          fieldsLabel={{ textFieldLabel: `Błędna odpowiedź ${index + 1}` }}
          imagePreviewUrl={
            answer.file ? URL.createObjectURL(answer.file) : answer.linkImage
          }
          photoError={fileErrors && fileErrors[answer.id]}
          onTextFieldChange={(text, cardId) => {
            onAnswerTextChange(text, cardId);
          }}
          onFileChange={(files, cardId) => {
            onAnswerImageChange(files, cardId);
          }}
          onImageDelete={(cardId) => {
            onAnswerFileRemove(cardId);
          }}
        />
      </div>
    );
  });

  function onCorrectAnswerAdd() {
    onAnswerAdd(true);
  }

  function onWrongAnswerAdd() {
    onAnswerAdd(false);
  }

  return (
    <form css={viewContainerStyles} onSubmit={onSubmit}>
      <div css={topQuestionContainerStyles}>
        <div css={questionContainerStyles}>
          <InputsCard
            textFieldValue={question.text}
            fieldsLabel={{ textFieldLabel: "Treść pytania" }}
            imagePreviewUrl={
              question.file
                ? URL.createObjectURL(question.file)
                : question.linkImage
            }
            photoError={fileErrors && fileErrors.question}
            onTextFieldChange={onQuestionTextChange}
            onFileChange={onQuestionImageChange}
            onImageDelete={onQuestionFileRemove}
          />
        </div>
      </div>
      <div
        css={[
          topAnswersContainerStyles,
          { [mediaUp("sm")]: { paddingRight: "1rem" } },
        ]}
      >
        {correctAnswersElements.length > 0 && (
          <div css={answersContainerStyles}>{correctAnswersElements}</div>
        )}
        {(multipleAnswer || correctAnswersElements.length === 0) && (
          <Button
            sx={baseButtonStyles}
            type="button"
            onClick={onCorrectAnswerAdd}
          >
            Dodaj poprawną odpowiedź
          </Button>
        )}
      </div>
      <div
        css={[
          topAnswersContainerStyles,
          { [mediaUp("sm")]: { paddingLeft: "1rem" } },
        ]}
      >
        {wrongAnswersElements.length > 0 && (
          <div css={answersContainerStyles}>{wrongAnswersElements}</div>
        )}
        <Button sx={baseButtonStyles} type="button" onClick={onWrongAnswerAdd}>
          Dodaj błędną odpowiedź
        </Button>
      </div>
      <Button disabled={!canSubmit} sx={baseButtonStyles} type="submit">
        Zapisz pytanie i wróć
      </Button>
      <span css={[httpErrorStyles, {width:"100%", textAlign:"center"}]}>{httpError}</span>
    </form>
  );
};

export default SelectableAnswers;
