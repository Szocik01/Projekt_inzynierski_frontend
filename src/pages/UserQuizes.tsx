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
import SideRedirectSectionElement from "../components/UtilityComponents/SideRedirectSectionElement";
import { mediaUp } from "../utils/mediaQueries";
import UserQuizesListingCard from "../components/UserQuizesComponents/UserQuizesListingCard";
import ConfirmModal from "../components/UtilityComponents/ConfirmModal";

const noQuizesStyles = css({
  alignSelf: "center",
  justifySelf: "center",
});

const UserQuizes = () => {
  const [quizes, setQuizes] = useState<QuizPreviewData[]>([]);
  const [modalData, setModalData] = useState<{
    isVisible: boolean;
    quizId: string;
  }>({ isVisible: false, quizId: "" });

  const [getQuizes, isLoading] = useHttp(
    `${API_CALL_URL_BASE}/api/routers/http/controllers/quiz/get_quiz`,
    true
  );

  const [deleteQuiz, isDeleteLoading] = useHttp(
    `${API_CALL_URL_BASE}/api/routers/http/controllers/quiz/delete_quiz`
  );

  const { userId, token } = useSelector<ReduxAppState, AuthSliceState>(
    (state) => {
      return state.auth;
    }
  );

  function handleDeleteButtonClick(quizId: string) {
    setModalData({ isVisible: true, quizId: quizId });
  }

  function handleConfirmButtonClick(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    handleDeleteQuiz(event);
    setModalData({ isVisible: false, quizId: "" });
  }

  function handleCancelButtonClick() {
    setModalData({ isVisible: false, quizId: "" });
  }

  const handleDeleteResponse = (response: Response) => {
    return response.json().then((data) => {
      if (data.status_code >= 400 && data.status_code <= 599) {
        throw new Error(data.message);
      }
      setQuizes((prevValue) => {
        return prevValue.filter((quiz) => {
          return quiz.id !== modalData.quizId;
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
      body: JSON.stringify({ user_id: userId, id: modalData.quizId }),
    });
  }

  const handleResponse = useCallback((response: Response) => {
    return response.json().then((data) => {
      if (data.status_code >= 400 && data.status_code <= 599) {
        throw new Error(data.message);
      }
      setQuizes(data);
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
    <>
    <ConfirmModal
      isVisible={modalData.isVisible}
      title="Potwierdź wybór"
      description="Usunięcie quizu będzie nieodwracalne, a wszystkie pytania w nim zawarte zostaną utracone. Czy na pewno chcesz usunąć?"
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
          title="Stwórz Quiz"
          redirectionLink="/add-quiz"
          text="Ten prosty w obsłudze generator, pozwoli utworzyć ci swój własny
      oryginalny quiz! Kliknij w “+” i zaczynaj zabawę!"
        />
      }
    >
      <ContentContainer isLoading={isLoading} title="Twoje Quizy">
        {quizes.length === 0 && !isLoading && (
          <h4 css={noQuizesStyles}>Nie dodałeś jeszcze quizów</h4>
        )}
        {quizes.length > 0 &&
          !isLoading &&
          quizes.map((quiz) => {
            return (
              <UserQuizesListingCard
                key={quiz.id}
                quizId={quiz.id}
                imageUrl={quiz.link_image}
                title={quiz.name}
                content={quiz.description}
                editButtonRedirectionLink={`/edit-quiz/${quiz.id}`}
                cardRedirectionLink={`/user-questions/${quiz.id}`}
                onDeleteButtonClick={handleDeleteButtonClick}
                isLoading={isDeleteLoading && quiz.id === modalData.quizId}
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

export default UserQuizes;
