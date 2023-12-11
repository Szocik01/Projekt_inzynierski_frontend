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
import { QuestionPreviewData } from "../types/QuizesTypes";
import SideRedirectSectionElement from "../components/UtilityComponents/SideRedirectSectionElement";
import { mediaUp } from "../utils/mediaQueries";
import UserQuestionsListingCard from "../components/UserQuestionsComponents/UserQuestionsListingCard";
import { useParams } from "react-router-dom";

const noQuestionsStyles = css({
  alignSelf: "center",
  justifySelf: "center",
});

const UserQuizQuestions = () => {
  const [questions, setQuestions] = useState<QuestionPreviewData[]>([]);

  const [getQuizes, isLoading] = useHttp(
    `${API_CALL_URL_BASE}/api/routers/http/controllers/question/only_questions`,
    true
  );
  const { userId, token } = useSelector<ReduxAppState, AuthSliceState>(
    (state) => {
      return state.auth;
    }
  );

  const { quizId } = useParams();

  function afterHttpDeleteSuccessHandler(questionId: string) {
    setQuestions((prevValue) => {
      return prevValue.filter((question) => {
        return question.id !== questionId;
      });
    });
  }

  const handleResponse = useCallback((response: Response) => {
    return response.json().then((data) => {
      if (data.status_code >= 400 && data.status_code <= 599) {
        throw new Error(data.message);
      }
      setQuestions(data);
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
      body: JSON.stringify({ user_id: userId, quiz_id: quizId }),
    });
  }, [getQuizes, handleResponse, handleError, token, userId, quizId]);

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
      sideElement={
        <SideRedirectSectionElement
          redirectionLink={`/add-question/${quizId}`}
          text="Ten prosty w obsłudze generator, pozwoli ci dodać pytania do twojego quizu! Kliknij w “+” i zaczynaj zabawę!"
        />
      }
    >
      <ContentContainer isLoading={isLoading} title="Twoje Quizy">
        {questions.length === 0 && !isLoading && (
          <h4 css={noQuestionsStyles}>
            Nie dodałeś jeszcze pytań do tego quizu.
          </h4>
        )}
        {questions.length > 0 &&
          !isLoading &&
          questions.map((question) => {
            return (
              <UserQuestionsListingCard
                key={question.id}
                questionId={question.id}
                imageUrl={question.link_image}
                title={question.text}
                editButtonRedirectionLink={`/edit-question/${quizId}/${question.id}`}
                onAfterHttpDeleteSuccess={afterHttpDeleteSuccessHandler}
                customStyles={css({
                  paddingRight: "3.5rem",
                  [mediaUp("sm")]: {
                    paddingRight: "4rem",
                  },
                })}
              />
            );
          })}
      </ContentContainer>
    </TwoColumns>
  );
};

export default UserQuizQuestions;
