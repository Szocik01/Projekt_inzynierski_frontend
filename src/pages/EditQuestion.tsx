/** @jsxImportSource @emotion/react */

import SingleColumn from "../components/LayoutComponents/SingleColumn";
import ContentContainer from "../components/UtilityComponents/ContentContainer";
import { useCallback, useEffect, useState } from "react";
import SingleSelectableAnswers from "../components/EditQuestionComponents/QuestionTypeViews/SingleSelectableAnswers";
import MultipleSelectableAnswers from "../components/EditQuestionComponents/QuestionTypeViews/MultipleSelectableAnswers";
import { css } from "@emotion/react";
import { AuthSliceState } from "../storage/authSlice";
import { ReduxAppState } from "../storage/redux";
import { useSelector } from "react-redux";
import useHttp from "../hooks/useHttp";
import { API_CALL_URL_BASE } from "../utils/Constants";
import { useParams } from "react-router-dom";

const EditQuestion = () => {
  const [questionType, setQuestionType] = useState<{
    typeId: string;
    typeName: string;
  }>({
    typeId: "",
    typeName: "",
  });

  const { userId, token } = useSelector<ReduxAppState, AuthSliceState>(
    (state) => state.auth
  );

  const { quizId, questionId } = useParams();

  const [getQuestionType, isGetLoading] = useHttp(
    `${API_CALL_URL_BASE}/api/routers/http/controllers/question/get_type_question`,
    true
  );

  const [editQuestion, isEditQuestionLoading] = useHttp(
    `${API_CALL_URL_BASE}/api/routers/http/controllers/question/edit_question`
  );

  const handleGetResponse = useCallback((response: Response) => {
    return response.json().then((data) => {
      if (data.status_code >= 400 && data.status_code <= 599) {
        throw new Error(data.message);
      }
      setQuestionType({
        typeId: data.id,
        typeName: data.type,
      })
    });
  }, []);

  const handleGetError = useCallback((error: Error) => {
    console.warn(error.message);
  }, []);



  useEffect(() => {
    if (!token) {
      return;
    }
    getQuestionType(handleGetResponse, handleGetError, {
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
  }, [getQuestionType, handleGetResponse, handleGetError, token, questionId]);

  let viewToRender = null;

  if (questionType.typeName === "single") {
    viewToRender = (
      <SingleSelectableAnswers
        submitRequestFunction={editQuestion}
        userId={userId}
        token={token}
        quizId={quizId ? quizId : ""}
        typeId={questionType.typeId}
        questionId={questionId ? questionId : ""}
      />
    );
  }
  if (questionType.typeName === "multiple") {
    viewToRender = (
      <MultipleSelectableAnswers
        submitRequestFunction={editQuestion}
        userId={userId}
        token={token}
        quizId={quizId ? quizId : ""}
        typeId={questionType.typeId}
        questionId={questionId ? questionId : ""}
      />
    );
  }

  return (
    <SingleColumn>
      <ContentContainer
        title="Edytuj pytanie"
        customStyles={css({ ".innerContainer": { paddingTop: "1.5rem" } })}
        isLoading={isEditQuestionLoading || isGetLoading}
      >
        {viewToRender}
      </ContentContainer>
    </SingleColumn>
  );
};

export default EditQuestion;
