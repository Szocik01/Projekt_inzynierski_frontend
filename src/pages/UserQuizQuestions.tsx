/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import TwoColumns from "../components/LayoutComponents/TwoColumns";
import { useCallback, useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";
import { API_CALL_URL_BASE } from "../utils/Constants";
import ContentContainer from "../components/UtilityComponents/ContentContainer";
import { useSelector } from "react-redux";
import { ReduxAppState } from "../storage/redux";
import { AuthSliceState } from "../storage/authSlice";
import { QuizPreviewData } from "../types/QuizesTypes";
import AddQuizRedirectSection from "../components/UtilityComponents/AddQuizRedirectSection";
import { mediaUp } from "../utils/mediaQueries";
import UserQuizesListingCard from "../components/UserQuizesComponents/UserQuizesListingCard";

const noQuestionsStyles = css({
  alignSelf: "center",
  justifySelf: "center",
});

const UserQuizQuestions = () => {
  const [questions, setQuestions] = useState<QuizPreviewData[]>([]);

  const [getQuizes, isLoading] = useHttp(
    `${API_CALL_URL_BASE}/api/routers/http/controllers/quiz/get_quiz`,
    true
  );
  const { userId, token } = useSelector<ReduxAppState, AuthSliceState>(
    (state) => {
      return state.auth;
    }
  );

    function afterHttpDeleteSuccessHandler(quizId: string) {
        setQuestions((prevValue) => {
        return prevValue.filter((quiz) => {
          return quiz.id !== quizId;
        });
      });
    }

  const handleResponse = useCallback((response: Response) => {
    return response.json().then((data) => {
      if (data.status_code >= 400 && data.status_code <= 599) {
        throw new Error(data.message);
      }
      console.log(data);
    //   setQuestions(data);
    });
  }, []);

  const handleError = useCallback((error: Error) => {
    console.warn(error.message);
  }, []);

  useEffect(() => {
    if (token === "" || userId === "") {
      return;
    }
    getQuizes(handleResponse, handleError, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user_id: userId }),
    });
  }, [getQuizes, handleResponse, handleError, token, userId]);

  return (
    <TwoColumns
      wrapperContainerCustomCss={css({
        flexDirection: "column-reverse",
        [mediaUp("md")]: {
          flexDirection: "row",
        },
      })}
      asideColumnCustomCss={css({
        padding: "0.5rem 0.8rem",
      })}
      mainColumnCustomCss={css({
        padding: "0.5rem 0.8rem",
      })}
      sideElement={<AddQuizRedirectSection />}
    >
      <ContentContainer isLoading={isLoading} title="Twoje Quizy">
        {(questions.length === 0 && !isLoading) && <h4 css={noQuestionsStyles}>Nie dodałeś jeszcze pytań do tego quizu.</h4>} 
        {(questions.length > 0 && !isLoading) && questions.map((question) => {
            return (
                <UserQuizesListingCard
                key={question.id}
                  quizId={question.id}
                  imageUrl={question.link_image}
                  title={question.name}
                  content={question.description}
                  editButtonRedirectionLink={`/edit-quiz/${question.id}`}
                  cardRedirectionLink="/quizes"
                  onAfterHttpDeleteSuccess={afterHttpDeleteSuccessHandler}
                  customStyles={css({
                    paddingRight: "3.5rem",
                    [mediaUp("sm")]: {
                      paddingRight: "4rem",
                    },
                  })}
                />
            );
          }
        )}
      </ContentContainer>
    </TwoColumns>
  );
};

export default UserQuizQuestions;