/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { useCallback, useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";
import { API_CALL_URL_BASE } from "../utils/Constants";
import { QuizPreviewData } from "../types/QuizesTypes";
import ContentContainer from "../components/UtilityComponents/ContentContainer";
import ListingCard from "../components/UtilityComponents/ListingCard";
import SingleColumn from "../components/LayoutComponents/SingleColumn";

const noQuizesStyles = css({
  alignSelf: "center",
  justifySelf: "center",
});

const Quizes = () => {
  const [quizes, setQuizes] = useState<QuizPreviewData[]>([]);

  const [getQuizes, isLoading] = useHttp(
    `${API_CALL_URL_BASE}/api/routers/http/controllers/quiz/get_all_quizzes`,
    true
  );

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
    getQuizes(handleResponse, handleError);
  }, [getQuizes, handleResponse, handleError]);

  return (
    <SingleColumn>
      <ContentContainer isLoading={isLoading} title="Wszystkie quizy">
        {quizes.length === 0 && !isLoading && (
          <h4 css={noQuizesStyles}>Brak quizów</h4>
        )}
        {quizes.length > 0 &&
          !isLoading &&
          quizes.map((quiz) => {
            return (
              <ListingCard
                key={quiz.id}
                title={quiz.name}
                content={quiz.description}
                imageUrl={quiz.link_image}
                cardRedirectionLink={`/play-quiz/${quiz.id}`}
              />
            );
          })}
      </ContentContainer>
    </SingleColumn>
  );
};

export default Quizes;
