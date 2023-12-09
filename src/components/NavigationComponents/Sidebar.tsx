/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { mediaUp } from "../../utils/mediaQueries";

const sidebarContainerStyles = css({
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  padding: "2rem 0 ",
  overflowY: "auto",
  zIndex: 1000,
  width: "100%",
  height: "calc(100dvh - 5rem)",
  right: 0,
  top: "100%",
  transform: "translateX(100%)",
  transition: "ease-out 0.3s background-position-y,ease-out 0.35s transform",
  background:
    "linear-gradient(0deg, rgba(0, 0, 0, 0.85) 50%, rgba(0, 0, 0, 0.00) 100%) no-repeat",
  backgroundSize: "100% 200%",
  backgroundPositionY: "top",
  backdropFilter: "blur( 1.5px )",
  a: {
    textAlign: "center",
    textDecoration: "none",
    color: "white",
    padding: "0.8rem 0.2rem",
    margin: "0 2rem",
    transition: "ease-out color 0.3s, ease-out background-color 0.3s",
    borderRadius: "15px",
    "&:hover": {
      backgroundColor: "#ffffff36",
    },
    "&.active": {
      backgroundColor: "white",
      color: "black",
    },
  },
  [mediaUp("sm")]: {
    width: "22rem",
  },
  [mediaUp("md")]: {
    display: "none",
  },
  button: {
    textAlign: "center",
    textDecoration: "none",
    color: "white",
    padding: "0.8rem 0.2rem",
    margin: "0 2rem",
    transition: "ease-out color 0.3s, ease-out background-color 0.3s",
    borderRadius: "15px",
    backgroundColor: "transparent",
    border: "none",
    fontSize: "1rem",
    fontFamily: "unset",
    "&:hover": {
      backgroundColor: "#ffffff36",
    },
    "&.active": {
      backgroundColor: "white",
      color: "black",
    },
  },
  [mediaUp("md")]: {
    display: "none",
  },
});

const sidebarContainerActiveStyles = css({
  backgroundPositionY: "bottom",
});

const sidebarContainerUnfoldedStyles = css({
  transform: "none",
});

type SidebarProps = {
  isUnfolded: boolean;
  isScrolled: boolean;
  onLogout: () => void;
  token?: string;
  userId?: string;
};

const Sidebar: FC<SidebarProps> = (props) => {
  const { isUnfolded, onLogout, token, userId, isScrolled } = props;

  return (
    <div
      css={[
        sidebarContainerStyles,
        (isScrolled || isUnfolded) && sidebarContainerActiveStyles,
        isUnfolded && sidebarContainerUnfoldedStyles,
      ]}
    >
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
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
      {!token || !userId ? (
        <>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Zaloguj się
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Zarejestruj się
          </NavLink>
        </>
      ) : (
        <button onClick={onLogout}>Wyloguj się</button>
      )}
    </div>
  );
};

export default Sidebar;
