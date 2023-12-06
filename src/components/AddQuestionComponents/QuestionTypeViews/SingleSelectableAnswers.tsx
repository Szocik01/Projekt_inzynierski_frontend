/** @jsxImportSource @emotion/react */

import { FC, FormEvent, useEffect, useState } from "react";
import SelectableAnswers from "./SelectableAnswers";
import {
  AnswersViewProps,
  SelectableAnswerType,
  SelectableQuestionType,
} from "../../../types/QuizesTypes";
import { ImageMimeTypesMap } from "../../../utils/Maps";

const SingleSelectableAnswers: FC<AnswersViewProps> = (props) => {
  const [questionData, setQuestionData] = useState<SelectableQuestionType>({
    id: "",
    userId: "",
    quizId: "",
    text: "",
    linkImage: "",
    file: null,
  });
  const [answerData, setAnswerData] = useState<SelectableAnswerType[]>([]);
  const [fileErrors, setFileErrors] = useState<{ [key: string]: string }>({});
  const [httpError, setHttpError] = useState("");

  const { token, userId, submitRequestFunction, quizId, typeId } = props;

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
    if (id === undefined) {
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

  function handleResponse(response: Response) {
    return response.json().then((data) => {
      if (data.status_code >= 400 && data.status_code <= 599) {
        throw new Error(data.message);
      }
    });
  }

  function handleError(error: Error) {
    setHttpError(error.message);
  }

  function addQuestionHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHttpError("");
    if (!validateInputsResult) {
      setHttpError("Podano niepoprawne dane.");
      return;
    }
    const formData = new FormData();
    formData.append("quiz_id", quizId);
    formData.append("type_id", typeId);
    formData.append("user_id", userId);
    formData.append("text", questionData.text);
    if (questionData.file) {
      formData.append("image", questionData.file);
    }
    const mappedAnswerData = answerData.map((answer)=>{
      if (answer.file !== null) {
        formData.append(`array_answers_image`, answer.file as Blob, `${answer.id}.${ImageMimeTypesMap[answer.file.type]}`);
      }
      return {
        index: answer.id,
        text: answer.text,
        answer_type: +answer.answerType,
      }
    })
    formData.append("array_answers", JSON.stringify(mappedAnswerData));
    console.log(formData.getAll("array_answers_image"));
    // console.log(formData.getAll("array_answers"));
    // submitRequestFunction(handleResponse, handleError, {
    //   method: "POST",
    //   headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    //   body: formData,
    // });
  }

  // useEffect(() => {
  //   console.log(questionData, answerData, fileErrors);
  // }, [questionData, answerData, fileErrors]);

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

export default SingleSelectableAnswers;
