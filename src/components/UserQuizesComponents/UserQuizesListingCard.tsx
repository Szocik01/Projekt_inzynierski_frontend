/** @jsxImportSource @emotion/react */

import ListingCard from "../UtilityComponents/ListingCard";
import { ListingCardProps } from "../../types/UtilityTypes";
import { css } from "@emotion/react";
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
  zIndex: 10,
});

const actionButtonSharedStyles = {
  minWidth: "auto",
  width: "1.4rem",
  height: "1.4rem",
  padding: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [mediaUp("sm")]: {
    width: "1.7rem",
    height: "1.7rem",
  },
};

type UserQuizesListingCardProps = ListingCardProps & {
  quizId: string;
  editButtonRedirectionLink?: string;
  cardRedirectionLink?: string;
  onDeleteButtonClick?: (quizId: string) => void;
  isLoading?: boolean;
};

const UserQuizesListingCard = (props: UserQuizesListingCardProps) => {
  const {
    quizId,
    title,
    imageUrl,
    customStyles,
    subtitle,
    content,
    isLoading,
    onDeleteButtonClick,
    editButtonRedirectionLink,
    cardRedirectionLink,
  } = props;

  function handleDeleteButtonClick() {
    if (onDeleteButtonClick) {
      onDeleteButtonClick(quizId);
    }
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
          onClick={handleDeleteButtonClick}
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

export default UserQuizesListingCard;
