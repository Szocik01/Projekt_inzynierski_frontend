/** @jsxImportSource @emotion/react */

import SingleColumn from "../components/LayoutComponents/SingleColumn";
import ContentContainer from "../components/UtilityComponents/ContentContainer";
import { useCallback, useState } from "react";
import QuestionTypeSelectInput from "../components/AddQuestionComponents/QuestionTypeSelectInput";
import SingleSelectableAnswers from "../components/AddQuestionComponents/QuestionTypeViews/SingleSelectableAnswers";
import MultipleSelectableAnswers from "../components/AddQuestionComponents/QuestionTypeViews/MultipleSelectableAnswers";
import { css } from "@emotion/react";
import { AuthSliceState } from "../storage/authSlice";
import { ReduxAppState } from "../storage/redux";
import { useSelector } from "react-redux";
import useHttp from "../hooks/useHttp";
import { API_CALL_URL_BASE } from "../utils/Constants";
import { useParams } from "react-router-dom";

const AddQuestion = () => {
  const [questionType, setQuestionType] = useState<{id:string, typeName: string}>({id:"", typeName:""});

  const { userId, token } = useSelector<ReduxAppState, AuthSliceState>(
    (state) => state.auth
  );

  const { quizId } = useParams();

  const [addQuestion, isAddQuestionLoading] = useHttp(
    `${API_CALL_URL_BASE}/api/routers/http/controllers/question/add_questions`
  );

  const questionTypeChangeHandler =useCallback((id: string, typeName?: string) => {
    setQuestionType({id:id, typeName: typeName ? typeName : ""});
  },[])

  let viewToRender = null;

  if (questionType.typeName === "single") {
    viewToRender = (
      <SingleSelectableAnswers
        submitRequestFunction={addQuestion}
        userId={userId}
        token={token}
        quizId={quizId ? quizId : ""}
        typeId={questionType.id}
      />
    );
  }
  if (questionType.typeName === "multiple") {
    viewToRender = <MultipleSelectableAnswers
    submitRequestFunction={addQuestion}
    userId={userId}
    token={token}
    quizId={quizId ? quizId : ""}
    typeId={questionType.id}
    />;
  }

  return (
    <SingleColumn>
      <ContentContainer
        title="Dodaj pytanie"
        customStyles={css({ ".innerContainer": { paddingTop: "1.5rem" } })}
        isLoading={isAddQuestionLoading}
      >
        <QuestionTypeSelectInput
          onChange={questionTypeChangeHandler}
          value={questionType.id}
        />
        {viewToRender}
      </ContentContainer>
    </SingleColumn>
  );
};

export default AddQuestion;
