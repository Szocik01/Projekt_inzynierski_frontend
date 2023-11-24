/** @jsxImportSource @emotion/react */

import { SerializedStyles, css } from "@emotion/react";
import SingleColumn from "../components/LayoutComponents/SingleColumn";
import resolveLastWordColor from "../utils/ResolveLastWordColor";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { serializedBaseButtonStyles } from "../GlobalStyles";
import Card from "../components/MainPageComponents/Card";
import { mediaUp } from "../utils/mediaQueries";

const descriptionContainerStyles = css({
  color: "white",
  fontSize: "13px",
  width: "100%",
  display: "flex",
  justifyContent: "center",
});

const titleStyles = css({
  width: "100%",
  fontSize: "2.5rem",
  textShadow: "6px 6px 5px rgba(0, 0, 0, 0.25)",
  textAlign: "center",
});

const descriptionStyles = css({
  display: "block",
  maxWidth: "32rem",
  width: "100%",
  textAlign: "center",
});

const customCssStyles = css({
  padding: "0.5rem 2.5rem",
  fontSize: "1.1rem",
});

const cardsContainerStyles = css({
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
  alignItems: "center",
  padding: "1rem",
  gap: "1rem",
  [mediaUp("md")]: {
    padding: "5rem 0 1rem",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "unset",
    gap: 0
  },
});

const cardsDataArray: {
  imageUrl: string;
  title: string;
  description: string;
  customCss?: SerializedStyles;
}[] = [
  {
    imageUrl: "/images/mainCardsImages/world-image.svg",
    title: "Quizy z całego Świata!",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
  },
  {
    imageUrl: "/images/mainCardsImages/template-image.svg",
    title: "Prosty Szablon Quizów!",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    customCss: css({
      background: "#55B974",
      position: "relative",
      [mediaUp("md")]: {
        top: "-4rem",
      },
    }),
  },
  {
    imageUrl: "/images/mainCardsImages/score-image.svg",
    title: "Stań się Najlepszy!",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
  },
];

const Main = () => {
  return (
    <SingleColumn customCss={css({ rowGap: "1.5rem" })}>
      <h1 css={titleStyles}>
        {resolveLastWordColor("Wypróbuj swoich sił w <br/> Quizach!")}
      </h1>
      <div css={descriptionContainerStyles}>
        <span css={descriptionStyles}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </span>
      </div>
      <Link to="/quizes" css={{ margin: "0 auto" }}>
        <Button css={[serializedBaseButtonStyles, customCssStyles]}>
          Zaczynamy
        </Button>
      </Link>
      <div css={cardsContainerStyles}>
        {cardsDataArray.map((item) => {
          return <Card {...item} />;
        })}
      </div>
    </SingleColumn>
  );
};

export default Main;
