/** @jsxImportSource @emotion/react */

import { FC, FormEvent, useCallback, useEffect, useRef, useState } from "react";
import SelectableAnswers from "../../QuestionUtilityComponents/SelectableAnswers";
import {
  EditAnswersViewProps,
  SelectableAnswerType,
  SelectableQuestionType,
} from "../../../types/QuizesTypes";
import { ImageMimeTypesMap } from "../../../utils/Maps";
import { useNavigate } from "react-router-dom";
import { API_CALL_URL_BASE } from "../../../utils/Constants";
import useHttp from "../../../hooks/useHttp";
import ContentLoading from "../../UtilityComponents/ContentLoading";

const MultipleSelectableAnswers: FC<EditAnswersViewProps> = (props) => {
  const [questionData, setQuestionData] = useState<SelectableQuestionType>({
    quizId: "",
    id: "",
    text: "",
    linkImage: "",
    file: null,
  });
  const [answerData, setAnswerData] = useState<SelectableAnswerType[]>([]);
  const [fileErrors, setFileErrors] = useState<{ [key: string]: string }>({});
  const [httpError, setHttpError] = useState("");

  const { token, userId, submitRequestFunction, quizId, typeId, questionId } = props;

  const navigator = useNavigate();

  const deletedAnswersArrayRef = useRef<string[]>([]); 

  const [getQuestion, isGetLoading] = useHttp(
    `${API_CALL_URL_BASE}/api/routers/http/controllers/question/get_single_question`,
    true
  );

  const handleGetResponse = useCallback((response: Response) => {
    return response.json().then((data) => {
      if (data.status_code >= 400 && data.status_code <= 599) {
        throw new Error(data.message);
      }
      setQuestionData({
        id: data.id,
        linkImage: data.link_image,
        text: data.text,
        file: null,
      });
      setAnswerData(data.array_answer.map((answer: any) => {
        return {
          answerType: answer.answer_type,
          id: answer.id,
          linkImage: answer.link_image,
          text: answer.text,
          file: null,
        }
      }));
    });
  }, []);

  const handleGetError = useCallback((error: Error) => {
    console.warn(error.message);
  }, []);


  const correctAnswers = answerData.filter((answer) => {
    return answer.answerType;
  });

  const wrongAnswers = answerData.filter((answer) => {
    return !answer.answerType;
  });

  function addAnswerHandler(answerType: boolean) {
    setAnswerData((prevState) => {
      let id = "";
      if(prevState.length === 0 || isNaN(+prevState[prevState.length - 1].id)) {
        id = "1";
      }
      else {
        id = (+prevState[prevState.length - 1].id + 1).toString();
      }
      return [
        ...prevState,
        {
          id: id,
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
    if (questionData.text === "" && questionData.file === null && questionData.linkImage === "") {
      return false;
    }
    if (correctAnswers.length === 0) {
      return false;
    }
    if (wrongAnswers.length === 0) {
      return false;
    }
    for (const answer of correctAnswers) {
      if (answer.text === "" && answer.file === null && answer.linkImage === "") {
        return false;
      }
    }
    for (const answer of wrongAnswers) {
      if (answer.text === "" && answer.file === null && answer.linkImage === "") {
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
    deletedAnswersArrayRef.current.push(id);
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
        linkImage: "",
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
            linkImage: "",
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
      navigator(`/quiz-questions/${quizId}`);
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
    formData.append("question_id", questionId);
    formData.append("quiz_id", quizId);
    formData.append("type_id", typeId);
    formData.append("user_id", userId);
    formData.append("text", questionData.text);
    if (questionData.file) {
      formData.append("image", questionData.file);
    }
    else{
      formData.append("image", questionData.linkImage);
    }
    deletedAnswersArrayRef.current.forEach((id)=>{
      formData.append("delete_answers[]",id);
    });

    const mappedNewAnswerData = answerData.filter((answer)=>{
      return !isNaN(+answer.id);
    }).map((answer)=>{
      if (answer.file !== null) {
        formData.append(`array_images[]`, answer.file as Blob, `${answer.id}.${ImageMimeTypesMap[answer.file.type]}`);
      }
      return {
        index: answer.id,
        text: answer.text,
        answer_type: +answer.answerType,
      }
    })

    const mappedOldAnswerData = answerData.filter((answer)=>{
      return isNaN(+answer.id);
    }).map((answer)=>{
      if (answer.file !== null) {
        formData.append(`array_images[]`, answer.file as Blob, `${answer.id}.${ImageMimeTypesMap[answer.file.type]}`);
      }
      return {
        index: answer.id,
        text: answer.text,
        answer_type: +answer.answerType,
        delete_image: answer.linkImage === "" ? 1 : 0,
      }
    });
    formData.append("array_answers", JSON.stringify(mappedNewAnswerData));
    formData.append("array_answers_edit", JSON.stringify(mappedOldAnswerData));
    console.log(formData.get("array_answers"));
    console.log(formData.get("array_answers_edit"));
    console.log(formData.get("delete_answers[]"));
    console.log(formData.get("image"));
    console.log(formData.get("array_images[]"));
    console.log(formData.get("question_id"));
    console.log(formData.get("quiz_id"));
    console.log(formData.get("type_id"));
    console.log(formData.get("user_id"));

    submitRequestFunction(handleResponse, handleError, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      body: formData,
    });
  }

  useEffect(() => {
    getQuestion(handleGetResponse, handleGetError, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({
        id: questionId,
      }),
    });
  }, [getQuestion, handleGetResponse, handleGetError, token, questionId]);

  return (
    <>
    {isGetLoading && <ContentLoading coverParent blurOverlay/>}
    <SelectableAnswers
      multipleAnswer={true}
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
      httpError={httpError}
    />
    </>
  );
};

export default MultipleSelectableAnswers;
