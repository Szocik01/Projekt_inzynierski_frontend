/** @jsxImportSource @emotion/react */

import ListingCard from "../UtilityComponents/ListingCard";
import { ListingCardProps } from "../../types/UtilityTypes";
import { css } from "@emotion/react";
import { API_CALL_URL_BASE } from "../../utils/Constants";
import useHttp from "../../hooks/useHttp";
import { useSelector } from "react-redux";
import { ReduxAppState } from "../../storage/redux";
import { AuthSliceState } from "../../storage/authSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ContentLoading from "../UtilityComponents/ContentLoading";
import { mediaUp } from "../../utils/mediaQueries";

const listingCardContainerStyles = css({
  position: "relative",
  width: "100%",
});

const buttonsContainerStyles = css({
  display: "flex",
  flexDirection: "row",
  gap: "0.5rem",
  position: "absolute",
  top: "0.2rem",
  right: "0.2rem",
  zIndex:10
});

const actionButtonSharedStyles = {
    minWidth: "auto",
    width:"1.4rem",
    height: "1.4rem",
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [mediaUp("sm")]:{
        width: "1.7rem",
        height: "1.7rem",
    }

};

type UserQuizesListingCardProps = ListingCardProps & {
  questionId: string;
  editButtonRedirectionLink?: string;
  onAfterHttpDeleteSuccess?: (quizId: string) => void;
  cardRedirectionLink?: string;
};

const UserQuestionsListingCard = (props: UserQuizesListingCardProps) => {
  const {
    questionId,
    title,
    imageUrl,
    customStyles,
    subtitle,
    content,
    onAfterHttpDeleteSuccess,
    editButtonRedirectionLink,
    cardRedirectionLink
  } = props;

  const [deleteQuiz, isLoading] = useHttp(
    `${API_CALL_URL_BASE}/api/routers/http/controllers/question/delete_question`
  );
  const { userId, token } = useSelector<ReduxAppState, AuthSliceState>(
    (state) => {
      return state.auth;
    }
  );

  const handleResponse = (response: Response) => {
    return response.json().then((data) => {
      if (data.status_code >= 400 && data.status_code <= 599) {
        throw new Error(data.message);
      }
      if (onAfterHttpDeleteSuccess) {
        onAfterHttpDeleteSuccess(questionId);
      }
    });
  };

  const handleError = (error: Error) => {
    console.warn(error.message);
  };

  function handleDeleteQuiz(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (token === "" || userId === "") {
      return;
    }
    deleteQuiz(handleResponse, handleError, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user_id: userId, id: questionId }),
    });
  }

  return (
    <div css={listingCardContainerStyles}>
      {isLoading && <ContentLoading blurOverlay coverParent />}
      <div css={buttonsContainerStyles}>
        <Button
          type="button"
          variant="contained"
          color="error"
          sx={actionButtonSharedStyles}
          onClick={handleDeleteQuiz}
        >
          <DeleteIcon sx={{ width: "90%", height: "90%", color: "white" }} />
        </Button>
        {editButtonRedirectionLink && (
          <Link to={editButtonRedirectionLink}>
            <Button
              type="button"
              variant="contained"
              sx={{
                backgroundColor: "#3EF83E",
                ...actionButtonSharedStyles,
                "&.MuiButtonBase-root.MuiButton-root:hover": {
                    backgroundColor: "#00BD00",
                  },
              }}
            >
              <EditIcon sx={{ width: "90%", height: "90%", color: "white" }} />
            </Button>
          </Link>
        )}
      </div>
      <ListingCard
        title={title}
        subtitle={subtitle}
        content={content}
        imageUrl={imageUrl}
        customStyles={customStyles}
        cardRedirectionLink={cardRedirectionLink}
      />
    </div>
  );
};

export default UserQuestionsListingCard;
