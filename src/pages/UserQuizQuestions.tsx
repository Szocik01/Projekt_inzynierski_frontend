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
import ConfirmModal from "../components/UtilityComponents/ConfirmModal";

const noQuestionsStyles = css({
  alignSelf: "center",
  justifySelf: "center",
});

const UserQuizQuestions = () => {
  const [questions, setQuestions] = useState<QuestionPreviewData[]>([]);
  const [modalData, setModalData] = useState<{
    isVisible: boolean;
    questionId: string;
  }>({ isVisible: false, questionId: "" });

  const [getQuizes, isGetLoading] = useHttp(
    `${API_CALL_URL_BASE}/api/routers/http/controllers/question/only_questions`,
    true
  );

  const [deleteQuiz, isDeleteLoading] = useHttp(
    `${API_CALL_URL_BASE}/api/routers/http/controllers/question/delete_question`
  );

  const { userId, token } = useSelector<ReduxAppState, AuthSliceState>(
    (state) => {
      return state.auth;
    }
  );

  const { quizId } = useParams();

  function handleDeleteButtonClick(questionId: string) {
    setModalData({ isVisible: true, questionId: questionId });
  }

  function handleConfirmButtonClick(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    handleDeleteQuiz(event);
    setModalData({ isVisible: false, questionId: "" });
  }

  function handleCancelButtonClick() {
    setModalData({ isVisible: false, questionId: "" });
  }

  const handleDeleteResponse = (response: Response) => {
    return response.json().then((data) => {
      if (data.status_code >= 400 && data.status_code <= 599) {
        throw new Error(data.message);
      }
      setQuestions((prevValue) => {
        return prevValue.filter((question) => {
          return question.id !== modalData.questionId;
        });
      });
    });
  };

  const handleDeleteError = (error: Error) => {
    console.warn(error.message);
  };

  function handleDeleteQuiz(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (token === "" || userId === "") {
      return;
    }
    deleteQuiz(handleDeleteResponse, handleDeleteError, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user_id: userId, id: modalData.questionId }),
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
    <>
      <ConfirmModal
        isVisible={modalData.isVisible}
        title="Potwierdź wybór"
        description="Usunięcie pytania będzie nieodwracalne, a wszystkie treści w nim zawarte zostaną utracone. Czy na pewno chcesz usunąć?"
        cancelButtonText="Anuluj"
        confirmButtonText="Usuń"
        onConfirm={handleConfirmButtonClick}
        onCancel={handleCancelButtonClick}
        onClose={handleCancelButtonClick}
      />
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
            title={"Dodaj pytanie"}
            redirectionLink={`/add-question/${quizId}`}
            text="Ten prosty w obsłudze generator, pozwoli ci dodać pytania do twojego quizu! Kliknij w “+” i zaczynaj zabawę!"
          />
        }
      >
        <ContentContainer isLoading={isGetLoading} title="Twoje Quizy">
          {questions.length === 0 && !isGetLoading && (
            <h4 css={noQuestionsStyles}>
              Nie dodałeś jeszcze pytań do tego quizu.
            </h4>
          )}
          {questions.length > 0 &&
            !isGetLoading &&
            questions.map((question) => {
              return (
                <UserQuestionsListingCard
                  questionId={question.id}
                  key={question.id}
                  imageUrl={question.link_image}
                  title={question.text}
                  editButtonRedirectionLink={`/edit-question/${quizId}/${question.id}`}
                  isLoading={
                    isDeleteLoading && question.id === modalData.questionId
                  }
                  onDeleteButtonClick={handleDeleteButtonClick}
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
    </>
  );
};

export default UserQuizQuestions;
