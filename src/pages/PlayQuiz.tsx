/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import useHttp from "../hooks/useHttp";
import { API_CALL_URL_BASE } from "../utils/Constants";
import { useCallback, useEffect, useRef, useState } from "react";
import { ReduxAppState } from "../storage/redux";
import { AuthSliceState } from "../storage/authSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ContentContainer from "../components/UtilityComponents/ContentContainer";
import SingleColumn from "../components/LayoutComponents/SingleColumn";
import { PlayQuizAnswerData, PlayQuizQuestionData } from "../types/QuizesTypes";
import InvitationPage from "../components/PlayQuizComponents/InvitationPage";

const PlayQuiz = () => {
  const [isSolvingQuiz, setSolvingQuiz] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [quizData, setQuizData] = useState<{
    name: string;
    description: string;
    id: string;
    linkImage: string;
  }>({
    name: "",
    description: "",
    id: "",
    linkImage: "",
  });
  const [questions, setQuestions] = useState<
    PlayQuizQuestionData<PlayQuizAnswerData>[]
  >([]);

  const userAnswersArrayRef = useRef<
    { userAnswers: { answerId: string; answerType: boolean }[] }[]
  >([]);

  const [getQuiz, isGetLoading] = useHttp(
    `${API_CALL_URL_BASE}/api/routers/http/controllers/game/get_game`,
    true
  );

  const { userId, token } = useSelector<ReduxAppState, AuthSliceState>(
    (state) => {
      return state.auth;
    }
  );

  const { quizId } = useParams();

  const handleResponse = useCallback((response: Response) => {
    return response.json().then((data) => {
      if (data.status_code >= 400 && data.status_code <= 599) {
        throw new Error(data.message);
      }
      console.log(data);
      setQuizData({
        name: data.name,
        description: data.description,
        id: data.id,
        linkImage: data.link_image,
      });
      setQuestions(data.questions);
    });
  }, []);

  const handleError = useCallback((error: Error) => {
    console.warn(error.message);
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }
    getQuiz(handleResponse, handleError, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        quiz_id: quizId,
      }),
    });
  }, [token, getQuiz, handleResponse, handleError, quizId]);

  let viewToRender = null;

  if (!isSolvingQuiz && activeQuestion === 0) {
    viewToRender = (
      <InvitationPage
        onBeginQuiz={() => setSolvingQuiz(true)}
        name={quizData.name}
        description={quizData.description}
        linkImage={quizData.linkImage}
      />
    );
  } else if (!isSolvingQuiz && activeQuestion === questions.length - 1) {
    viewToRender = null; // strona zakończenia quizu
  }

  return (
    <SingleColumn>
      <ContentContainer
        title="Rozegraj Quiz"
        isLoading={isGetLoading}
      >
        {viewToRender}
      </ContentContainer>
    </SingleColumn>
  );
};

export default PlayQuiz;
