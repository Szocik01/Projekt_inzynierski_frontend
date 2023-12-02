/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { mediaUp } from "../../utils/mediaQueries";
import { ListingCardProps } from "../../types/UtilityTypes";
import { Link } from "react-router-dom";

const listingCardStyles = css({
  position: "relative",
  width: "100%",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.20);",
  background: "#FFFFFFaa",
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  gap: "0.4rem",
  "&:hover": {
    "& img": {
      transform: "scale(1.03)",
    },
  },
  [mediaUp("sm")]: {
    gap: "1rem",
  }
});

const imageContainerStyles = css({
  width: "100%",
  minWidth: "80px",
  maxWidth: "210px",
  aspectRatio: "5/3",
  overflow: "hidden",
  cursor: "pointer",
  backgroundColor: "lightgray",
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    OObjectFit: "cover",
    OObjectPosition: "center",
    transition: "transform 0.3s ease-out",
  },
});

const textContainerStyles = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.3rem",
  width: "100%",
  padding: "0.5rem",
  color: "#000",
  ".title": {
    fontSize: "1rem",
    fontWeight: "bold",
    wordBreak: "break-word",
    display:"-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  ".subtitle": {
    fontSize: "0.85rem",
    wordBreak: "break-word",
    display:"-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  ".content": {
    fontSize: "0.7rem",
    color: "#000000cc",
    wordBreak: "break-word",
    display:"-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  [mediaUp("sm")]: {
    ".title": {
      fontSize: "1.2rem",
    },
    ".subtitle": {
      fontSize: "1rem",
    },
    ".content": {
      fontSize: "0.8rem",
    },
  },
});

const linkStyles = css({
  position: "absolute",
  inset: 0,
})

const ListingCard = (props: ListingCardProps) => {
  const { customStyles, imageUrl, title, subtitle, content, cardRedirectionLink } = props;
  return (
    <div css={[listingCardStyles, customStyles]}>
      {cardRedirectionLink && <Link to={cardRedirectionLink} css={linkStyles}></Link>}
      <div
        className="image-container"
        css={[imageContainerStyles, imageUrl && { backgroundColor: "gray" }]}
      >
        {imageUrl && <img src={imageUrl} alt={title} />}
      </div>
      <div className="text-container" css={textContainerStyles}>
        {title && <h3 className="title">{props.title}</h3>}
        {subtitle && <span className="subtitle">{subtitle}</span>}
        {content && <p className="content">{content}</p>}
      </div>
    </div>
  );
};

export default ListingCard;
