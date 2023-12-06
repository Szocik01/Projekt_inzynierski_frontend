/** @jsxImportSource @emotion/react */

import { FormEvent, useEffect, useState } from "react";
import SelectableAnswers from "./SelectableAnswers";
import {
  SelectableAnswerType,
  SelectableQuestionType,
} from "../../../types/QuizesTypes";

const MultipleSelectableAnswers = () => {
  const [questionData, setQuestionData] = useState<SelectableQuestionType>({
    id: "",
    userId: "",
    quizId: "",
    text: "",
    linkImage: "",
    file: null,
    questionType: {
      id: "",
      name: "",
    },
  });
  const [answerData, setAnswerData] = useState<SelectableAnswerType[]>([]);
  const [fileErrors, setFileErrors] = useState<{ [key: string]: string }>({});

  const correctAnswers = answerData.filter((answer) => {
    return answer.answerType;
  });

  const wrongAnswers = answerData.filter((answer) => {
    return !answer.answerType;
  });

  function addAnswerHandler(answerType: boolean) {
    setAnswerData((prevState) => {
      return [
        ...prevState,
        {
          id:
            prevState.length !== 0
              ? (+prevState[prevState.length - 1].id + 1).toString()
              : "1",
          questionId: "",
          text: "",
          linkImage: "",
          file: null,
          answerType: answerType,
        },
      ];
    });
  }

  function fileValidationHandler(file: File) {
    let validationResult = "";
    const allowedExtensionsRegex = /\.(jpg|jpeg|png|svg)$/i;
    if (!allowedExtensionsRegex.test(file.name)) {
      validationResult = "Niedozwolone rozszerzenie pliku.";
    }

    if (file.name.includes(" ")) {
      validationResult = "Nazwa pliku nie może zawierać spacji.";
    }

    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      validationResult =
        "Plik przekracza dozwolony rozmiar (maksymalnie 5 MB).";
    }
    return validationResult;
  }

  function validateInputs() {
    if (questionData.text === "" && questionData.file === null) {
      return false;
    }
    if (correctAnswers.length !== 1) {
      return false;
    }
    if (wrongAnswers.length === 0) {
      return false;
    }
    for (const answer of correctAnswers) {
      if (answer.text === "" && answer.file === null) {
        return false;
      }
    }
    for (const answer of wrongAnswers) {
      if (answer.text === "" && answer.file === null) {
        return false;
      }
    }
    return true;
  }

  const validateInputsResult = validateInputs();

  function questionFileChangeHandler(files: FileList) {
    setFileErrors((prevState) => {
        const newState = { ...prevState };
        delete newState.question;
        return newState;
      });
    const file = files[0];
    const validationResult = fileValidationHandler(file);
    if (validationResult !== "") {
      setFileErrors((prevState) => {
        return {
          ...prevState,
          question: validationResult,
        };
      });
      return;
    }
    setQuestionData((prevState) => {
      return {
        ...prevState,
        file: file,
      };
    });
  }

  function questionTextChangeHandler(text: string) {
    setQuestionData((prevState) => {
      return {
        ...prevState,
        text: text,
      };
    });
  }

  function answerFileChangeHandler(files: FileList, id?: string) {
    if (id === undefined) {
      return;
    }
    setFileErrors((prevState) => {
      const newState = { ...prevState };
      delete newState[id];
      return newState;
    });
    const file = files[0];
    const validationResult = fileValidationHandler(file);
    if (validationResult !== "") {
      setFileErrors((prevState) => {
        return {
          ...prevState,
          [id]: validationResult,
        };
      });
      return;
    }
    setAnswerData((prevState) => {
      return prevState.map((answer) => {
        if (answer.id === id) {
          return {
            ...answer,
            file: file,
          };
        }
        return answer;
      });
    });
  }

  function onAnswerTextChange(text: string, id?: string) {
    if (id === undefined) {
      return;
    }
    setAnswerData((prevState) => {
      return prevState.map((answer) => {
        if (answer.id === id) {
          return {
            ...answer,
            text: text,
          };
        }
        return answer;
      });
    });
  }

  function addQuestionHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function removeAnswerHandler(id?: string) {
    if (id === undefined) {
      return;
    }
    setFileErrors((prevState) => {
        const newState = { ...prevState };
        delete newState[id];
        return newState;
        });
    setAnswerData((prevState) => {
      return prevState.filter((answer) => {
        return answer.id !== id;
      });
    });
  }

  function questionDeleteImageHandler() {
    setQuestionData((prevState) => {
      return {
        ...prevState,
        file: null,
      };
    });
  }

  function answerDeleteImageHandler(id?: string) {
    if(id === undefined){
      return;
    }
    setAnswerData((prevState) => {
      return prevState.map((answer) => {
        if (answer.id === id) {
          return {
            ...answer,
            file: null,
          };
        }
        return answer;
      });
    });
  }

  useEffect(() => {
    console.log(questionData, answerData,fileErrors);
  }, [questionData, answerData,fileErrors]);

  return (
    <SelectableAnswers
      multipleAnswer={false}
      question={questionData}
      correctAnswers={correctAnswers}
      wrongAnswers={wrongAnswers}
      onQuestionImageChange={questionFileChangeHandler}
      onQuestionTextChange={questionTextChangeHandler}
      onAnswerAdd={addAnswerHandler}
      onAnswerImageChange={answerFileChangeHandler}
      onAnswerTextChange={onAnswerTextChange}
      onAnswerRemove={removeAnswerHandler}
      onSubmit={addQuestionHandler}
      onAnswerFileRemove={answerDeleteImageHandler}
      onQuestionFileRemove={questionDeleteImageHandler}
      canSubmit={validateInputsResult}
      fileErrors={fileErrors}
    />
  );
};

export default MultipleSelectableAnswers;
