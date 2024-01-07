/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { mediaUp } from "../../utils/mediaQueries";
import { baseButtonStyles } from "../../GlobalStyles";
import { Button } from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import { API_CALL_URL_BASE } from "../../utils/Constants";
import ContentContainer from "../UtilityComponents/ContentContainer";

const containerStyles = css({
  width: "100%",
  padding: "2rem 0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "5rem",
  [mediaUp("md")]: {
    padding: "2rem 1rem",
  },
});

const summaryContainerStyles = css({
  width: "100%",
  backgroundColor: "#00000099",
  borderRadius: "10px",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1.5rem",
  [mediaUp("md")]: {
    height: "10rem",
    flexDirection: "row",
    gap: "0",
    alignItems: "unset",
  },
});

const circularDataContainer = css({
  position: "relative",
  width: "10rem",
  aspectRatio: "1/1",
  background: "#6DCF98aa",
  borderRadius: "50%",
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [mediaUp("md")]: {
    height: "14rem",
    width: "auto",
    top: "50%",
    transform: "translateY(-50%)",
  },
});

const middleCircularDataContainer = css({
  width: "8.5rem",
  aspectRatio: "1/1",
  background: "#ffffffcf",
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  [mediaUp("md")]: {
    height: "12.5rem",
    width: "auto",
  },
});

const circularDataDisplay = css({
  width: "7rem",
  aspectRatio: "1/1",
  background: "#2AB670",
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "nowrap",
  borderRadius: "50%",
  color: "#ffffff",
  span: {
    fontSize: "4rem",
    color: "#ffffff",
  },
  [mediaUp("md")]: {
    height: "11rem",
    width: "auto",
  },
});

const quizNameContainerStyles = css({
  fontSize: "1rem",
  paddingRight: "1rem",
  color: "#ffffff",
  flex: "1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [mediaUp("md")]: {
    paddingRight: "2rem",
    fontSize: "1.4rem",
    justifyContent: "flex-start",
    textAlign: "left",
  },
});

const scoreContainerStyles = css({
  fontSize: "1rem",
  paddingLeft: "1rem",
  color: "white",
  flex: "1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [mediaUp("md")]: {
    fontSize: "1.4rem",
    paddingLeft: "2rem",
    justifyContent: "flex-end",
    textAlign: "right",
  },
});

const rankingStyles = css({
  width: "100%",
  maxWidth: "25rem",
  backgroundColor: "#ffffffaa",
});

const rankingListStyles = css({
  width: "100%",
  listStyle: "none",
  margin: "0",
  display: "flex",
  flexDirection: "column",
  background: "#ffffff",
  borderRadius: "5px",
  padding: "0 0.5rem",
});

const rankingListElementsStyles = css({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  gap: "0.6rem",
  alignItems: "center",
  padding: "0.5rem",
  color: "black",
  fontSize: "1rem",
  "&:not(:last-of-type)": {
    borderBottom: "1px solid lightgray",
  },
  [mediaUp("md")]: {
    fontSize: "1.2rem",
  },
});

const placeNumberStyles = css({
  flex:"1 0 0",
  display: "flex",
  justifyContent: "flex-start",
  span:{
    fontSize: "1.1rem",
    aspectRatio: "1/1",
    width: "1.9rem",
    flexShrink: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
  }
});

const firstStyles = css({
  background:
    "linear-gradient(0deg, rgba(249,214,14,0.25) 0%, rgba(249,214,14,1) 100%)",
});

const secondStyles = css({
  background: "linear-gradient(0deg, rgba(199,235,234,0.25) 0%, rgba(183,227,226,1) 100%)"
});

const thirdStyles = css({
  background: "linear-gradient(0deg, rgba(158,113,23,0.25) 0%, rgba(158,113,23,1) 100%)"
});

const nameStyles = css({
  textAlign: "center",
  wordBreak: "break-word",
});

