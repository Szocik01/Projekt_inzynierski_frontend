/** @jsxImportSource @emotion/react */

import { SerializedStyles, css } from "@emotion/react";
import { FC } from "react";
import resolveLastWordColor from "../../utils/ResolveLastWordColor";
import { mediaUp } from "../../utils/mediaQueries";

const cardContainerStyles = css({
  flexShrink: 0,
  width: "90%",
  gap: "0.5rem",
  borderRadius: "10px",
  background: "linear-gradient(180deg, #FFF 41.79%, #243D24 104.29%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  aspectRatio: 1,
  padding: "1.2rem 1rem",

  [mediaUp("sm")]: {
    width: "70%",
  },

  [mediaUp("md")]: {
    width: "100%",
    maxWidth: "31.5%",
  },
});

const titleStyles = css({
  textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  fontSize: "1.5rem",
  textAlign: "center",
});

const imageStyles = css({
    maxWidth: "100%",
    height:"10rem",
    
    [mediaUp("sm")]:{
        height: "12rem",
    }

});

const descriptionStyles = css({
    fontSize:"0.7rem",
    [mediaUp("sm")]:{
        fontSize: "0.8rem",

    }
});

type CardProps = {
  customCss?: SerializedStyles;
  imageUrl: string;
  title: string;
  description: string;
};
const Card: FC<CardProps> = (props) => {
  const { customCss, imageUrl, title, description } = props;

  return (
    <div css={[cardContainerStyles, customCss]}>
      <img css={imageStyles} src={imageUrl} alt={title} />
      <h4 css={titleStyles}>{resolveLastWordColor(title)}</h4>
      <div css={descriptionStyles}>{description}</div>
    </div>
  );
};

export default Card;
