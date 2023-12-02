/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import resolveLastWordColor from "../../utils/ResolveLastWordColor";
import { Link, NavLink } from "react-router-dom";
import { baseButtonStyles } from "../../GlobalStyles";
import { Button } from "@mui/material";
import { FC } from "react";
import { mediaUp } from "../../utils/mediaQueries";

const navbarStyles = css({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 2rem",
  transition: "ease-out 0.3s background-position-y",
  background:
    "linear-gradient(180deg, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.00) 100%) no-repeat",
  backgroundSize: "100% 200%",
  backgroundPositionY: "bottom",
  backdropFilter: "blur( 1.5px )",
  gap: "1rem",
  a: {
    fontSize: "14px",
    color: "black",
    textDecoration: "none",
  },
  [mediaUp("lg")]: {
    a: {
      fontSize: "16px",
    },
  },
  [mediaUp("xl")]: {
    a: {
      fontSize: "18px",
    },
  },
  [mediaUp("xxl")]: {
    a: {
      fontSize: "20px",
    },
  },
});

const navbarUnfoldedStyles = css({
  backgroundPositionY: "top",
  [mediaUp("md")]: {
    backgroundPositionY: "bottom",
  },
});

const navbarSideLeftStyles = css({
  flex:"1 1 0",
  fontSize: "1.6rem",
  textShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
  flexShrink: 0,
  transition: "ease-out 0.2s color",
  span: {
    color: "#7CF87C",
  },
  [mediaUp("xl")]: {
    fontSize: "2.2rem",
  },
});

const navbarSideLeftUnfoldedStyles = css({
  color: "white",
});

const navbarCenterStyles = css({
  display: "none",
  [mediaUp("md")]: {
    display: "flex",
    rowGap: "0.5rem",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    a: {
      padding: "0 0.75rem",
      position: "relative",
      "&:before": {
        transition: "ease-out 0.3s transform",
        content: '""',
        height: "0.8px",
        backgroundColor: "#00F800",
        width: "100%",
        transform: "scaleX(0)",
        position: "absolute",
        left: 0,
        bottom: "-0.2rem",
        transformOrigin: "right",
      },

      "&:hover::before": {
        transform: "scaleX(1)",
        transformOrigin: "left",
      },
      "&.active": {
        color: "#00F800",
      },
    },
  },
});

const menuTogglerStyles = css({
  flexShrink: 0,
  display: "block",
  width: "2rem",
  height: "1.5rem",
  borderBottom: "3px solid #7CF87C",
  position: "relative",
  cursor: "pointer",
  transition: "ease-out 0.2s all",
  "&::before, &::after": {
    position: "absolute",
    content: "''",
    width: "100%",
    height: "2.5px",
    backgroundColor: "#7CF87C",
    transition: "ease-out 0.2s all",
    left: 0,
  },
  "&::before": {
    top: 0,
  },
  "&::after": {
    top: "50%",
  },
  [mediaUp("md")]: {
    display: "none",
  },
});

const activeTogglerStyles = css({
  borderBottom: "none",
  "&::before": {
    transform: "rotate(45deg) translate(0.2rem,0.3rem)",
  },
  "&::after": {
    transform: "rotate(-45deg) translate(0.2rem,-0.3rem)",
  },
});

const navbarSideRightStyles = css({
  display: "none",
  [mediaUp("md")]: {
    flex: "1 1 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "1.5rem",
    a: {
      color: "#00F800",
    },
  },
});

type NavbarProps = {
  isUnfolded: boolean;
  onTogglerClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onLogout: () => void;
  token?: string;
  userId?: string;
};

const Navbar: FC<NavbarProps> = (props) => {
  const { isUnfolded, onTogglerClick, token, userId, onLogout } = props;

  return (
    <div css={[navbarStyles, isUnfolded && navbarUnfoldedStyles]}>
      <div
        css={[navbarSideLeftStyles, isUnfolded && navbarSideLeftUnfoldedStyles]}
      >
        {resolveLastWordColor("Nazwa Strony")}
      </div>
      <div css={navbarCenterStyles}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Strona Główna
        </NavLink>
        <NavLink
          to="/quizes"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Quizy
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Kontakt
        </NavLink>
        <NavLink
          to="/help"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Pomoc
        </NavLink>
      </div>
      <div css={navbarSideRightStyles}>
        {!token || !userId ? (
          <>
            <Link to="/login">Zaloguj się</Link>
            <Link to="/register">
              <Button
                sx={[
                  baseButtonStyles,
                  {
                    fontSize: "14px",
                    color: "#7CF87C",
                    [mediaUp("lg")]: { fontSize: "16px" },
                    [mediaUp("xl")]: { fontSize: "18px" },
                    [mediaUp("xxl")]: { fontSize: "20px" },
                  },
                ]}
              >
                Zarejestruj się
              </Button>
            </Link>
          </>
        ) : (
          <Button
            sx={[
              baseButtonStyles,
              {
                fontSize: "14px",
                color: "#7CF87C",
                [mediaUp("lg")]: { fontSize: "16px" },
                [mediaUp("xl")]: { fontSize: "18px" },
                [mediaUp("xxl")]: { fontSize: "20px" },
              },
            ]}
            onClick={onLogout}
          >
            Wyloguj się
          </Button>
        )}
      </div>
      <div
        onClick={onTogglerClick}
        css={[menuTogglerStyles, isUnfolded && activeTogglerStyles]}
      ></div>
    </div>
  );
};

export default Navbar;
