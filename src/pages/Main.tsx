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
    description: `Na Quiz Manii znajdziesz quizy z wielu różnych dziedzin, które oraz wielu zakątków świata! Znajdziesz tu quizy z geografii, historii, sportu, muzyki, filmu i wielu innych! Sprawdź swoją wiedzę o świecie i pokaż że nie masz sobie równych!`,
  },
  {
    imageUrl: "/images/mainCardsImages/template-image.svg",
    title: "Prosty Szablon Quizów!",
    description: `Rozwiązywanie quizów nigdy nie było prostsze. Zaznaczasz odpowiedź, zapisujesz ją i od razu widzisz czy odpowiedziałeś poprawnie. Na koniec quizu porównaj swoje wyniki ze znajomymi, dzięki szczegółowemu podsumowaniu i rankingowi najlepszych graczy!`,
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
    description: `Może chcesz spwdzić swoją wiedzę z użytkownikami z różnych stron świata? Nic prostszego! Rozwiąż quiz, a następnie sprawdź poprawność swoich odpowiedzi i swoją pozycję w rankingu podsumowującym quiz! Pokaż wszystkim na co cię stać!`,
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
          Witamy Cię na stronie, gdzie żadne pytanie nie pozostanie bez odpowiedzi!
          Spróbuj swoich sił w quizach z różnych dziedzin i stań się najlepszy wśród wszystkich graczy
          lub stwórz własny quiz i daj się wykazać innym. Decyzja należy tylko do Ciebie!
        </span>
      </div>
      <Link to="/quizes" css={{ margin: "0 auto" }}>
        <Button css={[serializedBaseButtonStyles, customCssStyles]}>
          Zaczynamy
        </Button>
      </Link>
      <div css={cardsContainerStyles}>
        {cardsDataArray.map((item,index) => {
          return <Card key={index} {...item} />;
        })}
      </div>
    </SingleColumn>
  );
};

export default Main;
