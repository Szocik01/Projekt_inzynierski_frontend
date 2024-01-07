/** @jsxImportSource @emotion/react */

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
import SingleAnswer from "../components/PlayQuizComponents/GameViews/SingleAnswer";
import MultipleAnswer from "../components/PlayQuizComponents/GameViews/MultipleAnswer";
import EndingPage from "../components/PlayQuizComponents/EndingPage";

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
    { userAnswers: { isAnsweredCorrectly: boolean } }[]
  >([]);

  const [getQuiz, isGetLoading] = useHttp(
    `${API_CALL_URL_BASE}/api/routers/http/controllers/game/get_game`,
    true
  );

  const { token, userId } = useSelector<ReduxAppState, AuthSliceState>(
    (state) => {
      return state.auth;
    }
  );

  const { quizId } = useParams();

  function getQuestionResultHandler(isAnsweredCorrectly: boolean) {
    userAnswersArrayRef.current.push({ userAnswers: { isAnsweredCorrectly } });
  }

  function changeQuestionHandler() {
    setActiveQuestion((prevState) => prevState + 1);
  }

  function endQuizHandler() {
    setSolvingQuiz(false);
  }

  function calculateScore() {
    let score = 0;
    userAnswersArrayRef.current.forEach((answer) => {
      if (answer.userAnswers.isAnsweredCorrectly) {
        score++;
      }
    });
    return score;
  }

  const handleResponse = useCallback((response: Response) => {
    return response.json().then((data) => {
      if (data.status_code >= 400 && data.status_code <= 599) {
        throw new Error(data.message);
      }
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
    getQuiz(handleResponse, handleError, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        quiz_id: quizId,
      }),
    });
  }, [getQuiz, handleResponse, handleError, quizId]);

  let viewToRender = null;

  if (questions.length === 0) {
    viewToRender = (
      <p css={{ width: "100%", textAlign: "center" }}>Brak pytań w quizie</p>
    );
  } else if (
    !isSolvingQuiz &&
    activeQuestion === 0 &&
    userAnswersArrayRef.current.length === 0
  ) {
    viewToRender = (
      <InvitationPage
        onBeginQuiz={() => setSolvingQuiz(true)}
        name={quizData.name}
        description={quizData.description}
        linkImage={quizData.linkImage}
      />
    );
  } else if (!isSolvingQuiz && activeQuestion === questions.length - 1) {
    viewToRender = (
      <EndingPage
        token={token}
        userId={userId}
        score={calculateScore()}
        totalQuestions={questions.length}
        quizName={quizData.name}
        quizId={quizData.id}
      />
    );
  } else if (questions[activeQuestion].type.type === "single") {
    viewToRender = (
      <SingleAnswer
        question={questions[activeQuestion].text}
        questionLinkImage={questions[activeQuestion].link_image}
        quizLength={questions.length}
        questionNumber={activeQuestion + 1}
        getResult={getQuestionResultHandler}
        onChangeQuestion={
          activeQuestion !== questions.length - 1
            ? changeQuestionHandler
            : endQuizHandler
        }
        answers={questions[activeQuestion].answers}
      />
    );
  } else if (questions[activeQuestion].type.type === "multiple") {
    viewToRender = (
      <MultipleAnswer
        question={questions[activeQuestion].text}
        questionLinkImage={questions[activeQuestion].link_image}
        quizLength={questions.length}
        questionNumber={activeQuestion + 1}
        getResult={getQuestionResultHandler}
        onChangeQuestion={
          activeQuestion !== questions.length - 1
            ? changeQuestionHandler
            : endQuizHandler
        }
        answers={questions[activeQuestion].answers}
      />
    );
  }

  return (
    <SingleColumn>
      <ContentContainer
        title={
          activeQuestion !== questions.length - 1
            ? "Rozegraj Quiz"
            : "Podsumowanie"
        }
        isLoading={isGetLoading}
      >
        {viewToRender}
      </ContentContainer>
    </SingleColumn>
  );
};

export default PlayQuiz;