const pointsStyles = css({
  display: "flex",
  justifyContent: "flex-end",
  flex:"1 0 0",
});

type EndingPageProps = {
  score: number;
  totalQuestions: number;
  quizName: string;
  token: string;
  userId: string;
  quizId: string;
};

const EndingPage: FC<EndingPageProps> = (props) => {
  const [ranking, setRanking] = useState<
    {
      id: string;
      name: string;
      quiz_id: string;
      result: number;
      user_id: string;
    }[]
  >([]);

  const { score, totalQuestions, quizName, userId, token, quizId } = props;

  const [sendUserResult] = useHttp(
    `${API_CALL_URL_BASE}/api/routers/http/controllers/game/add_edit_result`,
    true
  );
  const [getRanking, isRankingLoading] = useHttp(
    `${API_CALL_URL_BASE}/api/routers/http/controllers/game/get_result`,
    true
  );

  const rankingListElements = ranking.map((rankingElement, index) => {
    return (
      <li key={rankingElement.id} css={rankingListElementsStyles}>
        <div
          css={[
            placeNumberStyles,
          ]}
        >
          <span css={[
            index === 0 && firstStyles,
            index === 1 && secondStyles,
            index === 2 && thirdStyles,
          ]}>
          {index + 1}.
          </span>
        </div>
        <span css={nameStyles}>{rankingElement.name}</span>
        <span css={pointsStyles}>{rankingElement.result}/{totalQuestions}</span>
      </li>
    );
  });

  const handleSendResponse = useCallback((response: Response) => {
    return response.json().then((data) => {
      if (data.status_code >= 400 && data.status_code <= 599) {
        throw new Error(data.message);
      }
    });
  }, []);

  const handleSendError = useCallback((error: Error) => {
    console.warn(error);
  }, []);

  const handleGetResponse = useCallback((response: Response) => {
    return response.json().then((data) => {
      if (data.status_code >= 400 && data.status_code <= 599) {
        throw new Error(data.message);
      }
      setRanking(data);
    });
  }, []);

  const handleGetError = useCallback((error: Error) => {
    console.warn(error.message);
  }, []);

  useEffect(() => {
    if (!userId || !token) {
      getRanking(handleGetResponse, handleGetError, {
        method: "POST",
        body: JSON.stringify({ quiz_id: quizId, limit: 5 }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    } else {
      sendUserResult(handleSendResponse, handleSendError, {
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          quiz_id: quizId,
          result: score,
        }),
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then(() => {
        getRanking(handleGetResponse, handleGetError, {
          method: "POST",
          body: JSON.stringify({ quiz_id: quizId, limit: 5 }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
      });
    }
  }, [
    getRanking,
    sendUserResult,
    userId,
    token,
    quizId,
    handleGetResponse,
    handleGetError,
    handleSendResponse,
    handleSendError,
    score,
  ]);

  return (
    <div css={containerStyles}>
      <div css={summaryContainerStyles}>
        <div css={quizNameContainerStyles}>{quizName}</div>
        <div css={circularDataContainer}>
          <div css={middleCircularDataContainer}>
            <div css={circularDataDisplay}>
              <span>
                {parseInt(((score / totalQuestions) * 100).toString())}
              </span>
              %
            </div>
          </div>
        </div>
        <div
          css={scoreContainerStyles}
        >{`Udzielono ${score} poprawnych odpowiedzi na ${totalQuestions} pytania!`}</div>
      </div>
      <ContentContainer
        customStyles={rankingStyles}
        title="Ranking"
        isLoading={isRankingLoading}
      >
        {!isRankingLoading && ranking.length === 0 && <div>Brak wyników</div>}
        {!isRankingLoading && ranking.length !== 0 && (
          <ul css={rankingListStyles}>{rankingListElements}</ul>
        )}
      </ContentContainer>
      <Link to="/quizes">
        <Button sx={baseButtonStyles}>Zakończ Quiz</Button>
      </Link>
    </div>
  );
};

export default EndingPage;
